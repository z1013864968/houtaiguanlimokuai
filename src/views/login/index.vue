<template>
  <div class="login">
    <div class="loginBox">
      <div class="left"></div>
      <div class="right">
        <div class="rightBox">
          <el-input v-model="reqParams.iphone" prefix-icon="el-icon-user-solid" class="iphone"></el-input>
          <el-input v-model="reqParams.code" prefix-icon="el-icon-lock" class="code"></el-input>
          <el-button round class="btn" @click="Login">立即登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      reqParams:{
        iphone:'',
        code:''
      }
    }
  },
  methods:{
    Login(){
      this.$router.push('/')
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-image: linear-gradient(135deg, #cea6f3, #59a7f5);
  .loginBox {
    width: 700px;
    height: 400px;
    background: #ffff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    box-shadow: 0px 3px 12px #877f7f;
    display: flex;
    overflow: hidden;
    .left {
      flex: 4;
      background: url("../../assets/login.jpg") no-repeat center/cover;
    }
    .right {
      flex: 5;
      padding: 20px;
      box-sizing: border-box;
      position: relative;
      /deep/ .el-input {
        border: none;
      }
      .el-input__inner {
        border: 1px solid #fff;
      }
      .rightBox {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 100%;

          padding: 20px;
            box-sizing: border-box;
      }
      .code {
        margin-top: 20px;
      }
      .btn {
        width: 100%;
        margin-top: 50px;
        background: #273849;
        color: #ffff;
      }
    }
  }
}
</style>