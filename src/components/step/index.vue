<template>
  <div class="step_wrap">
    <div class="step_cont">
      <el-steps
        :space="200"
        :active="stepActive"
        :process-status="processStatus"
        finish-status="success"
        align-center
      >
        <el-step v-for="item in stepData" :key="item.title">
          <span slot="title">{{item.title}}</span>
          <span slot="description">
            {{item.description}}
            <br />
            {{item.time}}
          </span>
        </el-step>
      </el-steps>
    </div>
    <div class="message_wrap" v-if="messageList.length>0">
      <div class="msg_col" v-for="item in messageList" :key="item.id">
        <div class="time">{{item.createTime}}</div>
        <div class="msg">{{item.allocateMessage}}</div>
      </div>
    </div>
    <div class="step_notes">
      <div class="label">注释： 通过的流程</div>
      <div class="sNotes_col">
        <i class="step_dot dot_finish"></i>
        <span>现在的节点</span>
      </div>
      <div class="sNotes_col">
        <i class="step_dot dot_return"></i>
        <span>被退回</span>
      </div>
      <div class="sNotes_col">
        <i class="step_dot dot_default"></i>
        <span>未完成</span>
      </div>
    </div>
  </div>
</template>

<script>
import { RemoteApplyProcessGetList, RemoteAllocateGetList } from "@/api/api.js"
export default {
  name: 'step',
  data() {
    return {
      applyId: '',
      stepData: [
        { title: '申请完成', description: '', time: '' },
        { title: '前质控完成', description: '', time: '' },
        { title: '分配完成', description: '', time: '' },
        { title: '报告完成', description: '', time: '' },
        { title: '后质控完成', description: '', time: '' }
      ],
      ProcessList: [],
      messageList: [],
      processStatus: 'finish',
      stepActive: -1,//步骤
    }
  },
  methods: {
    getProcessList(row) {
      const that = this;
      this.applyId = row.id;
      that.stepData = [
        { title: '申请完成', description: '', time: '' },
        { title: '前质控完成', description: '', time: '' },
        { title: '分配完成', description: '', time: '' },
        { title: '报告完成', description: '', time: '' },
        { title: '后质控完成', description: '', time: '' }
      ];
      that.processStatus = 'finish'
      that.stepActive = -1
      if (this.applyId) {
        let params = {
          applyId: this.applyId,
        }
        RemoteApplyProcessGetList(params).then(res => {
          if (res && res.code == 10000) {
            that.ProcessList = res.content.list
            //流程当前步骤
            that.ProcessList.forEach((item, index) => {
              const _idx = this.processApplyStatus(item.applyStatus)
              if (_idx >= 0) {
                that.stepData[_idx].description = item.userName
                that.stepData[_idx].time = item.updateTime
              }
            })
            that.stepActive = row.applyStatus == '8' ? 6 : this.processApplyStatus(row.applyStatus)
            //会诊当前状态
            if (row.returnType != '0' && row.returnType != null && row.returnType != '') {
              //退回状态:0.正常  1.申请退回 2.接诊退回 3.报告退回
              that.processStatus = row.returnType == 0 ? 'finish' : 'error';
            }
          }
        })
        that.getMessageList();
      }
    },
    // 当前会诊状态
    processApplyStatus(applyStatus) {
      let active = -1;
      if (applyStatus != null && applyStatus != '') {
        switch (applyStatus) {
          case "1":
          case "2":
          case "3":
            active = applyStatus - 1
            break;
          case "4":
          case "5":
            active = applyStatus - 2
            break;
          case "6":
          case "7":
          case "8":
            active = 4
            break;
        }
      }
      return active;
    },
    // 获取会诊留言
    getMessageList() {
      const that = this;
      let params = {
        applyId: that.applyId,
      }
      that.messageList = [];
      RemoteAllocateGetList(params).then(res => {
        if (res && res.code == 10000) {
          that.messageList = res.content.list
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.step_wrap {
  .step_cont {
    margin-bottom: 20px;
  }
  .step_notes {
    width: 100%;
    overflow: hidden;
    display: flex;
    .sNotes_col {
      margin-left: 10px;
      .step_dot {
        display: inline-block;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        vertical-align: -2px;
      }
      .dot_finish {
        background-color: #00c0ef;
      }
      .dot_return {
        background-color: #e08e0b;
      }
      .dot_default {
        background-color: #ccc;
      }
    }
  }
  .message_wrap {
    padding: 20px 0;
    .msg_col {
      overflow: hidden;
      font-size: 14px;
      margin: 4px 0;
      .time {
        float: left;
        width: 140px;
        color: rgb(214, 167, 11);
        font-weight: bold;
      }
      .msg {
        padding-left: 140px;
        color: #333;
      }
    }
  }
}
</style>

<style>
/* 修改step样式 */
.el-step__head.is-error {
  color: #e08e0b;
  border-color: #e08e0b;
}
.el-step__title.is-error,
.el-step__description.is-error {
  color: #e08e0b;
}
</style>