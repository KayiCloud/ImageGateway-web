<template>
  <div class="ky-container">
    <div class="box">
      <el-card shadow="hover" ref="applyInfoMain" class="ky-card-xs ky-card-hdbg">
        <div slot="header" class="clearfix">
          <span>申请表单信息</span>
        </div>
        <div>
          <el-form
            :model="formDataApply"
            label-width="80px"
            class="ky-form-inline-sm ky-form-item_val"
          >
            <el-row>
              <el-col :span="formItemColSpan">
                <el-form-item label="送检医院">
                  <el-input
                    v-model="formDataApply.SOURCECODE"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="formItemColSpan">
                <el-form-item label="送检医生">
                  <el-input v-model="formDataApply.APPLYDOCTOR"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="formItemColSpan">
                <el-form-item label="联系电话">
                  <el-input
                    v-model="formDataApply.APPLYDOCTORTELEPHONE"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="formItemColSpan">
                <el-form-item label="科室">
                  <!-- <el-input v-model="formDataApply.APPLYDEP"></el-input> -->
                  <el-select v-model="formDataApply.APPLYDEP" style="width: 100%;">
                    <el-option
                      v-for="(item, index) in depOptions"
                      :key="index"
                      :label="item.FULLNAME"
                      :value="item.FULLNAME"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="formItemColSpan">
                <el-form-item label="临床诊断">
                  <el-input v-model="formDataApply.CLINICEND"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="formItemColSpan">
                <el-form-item label="送检时间">
                  <el-date-picker
                    style="width: 100%;"
                    v-model="formDataApply.APPLYDATE"
                    type="datetime"
                    placeholder="选择日期时间"
                    :picker-options="mx_dateTimePickerOptions"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="formItemColSpan">
                <el-form-item label="优先级">
                  <el-select v-model="formDataApply.URGENTLEVEL" clearable style="width: 100%;">
                    <el-option
                      v-for="(item, index) in levelOptions"
                      :key="index"
                      :label="item.ITEMNAME"
                      :value="item.ITEMCODE"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card shadow="hover" class="ky-card-xs ky-card-hdbg ky-mt10">
        <div slot="header" class="clearfix">
          <span>患者信息</span>
        </div>
        <div>
          <el-form
            ref="formPatient"
            :model="formDataApply"
            label-width="80px"
            class="ky-form-inline-sm ky-form-item_val"
            :rules="rulesPatient"
          >
            <el-row>
              <el-col :span="formItemColSpan">
                <el-form-item label="患者姓名" prop="FULLNAME">
                  <el-input
                    v-model="formDataApply.FULLNAME"
                    placeholder="患者姓名"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="formItemColSpan">
                <el-form-item label="身份证号" prop="IDCARD">
                  <el-input
                    v-model="formDataApply.IDCARD"
                    placeholder="身份证号"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="formItemColSpan">
                <el-form-item label="性别" prop="SEX">
                  <el-radio-group v-model="formDataApply.SEX">
                    <el-radio label="女">女</el-radio>
                    <el-radio label="男">男</el-radio>
                    <el-radio label="其他">其他</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="formItemColSpan">
                <el-form-item label="患者生日" prop="BIRTHDAY">
                  <el-date-picker
                    style="width: 100%;"
                    v-model="formDataApply.BIRTHDAY"
                    type="date"
                    placeholder="患者生日"
                    :picker-options="pickerOptions"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="formItemColSpan">
                <el-form-item class="ky-input-group__append_w60" label="年龄" prop="AGE">
                  <el-input v-model="formDataApply.AGE" placeholder="年龄">
                    <el-select v-model="formDataApply.AGEUNIT" slot="append">
                      <el-option label="岁" value="Y"></el-option>
                      <el-option label="月" value="M"></el-option>
                      <el-option label="天" value="D"></el-option>
                    </el-select>
                  </el-input>
                </el-form-item>

              </el-col>
              <el-col :span="formItemColSpan">
                <el-form-item label="联系电话" prop="TELEPHONE">
                  <el-input
                    v-model="formDataApply.TELEPHONE"
                    placeholder="联系电话"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="formItemColSpan">
                <el-form-item label="联系地址">
                  <el-input
                    v-model="formDataApply.ADDRESS"
                    placeholder="联系地址"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="formItemColSpan">
                <el-form-item label="是否结婚">
                  <el-radio-group v-model="formDataApply.MARRIAGE">
                    <el-radio label="已婚">已婚</el-radio>
                    <el-radio label="未婚">未婚</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="formItemColSpan">
                <el-form-item label="住院号">
                  <el-input
                    v-model="formDataApply.INPATIENTID"
                    placeholder="住院号"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="formItemColSpan">
                <el-form-item label="床号">
                  <el-input
                    v-model="formDataApply.BEDNO"
                    placeholder="床号"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="formItemColSpan" v-show="formDataApply.SEX != '男'">
                <el-form-item label="是否绝经">
                  <el-radio-group v-model="formDataApply.ISMENOPAUSE">
                    <el-radio label="0">否</el-radio>
                    <el-radio label="1">是</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="formItemColSpan" v-show="formDataApply.SEX != '男'">
                <el-form-item label="末次月经">
                  <el-date-picker
                    style="width: 100%;"
                    v-model="formDataApply.LMP"
                    :picker-options="pickerOptions"
                    type="date"
                    placeholder="选择时间"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card shadow="hover" class="ky-card-xs ky-card-hdbg ky-mt10">
        <el-form
          :model="formDataApply"
          class="ky-form-item_max"
          label-width="80px"
        >
          <el-form-item label="病史摘要">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 10 }"
              v-model="formDataApply.MEDICALHISTORY"
              placeholder="病史摘要"
            ></el-input>
          </el-form-item>
          <el-form-item label="手术所见">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 10 }"
              v-model="formDataApply.OPERATIONFINDINGS"
              placeholder="手术所见"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 10 }"
              v-model="formDataApply.DESCRIPTION"
              placeholder="备注"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { dateFormatter, isPhone, isIdCard } from '@/utils/validate'
import commData from '@/mixins/commData'
import resizeDiv from '@/mixins/resize'
export default {
  mixins: [commData, resizeDiv],
  data() {
    var validateMobile = (rule, value, callback) => {
      if (!value || isPhone(value)) {
        callback()
      } else {
        callback(new Error('联系电话格式不正确'))
      }
    }
    var validateIdCard = (rule, value, callback) => {
      if (!value || isIdCard(value)) {
        callback()
      } else {
        callback(new Error('身份证号格式不正确'))
      }
    }
    return {
      loading: false,
      formItemColSpan: 12,
      loadingText: '',
      formSearch: {
        id: ''
      },
      formDataApply: {
        ID: '',
        SOURCECODE: '', // 送检医院
        APPLYDATE: dateFormatter(new Date()), // 送检时间
        URGENTLEVEL: '', // 优先级
        APPLYDOCTOR: '', // 送检医生
        APPLYDOCTORTELEPHONE: '', // 联系电话
        APPLYDEP: '', // 送检科室
        CLINICEND: '', // 临床诊断
        // 患者信息
        FULLNAME: '', // 患者姓名
        IDCARD: '', // 身份证号
        SEX: '', // 性别
        BIRTHDAY: '', // 生日
        AGE: '', // 年龄
        AGEUNIT: 'Y',
        TELEPHONE: '', // 联系电话
        ADDRESS: '', // 联系地址
        MARRIAGE: '', // 是否结婚
        INPATIENTID: '', // 住院号
        BEDNO: '', // 床号
        ISMENOPAUSE: '', // 是否绝经
        LMP: '', // 末次月经时间
        MEDICALHISTORY: '', // 病史摘要
        OPERATIONFINDINGS: '', // 手术所见
        DESCRIPTION: ''// 备注
      },
      depOptions: [],
      hospitalOptions: [],
      levelOptions: [],
      pickerOptions: {
        // 限制预约时间
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      rulesPatient: {
        FULLNAME: [
          { required: true, message: '请输入患者姓名', trigger: 'blur' }
        ],
        IDCARD: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { validator: validateIdCard, trigger: 'blur' }
        ],
        SEX: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        BIRTHDAY: [
          { required: true, message: '请选择患者生日', trigger: 'change' }
        ],
        AGE: [
          { required: true, message: '请输入患者年龄', trigger: 'blur' }
        ],
        TELEPHONE: [
          { validator: validateMobile, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 表单元素宽度设置
    applyMainWidth() {
      const applyElm = this.$refs.applyInfoMain
      const _w = applyElm.$el.clientWidth
      const _s = Math.floor(_w / 310)
      const _p = Math.floor(24 / _s)
      this.formItemColSpan = _p
      // console.log(_w)
      // console.log(_s)
      // console.log(_p)
    },
    $_resizeHandler() {
      this.applyMainWidth()
    }
  }
}
</script>

<style lang="scss">

</style>
