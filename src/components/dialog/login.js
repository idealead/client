import Vue from 'vue'
import Login from './login.vue'

const LoginBox = Vue.extend(Login)

Login.install = function (data) {
  let instance = new LoginBox({
    data
  }).$mount()

  document.body.appendChild(instance.$el)

  Vue.nextTick(() => {
    instance.dialogVisible = true
    // show 和弹窗组件里的show对应，用于控制显隐
  })

  instance.loginSuccess = data.loginSuccess || null

}

export default Login
