<template>
  <div class="gather-container">
    <el-table
      :data="tableData"
      @sort-change="onSortChange"
      @row-click="onRowClick"
      height="600"
      border
      style="width: 100%">
      <el-table-column
        sortable="custom"
        prop="publishDate"
        label="简报日期">
      </el-table-column>
      <el-table-column
        label="今日主题">
        <template slot-scope="scope">
          <div>{{ scope.row.kwDate.slice(0,30)+"..."}}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="nums"
        label="新闻数量">
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
      :title="currentDate"
      :visible.sync="dialogVisible"
      width="60%">
      <div class="dialog-container">
        <div class="dialog-item-container">
          <div class="dialog-title">今日主题</div>
          <div class="dialog-item" v-html="currentTopic"></div>
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
import { getGather } from '@/api/api'

@Component
export default class Gather extends Vue {
  tableData = []
  total = 0
  pageNum = 1
  pageSize = 20
  order = 0
  dialogVisible = false
  currentDate = ''
  currentTopic = ''

  mounted () {
    const param = {
      pageOffset: (this.pageNum - 1) * this.pageSize,
      pageSize: this.pageSize,
      order: this.order
    }
    this.getGatherData(param)
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
      this.getGatherData(param)
    } else {
      this.order = 0
      const param = {
        pageOffset: (this.pageNum - 1) * this.pageSize,
        pageSize: this.pageSize,
        order: this.order
      }
      this.getGatherData(param)
    }
  }

  onRowClick (row: any) {
    // console.log(row)
    this.dialogVisible = true
    this.currentDate = row.publishDate
    this.currentTopic = row.kwDate
  }

  handleSizeChange (val: number) {
    this.pageNum = 1
    this.pageSize = val
    const param = {
      pageOffset: (this.pageNum - 1) * this.pageSize,
      pageSize: this.pageSize,
      order: this.order
    }
    this.getGatherData(param)
  }

  handlePageChange (val: number) {
    this.pageNum = val
    const param = {
      pageOffset: (this.pageNum - 1) * this.pageSize,
      pageSize: this.pageSize,
      order: this.order
    }
    this.getGatherData(param)
  }

  getGatherData (param: any) {
    getGather(param).then(res => {
      this.tableData = res.gatherList
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
