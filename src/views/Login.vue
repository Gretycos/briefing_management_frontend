<template>
  <div class="login-container">
    <div class="login-title">今日简报后台管理系统</div>
    <el-form class="login-form" ref="form" :model="form" :rules="rules" label-position="left" label-width="80px">
      <el-form-item label="账号" prop="username">
        <el-input type="text" v-model.trim="form.username" auto-complete="off" placeholder="管理员账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model.trim="form.password" auto-complete="off" placeholder="管理员密码"></el-input>
      </el-form-item>
      <el-form-item label="记住我" class="login-remember">
        <el-checkbox v-model="form.rememberMe"></el-checkbox>
      </el-form-item>
      <el-button type="primary" @click="submitForm">提交</el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { requestLogin } from '@/api/api'

@Component
export default class Login extends Vue {
  form={
    username: 'superadmin',
    password: '123456',
    rememberMe: true
  }

  rules={
    username: [
      {
        required: true,
        message: '账号不能为空',
        trigger: 'blur'
      },
      {
        validator: (rule:any, value:any, callback: any) => {
          const re = /^[0-9a-zA-Z_\u4e00-\u9fa5]+$/
          if (!re.test(value)) {
            callback(new Error('账号只能填写汉字、字母、下划线'))
          } else {
            callback()
          }
        }
      }
    ],
    password: [
      {
        required: true,
        message: '密码不能为空',
        trigger: 'blur'
      },
      {
        validator: (rule:any, value:any, callback:any) => {
          const re = /^[0-9a-zA-Z_\u4e00-\u9fa5]+$/
          if (!re.test(value)) {
            callback(new Error('密码只能填写汉字、字母、下划线'))
          } else {
            callback()
          }
        }
      }
    ],
    checked: true
  }

  submitForm () {
    const myForm:any = this.$refs.form
    myForm.validate((valid: boolean) => {
      if (valid) {
        requestLogin(this.form).then(res => {
          if (parseInt(res.code) === 200) {
            this.$store.commit('SET_USER', res.data.username)
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.$router.push({ path: '/' })
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        }).catch(() => {
          this.$message({
            message: '服务器异常',
            type: 'error'
          })
        })
      } else {
        this.$message({
          message: '请正确填写表单',
          type: 'error'
        })
        return false
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.login-container{
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 50%;
  width: auto;
  //.title {
  //  margin: 0px auto 40px auto;
  //  text-align: center;
  //  color: #505458;
  //}
}
.login-title{
  font-size: 20px;
  margin-bottom: 20px;
}
.login-remember{
  text-align: start;
}
.login-submit{
  margin-left: 0;
}
</style>
