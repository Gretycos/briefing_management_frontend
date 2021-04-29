<template>
  <div class="login-container">
    <el-form ref="form" :model="form" :rules="rules" label-position="left">
      <el-form-item label="账号" prop="username">
        <el-input type="text" v-model.trim="form.username" auto-complete="off" placeholder="管理员账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model.trim="form.password" auto-complete="off" placeholder="管理员密码"></el-input>
      </el-form-item>
      <el-form-item label="记住我">
        <el-checkbox v-model="form.rememberMe"></el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { requestLogin } from '@/api/api'

@Component
export default class Login extends Vue {
  form={
    username: '',
    password: '',
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
            console.log('登录成功')
            this.$router.push({ path: '/' })
          } else {
            console.log('登录失败：' + res.msg)
          }
        }).catch(() => {
          console.log('出现错误')
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
  margin: auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  //.title {
  //  margin: 0px auto 40px auto;
  //  text-align: center;
  //  color: #505458;
  //}
}
</style>
