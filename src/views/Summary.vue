<template>
  <div class="summary-container">
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
        label="文章内容"
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
import { getSummary } from '@/api/api'

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

  mounted () {
    const param = {
      pageOffset: (this.pageNum - 1) * this.pageSize,
      pageSize: this.pageSize,
      order: this.order
    }
    this.getSummaryData(param)
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
}
</script>

<style scoped lang="scss">
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
