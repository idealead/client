<template>
  <el-dialog
    :visible.sync="dialogVisible"
    width="4.2rem"
    @closed="closedFunc"
    :show-close="false"
    id="login"
    customClass="login"
    v-loading="loading"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.5)"
  >
    <div slot="title">
      <img src="../../assets/header/logo.png" class="logo" />
    </div>
    <div class="dia_login_wrap">
      <div class="account_box">
        <el-input placeholder="账号" v-model="user_account" class="user_account"></el-input>
        <span>@gdinsight.com</span>
      </div>
      <el-input placeholder="登录密码" v-model="user_password" class="user_password" show-password></el-input>
      <p class="login_tips">请使用因赛助手帐号登录</p>
      <div class="login_btns">
        <span class="login_cancel" @click="dialogVisible = false">取消</span>
        <span class="login_confirm" @click="loginFunc">确定</span>
      </div>
    </div>
  </el-dialog>
</template>

<style type="text/css">
.login {
  border-radius: 5px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.login .dia_login_wrap {
  width: 3.03rem;
  min-height: 2.6rem;
  margin: 0.5rem auto 0;
}
.login .logo {
  width: 1.59rem;
  display: block;
  margin: 0.56rem auto 0;
}
.el-dialog__header {
  padding: 0;
  overflow: hidden;
}
.login .el-input__inner {
  border-radius: 0;
  border: none;
  border-bottom: 1px solid #000000;
  box-sizing: border-box;
}
.account_box .el-input__inner {
  border: none;
}
.login .el-input__inner:focus {
  border-bottom-color: #000000;
}
.user_account,
.user_password {
  font-size: 0.15rem;
  color: #cfcfcf;
}
.account_box {
  width: 100%;
  border-bottom: 1px solid #000000;
  margin-bottom: 0.44rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.account_box span {
  white-space: nowrap;
  color: #cfcfcf;
}
.account_box .user_account {
  width: 60%;
  border: none;
}
.login_btns {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 10%;
}
.login_btns span {
  width: 1.33rem;
  height: 0.41rem;
  background: url(../../assets/dialog/login_btn.png) no-repeat top center/100%;
  line-height: 0.41rem;
  text-align: center;
  color: #ffffff;
  font-size: 0.18rem;
  cursor: pointer;
  transition: all 0.2s ease;
}
.login_btns span:active {
  transform: scale(0.9);
}
.el-message i {
  font-size: 0.2rem;
}
#login .el-loading-spinner i {
  width: 0.32rem;
  height: 0.32rem;
  background: url(../../assets/loading.gif) no-repeat top center/100%;
  animation: none;
  display: block;
  margin: 0 auto;
}
#login .el-loading-spinner i:before {
  display: none;
}
#login .el-loading-spinner {
  top: 40%;
  margin-top: -0.16rem;
}
.login_tips {
  text-align: center;
  margin-top: 4%;
  font-size: 0.13rem;
}
</style>

<script>
import { loginByStaffAccount } from "@/api/service.js";
export default {
  data() {
    return {
      dialogVisible: false,
      loading: false,
      user_account: "",
      user_password: ""
    };
  },
  mounted() {
    // 绑定enter事件
    this.enterKeyup();
  },
  methods: {
    closedFunc: function() {
      let login = document.getElementById("login");
      document.body.removeChild(login);
      this.enterKeyupDestroyed(); //删除绑定
    },
    // 登录
    loginFunc: function() {
      const me = this;
      if (me.checkAccountPass()) {
        me.loading = true;
        me.sendLoginRequest();
      } else {
        this.$notify({
          title: "提示",
          message: "账号或者密码不能为空！",
          type: "warning"
        });
      }
    },
    checkAccountPass: function() {
      // 检查账号密码是否为空
      if (this.user_account != "" && this.user_password != "") {
        return true;
      } else {
        return false;
      }
    },
    sendLoginRequest: function() {
      const me = this;

      loginByStaffAccount(me.user_account, me.user_password)
        .then(data => {
          console.log(data);
          me.loading = false;
          const login_code = data.code,
            login_msg = data.message,
            login_data = data.data;

          if (login_code == 200) {
            // 登录成功 存数据
            me.saveAccount(login_data);

            me.loginSuccess(login_data);
            me.dialogVisible = false;
          } else {
            // 登录失败
            me.$notify({
              title: "提示",
              message: login_msg,
              type: "warning"
            });
          }
        })
        .catch(err => {
          console.log(err);
          me.sendLoginRequest();
        });
    },
    saveAccount: function(data) {
      // 保存数据
      const currentUser = JSON.stringify({
        is_leader: data.is_leader,
        user_name: data.user_name
      });

      this.setCookie("currentUser", currentUser);
      this.setCookie("isLogin", true);
      this.setCookie("author_id", data.id);
      this.setCookie("integral", data.integral);
      this.setCookie("sex", data.sex);
      // this.setCookie('department_id', data.dep_id)
      // this.setCookie('department_name', data.dep_name)
    },
    // add enter 事件
    enterKey(event) {
      const me = this;
      const code = event.keyCode
        ? event.keyCode
        : event.which
        ? event.which
        : event.charCode;
      if (code == 13) {
        me.loginFunc();
      }
    },
    enterKeyupDestroyed() {
      document.removeEventListener("keyup", this.enterKey);
    },
    enterKeyup() {
      document.addEventListener("keyup", this.enterKey);
    }
  }
};
</script>