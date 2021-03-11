<template>
  <el-container class="Home">
    <!-- 左侧导航栏 -->
    <el-aside :width="isopen ? '220px' : '69px'">
      <!-- logo展示区域 -->
      <div class="logo">
        <div class="userName" v-if="isopen">Admin</div>
        <img v-else src="../../assets/logo.png" alt="" />
      </div>
      <!-- 导航栏 -->
      <div class="menuBox">
        <z-menu :isopen="isopen"></z-menu>
      </div>
    </el-aside>
    <!-- 右侧区域 -->
    <el-container>
      <!-- 头部区域 -->
      <el-header height="90px">
        <div class="headerBox">
          <!-- 头部上半部分 -->
          <div class="top">
            <!-- 左侧 -->
            <div class="left">
              <!-- 图标 -->
              <div class="iconBox">
                <i
                  v-if="isopen"
                  @click="collapses"
                  class="el-icon-s-fold icon"
                ></i>
                <i v-else @click="collapses" class="el-icon-s-unfold icon"></i>
              </div>
              <!-- 面包屑 -->
              <div class="leftBread">
                <z-bread></z-bread>
              </div>
            </div>
            <!-- 右侧 -->
            <div class="right">
              <div class="rightIcon" @click="handleFullScreen">
                <el-tooltip
                  effect="dark"
                  :content="fullscreen ? `取消全屏` : `全屏`"
                  placement="bottom"
                >
                  <i class="el-icon-rank"></i>
                </el-tooltip>
              </div>
              <el-dropdown>
                <span class="el-dropdown-link">
                  <div class="usermsg">
                    <img src="../../assets/logo.png" alt="" /> admin<i
                      class="el-icon-arrow-down el-icon--right"
                    ></i>
                  </div>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="loginout"
                    >退出登陆</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <!-- tab栏 -->
          <div class="bottom">
            <z-tabs></z-tabs>
          </div>
        </div>
      </el-header>
      <!-- 内容区域 -->
      <el-main>
        <div class="main">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 是否展开显示
      isopen: true,
      // 是否开启全屏
      fullscreen: false,
    };
  },
  methods: {
    // 是否展开
    collapses() {
      this.isopen = !this.isopen;
    },
    loginout() {
      window.sessionStorage.removeItem("tabs");
      this.$router.push("/login");
    },
    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
  },
};
</script>

<style lang="less" scoped>
.Home {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: #f2f2f2;
  .el-aside {
    background: #20222a;
    overflow: hidden;
    .logo {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      .userName {
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        background: #20222a;
        color: rgba(255, 255, 255, 0.8);
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 1);
        font-size: 15px;
      }
      img {
        width: 30px;
        height: 30px;
      }
    }
    .menuBox {
      overflow-y: auto;
      .el-menu {
        border-right: none;
      }
    }
  }
  .el-header {
    display: flex;
    flex-direction: column;
    padding: 0;
    background: #fff;
    border-bottom: 1px solid #0000;
    .headerBox {
      flex: 1;
      display: flex;
      flex-direction: column;

      .top {
        flex: 1;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        .left {
          display: flex;
          align-items: center;
          .iconBox {
            font-size: 24px;
            cursor: pointer;
          }
          .leftBread {
            margin-left: 15px;
          }
        }
        .right {
          height: 100%;
          display: flex;
          align-items: center;
          .rightIcon {
            transform: rotate(45deg);
            font-size: 24px;
            cursor: pointer;
          }
          .usermsg {
            margin-left: 15px;
            display: flex;
            align-items: center;
            cursor: pointer;
            img {
              width: 25px;
              height: 25px;
              border-radius: 50%;
              margin-right: 5px;
            }
          }
        }
      }
      .top::after {
        width: 100%;
        height: 1px;
        border-bottom: 1px solid #f6f6f6;
        display: block;
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
      }
      .bottom {
        height: 40px;
        display: flex;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
      }
    }
  }
  .el-main {
    background: #fff;
    padding: 0;
    .main {
      width: 100%;
      background: #fff;
      padding: 20px;
      box-sizing: border-box;
    }
  }
}
</style>