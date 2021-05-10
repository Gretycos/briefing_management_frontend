<template>
  <div class="news-container">
    <div class="spider-time-container">
      <div class="spider-time-title">爬虫定时：每天</div>
      <el-tooltip
        effect="light"
        placement="bottom">
        <div slot="content" class="tooltip-content">
          0点-8点基于昨日数据；其余时间基于今日数据。<br/>
          「主题发现」会在「爬虫」执行后的第5分钟开始；<br/>
          「简报生成」会在「主题发现」后的第10分钟开始。
        </div>
        <div class="spider-time-selector">
          <el-select v-model="hour" placeholder="" @change="handleHourChange" size="small">
            <el-option
              v-for="item in hours"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>时
          <el-select v-model="minute" placeholder="" @change="handleMinuteChange" size="small">
            <el-option
              v-for="item in minutes"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>分
        </div>
      </el-tooltip>
      <el-tooltip
        effect="light"
        placement="bottom">
        <div slot="content" class="tooltip-content">
          爬取过程需等待约3分钟
        </div>
        <div class="spider-control">
          <div class="spider-control-state" v-if="newsState === false">
            未有今日数据
            <el-button type="primary" :loading="loadingTodayNews" @click="handleLoadingTodayNews" size="small">爬取今日数据</el-button>
          </div>
          <div class="spider-control-state" v-if="newsState === true">
            已有今日数据
            <el-button type="primary" :loading="loadingTodayNews" @click="handleLoadingTodayNews" size="small">再次爬取今日数据</el-button>
          </div>
        </div>
      </el-tooltip>
    </div>
    <el-table
      v-loading="loadingData"
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
          <div>{{ scope.row.images.length>2? scope.row.images.slice(0,30)+"...]":scope.row.images}}</div>
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
          <div class="dialog-title">图片</div>
          <div class="dialog-item">
            <img :src="url" v-for="(url,idx) in this.currentImagesList" :key="idx">
          </div>
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
import { getNews, getNewsState, getSpiderTime, updateSpiderTime, generateNews } from '@/api/api'

@Component
export default class News extends Vue {
  tableData = []
  loadingData = true
  total = 0
  pageNum = 1
  pageSize = 20
  order = 0
  dialogVisible = false
  currentTitle = ''
  currentContent = ''
  currentImages = ''
  currentImagesList = []
  minute = 0
  hour = 0
  newsState = false
  loadingTodayNews = false

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
    this.currentContent = row.content.replace(/\n/g, '<br>').replaceAll('　　', '　　<br>')
    this.currentImages = row.images.slice(1, -1).replaceAll(',', ', <br>')
    const imagesList = JSON.parse(row.images)
    this.currentImagesList = imagesList.map((item: string) => {
      return 'http://39.105.43.226:8091/images' + item
    })
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

  get minutes () {
    const a = [0, 20, 40]
    return a
  }

  get hours () {
    const a = [0, 2, 4, 21, 22, 23]
    return a
  }

  handleMinuteChange (val: any) {
    this.minute = val
    const param = {
      minute: this.minute,
      hour: this.hour
    }
    this.updateSpiderClock(param)
  }

  handleHourChange (val: any) {
    this.hour = val
    const param = {
      minute: this.minute,
      hour: this.hour
    }
    this.updateSpiderClock(param)
  }

  handleLoadingTodayNews () {
    this.loadingTodayNews = true
    generateNews().then(res => {
      this.loadingTodayNews = false
      if (parseInt(res) === 1) {
        this.$message({
          message: '爬取成功',
          type: 'success',
          duration: 1500,
          onClose: () => { this.$router.go(0) }
        })
      }
    }).catch((error) => {
      this.loadingTodayNews = false
      this.$message({
        message: error,
        type: 'error'
      })
    })
  }

  getNewsData (param: any) {
    getNews(param).then(res => {
      this.tableData = res.newsList
      this.total = res.total
      this.loadingData = false
      this.getSpiderClock()
      this.getTodayNewsState()
    }).catch((error) => {
      this.$message({
        message: error,
        type: 'error'
      })
      this.loadingData = false
    })
  }

  getSpiderClock () {
    getSpiderTime().then(res => {
      this.minute = res.minute
      this.hour = res.hour
    }).catch((error) => {
      this.$message({
        message: error,
        type: 'error'
      })
    })
  }

  updateSpiderClock (param: any) {
    updateSpiderTime(param).then(res => {
      this.$message({
        message: '修改时间成功, 每日 ' + param.hour + '时' + param.minute + '分 自动执行爬虫',
        type: 'success'
      })
    }).catch((error) => {
      this.$message({
        message: error,
        type: 'error'
      })
    })
  }

  getTodayNewsState () {
    getNewsState().then(res => {
      this.newsState = res
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
.spider-time-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
}
.spider-time-selector{
  outline: none;
}
.el-select{
  margin-left: 5px;
  margin-right: 5px;
  width: 70px !important;
}
.spider-control{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 30px;
  .spider-control-state{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .el-button{
    margin-left: 10px;
  }
  outline: none;
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
  img{
    width: 60%;
    object-fit: contain;
  }
}
</style>
