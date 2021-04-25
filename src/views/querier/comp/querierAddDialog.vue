<template>
  <el-dialog
    class="ky-dialog ky-dialog-maxw"
    :title="dialogTitle"
    width="600px"
    top="5vh"
    :close-on-click-modal="false"
    :visible.sync="querierDialog"
    @close="dialogClose"
  >
    <div class="ky-dlg-wrap querier_wrap" v-loading="loading">
      <el-form
        ref="querierForm"
        label-width="100px"
        :model="formData"
        :rules="rules"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="formData.name" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="formData.title" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item label="租户" prop="tenantId">
          <el-select filterable :disabled="querierType==='modify'" v-model="formData.tenantId">
            <el-option v-for="(item) in mx_tenantAll" :key="item.id" :label="item.name" :value="item.id">
              <span style="float: left">{{item.name}}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{item.id.slice(0,8)}}</span>
            </el-option>
          </el-select>
          <!-- <el-input v-model="formData.tenantId"></el-input> -->
        </el-form-item>
        <el-form-item label="样式" prop="style">
          <el-select v-model="formData.style">
            <el-option v-for="(item,index) in styleOptions" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="查询方式" prop="provider">
          <el-select v-model="formData.provider" @change="providerChange">
            <el-option
              v-for="(item, index) in providerOptions"
              :key="index"
              :label="item.provider"
              :value="item.provider"
            ></el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <el-form
        class="provideritem_form"
        label-position="top"
      >
        <el-form-item v-for="(item, index) in providerItems" :key="index" :label="item.localizationValue">
          <el-input
            v-model="item[`${item.name}`]"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="querierDialog = false">取消</el-button>
      <el-button size="small" type="primary" @click="sendQuerier">{{querierType=='add'?'添加':'修改'}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  getDataQueryProvider,
  getDataQueryProviderInfo,
  putQuerier,
  postQuerier
} from '@/api/api'
import mxTenant from '@/mixins/tenant'
export default {
  mixins: [mxTenant],
  data() {
    return {
      loading: false,
      querierType: 'add',
      dialogTitle: '查询器新增',
      querierDialog: false,
      formData: {
        id: '',
        tenantId: null,
        isMultiTenant: true,
        style: 1,
        title: '',
        name: '',
        provider: '',
        items: []
      },
      rules: {
        provider: [{ required: true, message: '查询方式不能为空！', trigger: 'blur' }],
        tenantId: [{ required: true, message: '请选择租户！', trigger: 'blur' }],
        style: [{ required: true, message: '样式不能为空！', trigger: 'blur' }],
        title: [{ required: true, message: '标题不能为空！', trigger: 'blur' }],
        name: [{ required: true, message: '名称不能为空！', trigger: 'blur' }]
      },
      querierInfo: null,
      // provider
      providerOptions: [],
      providerItems: [],

      styleOptions: [
        { value: 1, label: 'StudyInstanceUID' },
        { value: 2, label: 'AccessionNo(访问号)' }
      ]
    }
  },
  created() {
    this.getProviderList()
    this.mx_getTenantAll()
  },
  methods: {
    init(type, querierInfo) {
      this.querierType = type
      this.dialogTitle = type === 'add' ? '查询器新增' : '查询器修改'
      this.querierDialog = true

      this.$nextTick(() => {
        this.$refs.querierForm.resetFields()
        if (querierInfo && querierInfo.id) {
          this.querierInfo = { ...querierInfo }
          this.formData.id = querierInfo.id
          this.formData.tenantId = querierInfo.tenantId
          this.formData.isMultiTenant = querierInfo.isMultiTenant
          this.formData.style = querierInfo.style
          this.formData.title = querierInfo.title
          this.formData.name = querierInfo.name
          this.formData.provider = querierInfo.provider
          this.formData.items = []
          // this.providerItems = querierInfo.items
        }
        if (!this.formData.provider && this.providerOptions.length > 0) {
          this.formData.provider = this.providerOptions[0].provider
        }
        this.providerChange()
      })
    },
    dialogClose() {
      this.formData.id = null
      this.formData.tenantId = null
      this.formData.isMultiTenant = true
      this.formData.style = ''
      this.formData.title = ''
      this.formData.name = ''
      this.formData.provider = ''
      this.formData.items = []
      this.providerItems = []
      this.querierInfo = null
    },
    // 验证表单
    validateFun(formName) {
      return new Promise(async resolve => {
        let _valid = false
        await this.$refs[formName].validate((valid) => {
          _valid = valid
        })
        resolve(_valid)
      })
    },
    // 新增提交
    async sendQuerier() {
      const valid = await this.validateFun('querierForm')
      if (valid) {
        const params = { ...this.formData }
        let providerItem = []
        this.providerItems.forEach(item => {
          let _obj = {}
          _obj[`name`] = item.name
          _obj[`value`] = item[`${item.name}`] ? item[`${item.name}`] : ''
          if (item.id) {
            // 如果有itemid，项目为修改，需把itemid一起提交
            _obj[`id`] = item.id
          }
          providerItem.push(_obj)
        })
        params.items = [...providerItem]
        params.tenantId = params.tenantId ? params.tenantId : null
        // console.log(params)
        // return
        this.loading = true
        if (this.querierType === 'add') {
          // 新增
          postQuerier(params).then(res => {
            this.loading = false
            if (res && res.code === 1) {
              this.$message.success('新增成功~')
              this.querierDialog = false
              this.$emit('sendQuerierEdit')
            }
          })
        } else if (this.querierType === 'modify') {
          // 修改
          putQuerier(params).then(res => {
            this.loading = false
            if (res && res.code === 1) {
              this.$message.success('修改成功~')
              this.querierDialog = false
              this.$emit('sendQuerierEdit')
            }
          })
        }
      }
    },
    // 查询方式 获取
    getProviderList() {
      getDataQueryProvider().then(res => {
        if (res && res.code === 1) {
          this.providerOptions = res.data
        }
      })
    },
    // 查询方式 改变
    providerChange() {
      if (this.formData.provider) {
        this.getProviderItems(this.formData.provider)
      } else {
        this.providerItems = []
      }
    },
    // 查询方式 item 选项获取
    getProviderItems(provider) {
      console.log('查询方式:', provider)
      getDataQueryProviderInfo({ provider }).then(res => {
        if (res && res.code === 1) {
          this.providerItems = res.data.values
          if (this.querierInfo && this.querierInfo.id && this.querierInfo.provider === provider) {
            // 修改
            const _items = this.querierInfo.items
            this.providerItems.forEach(prov => {
              const _index = _items.findIndex(item => item.name === prov.name)
              if (_index >= 0) {
                prov.id = _items[_index].id
                prov[`${prov.name}`] = _items[_index].value
              } else {
                prov[`${prov.name}`] = null
              }
            })
          } else {
            this.providerItems.forEach(prov => {
              prov[`${prov.name}`] = null
            })
          }
          this.providerItems = JSON.parse(JSON.stringify(this.providerItems))
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.querier_wrap /deep/ .el-select{
  width: 100%;
}
.provideritem_form /deep/ .el-form-item__label{
  line-height: 22px;
  padding-bottom: 2px;
}
.provideritem_form /deep/ .el-form-item{
  margin-bottom: 8px;
}
.provideritem_form{
  padding-left: 100px;
}
</style>
