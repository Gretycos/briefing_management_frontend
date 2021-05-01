<template>
  <div class="news-container">
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
        width="180">
      </el-table-column>
      <el-table-column
        prop="media"
        label="媒体"
        width="120">
      </el-table-column>
      <el-table-column
        prop="url"
        label="文章链接"
        width="180">
      </el-table-column>
      <el-table-column
        prop="title"
        label="文章标题"
        width="200">
      </el-table-column>
      <el-table-column
        label="文章内容"
        width="250">
        <template slot-scope="scope">
          <div>{{ scope.row.content.slice(0,50)+"..."}}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="图片链接"
        width="200">
        <template slot-scope="scope">
          <div>{{ scope.row.images.length>2? scope.row.images.slice(0,80)+"...]":scope.row.images}}</div>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        sortable="custom"
        prop="publishTime"
        label="发表时间"
        width="160">
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
          <div class="dialog-title">文章内容</div>
          <div class="dialog-item" v-html="currentContent"></div>
        </div>
        <div class="dialog-item-container">
          <div class="dialog-title">图片链接</div>
          <div class="dialog-item" v-html="currentImages"></div>
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
import { getNews } from '@/api/api'

@Component
export default class News extends Vue {
  tableData = []
  total = 0
  pageNum = 1
  pageSize = 20
  order = 0
  dialogVisible = false
  currentTitle = ''
  currentContent = ''
  currentImages = ''

  mounted () {
    const param = {
      pageOffset: (this.pageNum - 1) * this.pageSize,
      pageSize: this.pageSize,
      order: this.order
    }
    this.getNewsData(param)
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
      this.getNewsData(param)
    } else {
      this.order = 0
      const param = {
        pageOffset: (this.pageNum - 1) * this.pageSize,
        pageSize: this.pageSize,
        order: this.order
      }
      this.getNewsData(param)
    }
  }

  onRowClick (row: any) {
    // console.log(row)
    this.dialogVisible = true
    this.currentTitle = row.title
    this.currentContent = row.content.replaceAll('　　', '　　<br>')
    this.currentImages = row.images.slice(1, -1).replaceAll(',', ', <br>')
  }

  handleSizeChange (val: number) {
    this.pageNum = 1
    this.pageSize = val
    const param = {
      pageOffset: (this.pageNum - 1) * this.pageSize,
      pageSize: this.pageSize,
      order: this.order
    }
    this.getNewsData(param)
  }

  handlePageChange (val: number) {
    this.pageNum = val
    const param = {
      pageOffset: (this.pageNum - 1) * this.pageSize,
      pageSize: this.pageSize,
      order: this.order
    }
    this.getNewsData(param)
  }

  getNewsData (param: any) {
    getNews(param).then(res => {
      this.tableData = res.newsList
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
