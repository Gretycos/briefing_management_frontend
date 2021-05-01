<template>
  <div class="summary-container">
    <div class="summary-control-container">
      <div class="summary-control-topic">
        <div class="summary-control-state" v-if="topicState === false">
          未有今日主题
          <el-button type="primary" :loading="loadingTodayTopic" @click="handleLoadingTodayTopic" size="small">发现今日主题</el-button>
        </div>
        <div class="summary-control-state" v-if="topicState === true">
          已有今日主题
          <el-button type="primary" :loading="loadingTodayTopic" @click="handleLoadingTodayTopic" size="small">重新发现今日主题</el-button>
        </div>
      </div>
      <div class="summary-control-summary">
        <div class="summary-control-state" v-if="summaryState === false">
          未有今日摘要
          <el-button type="primary" :loading="loadingTodaySummary" @click="handleLoadingTodaySummary" size="small">生成今日摘要</el-button>
        </div>
        <div class="summary-control-state" v-if="summaryState === true">
          已有今日摘要
          <el-button type="primary" :loading="loadingTodaySummary" @click="handleLoadingTodaySummary" size="small">重新生成今日摘要</el-button>
        </div>
      </div>
    </div>
    <el-table
      :data="tableData"
      @sort-change="onSortChange"
      @row-click="onRowClick"
      height="600"
      border
      style="width: 100%">
      <el-table-column
        fixed="left"
        prop="articleId"
        label="文章编号"
        width="200">
      </el-table-column>
      <el-table-column
        prop="title"
        label="文章标题"
        width="250">
      </el-table-column>
      <el-table-column
        label="文章摘要"
        width="350">
        <template slot-scope="scope">
          <div>{{ scope.row.summary.slice(0,50)+"..."}}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="kw"
        label="文章主题"
        width="300">
      </el-table-column>
      <el-table-column
        fixed="right"
        sortable="custom"
        prop="publishTime"
        label="发表时间"
        width="200">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
      :current-page="pageNum"
      :page-sizes="[10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <el-dialog
      :title="currentTitle"
      :visible.sync="dialogVisible"
      width="60%">
      <div class="dialog-container">
        <div class="dialog-item-container">
          <div class="dialog-title">文章主题</div>
          <div class="dialog-item" v-html="currentTopic"></div>
        </div>
        <div class="dialog-item-container">
          <div class="dialog-title">文章摘要</div>
          <div class="dialog-item" v-html="currentContent"></div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { generateSummary, generateTopic, getSummary, getSummaryState, getTopicState } from '@/api/api'

@Component
export default class Summary extends Vue {
  tableData = []
  total = 0
  pageNum = 1
  pageSize = 20
  order = 0
  dialogVisible = false
  currentTitle = ''
  currentTopic = ''
  currentContent = ''
  topicState = false
  loadingTodayTopic = false
  summaryState = false
  loadingTodaySummary = false

  mounted () {
    const param = {
      pageOffset: (this.pageNum - 1) * this.pageSize,
      pageSize: this.pageSize,
      order: this.order
    }
    this.getSummaryData(param)
    this.getTodayTopicState()
    this.getTodaySummaryState()
  }

  onSortChange (change: any) {
    this.pageNum = 1
    if (change.order === 'ascending') {
      this.order = 1
      const param = {
        pageOffset: (this.pageNum - 1) * this.pageSize,
        pageSize: this.pageSize,
        order: this.order
      }
      this.getSummaryData(param)
    } else {
      this.order = 0
      const param = {
        pageOffset: (this.pageNum - 1) * this.pageSize,
        pageSize: this.pageSize,
        order: this.order
      }
      this.getSummaryData(param)
    }
  }

  onRowClick (row: any) {
    // console.log(row)
    this.dialogVisible = true
    this.currentTitle = row.title
    this.currentTopic = row.kw.replace('[', '').replace(']', '')
    this.currentContent = row.summary.replaceAll('　　', '　　<br>')
  }

  handleSizeChange (val: number) {
    this.pageNum = 1
    this.pageSize = val
    const param = {
      pageOffset: (this.pageNum - 1) * this.pageSize,
      pageSize: this.pageSize,
      order: this.order
    }
    this.getSummaryData(param)
  }

  handlePageChange (val: number) {
    this.pageNum = val
    const param = {
      pageOffset: (this.pageNum - 1) * this.pageSize,
      pageSize: this.pageSize,
      order: this.order
    }
    this.getSummaryData(param)
  }

  handleLoadingTodayTopic () {
    this.loadingTodayTopic = true
    generateTopic().then(res => {
      this.loadingTodayTopic = false
      if (parseInt(res) === 1) {
        this.$message({
          message: '生成成功',
          type: 'success',
          duration: 1500,
          onClose: () => { this.$router.go(0) }
        })
      }
    }).catch((error) => {
      this.loadingTodayTopic = false
      this.$message({
        message: error,
        type: 'error'
      })
    })
  }

  handleLoadingTodaySummary () {
    this.loadingTodaySummary = true
    generateSummary().then(res => {
      this.loadingTodaySummary = false
      if (parseInt(res) === 1) {
        this.$message({
          message: '生成成功',
          type: 'success',
          duration: 1500,
          onClose: () => { this.$router.go(0) }
        })
      }
    }).catch((error) => {
      this.loadingTodaySummary = false
      this.$message({
        message: error,
        type: 'error'
      })
    })
  }

  getSummaryData (param: any) {
    getSummary(param).then(res => {
      this.tableData = res.summaryList
      this.total = res.total
    }).catch((error) => {
      this.$message({
        message: error,
        type: 'error'
      })
    })
  }

  getTodayTopicState () {
    getTopicState().then(res => {
      this.topicState = res
    }).catch((error) => {
      this.$message({
        message: error,
        type: 'error'
      })
    })
  }

  getTodaySummaryState () {
    getSummaryState().then(res => {
      this.summaryState = res
    }).catch((error) => {
      this.$message({
        message: error,
        type: 'error'
      })
    })
  }
}
</script>

<style scoped lang="scss">
.summary-control-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
}
.summary-control-summary{
  margin-left: 30px;
}
.dialog-container{
  display: flex;
  flex-direction: column;
  text-align: left;
}
.dialog-item-container{
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  .dialog-title{
    font-size: 15px;
    font-weight: bolder;
  }
}
</style>
