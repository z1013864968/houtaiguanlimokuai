<template>
  <!-- tab栏 -->
  <div class="tabs">
    <div class="left">
      <div @click="minus" class="arrowLeft">
        <i class="el-icon-d-arrow-left"></i>
      </div>
      <div
        class="arrowLeft"
        @click="openHome"
        :class="{ tabActrve: tabList.length == 0 || active == 0 }"
      >
        <i class="el-icon-house"></i>
      </div>
    </div>
    <div class="center">
      <div class="tab" :style="{ left: tabLeft + 'px' }" ref="tab">
        <template v-for="(item, index) in tabList">
          <div
            :key="item.meta.index"
            v-if="item.meta.index > 0"
            class="tabItem"
            @click.stop="openTab(item)"
            :class="{ tabActrve: active == item.meta.index }"
          >
            <div class="tabName">{{ item.meta.name }}</div>
            <i @click.stop="close(index)" class="el-icon-close clone"></i>
          </div>
        </template>
      </div>
    </div>
    <div class="right">
      <div @click="plus" class="arrowLeft">
        <i class="el-icon-d-arrow-right"></i>
      </div>
      <div class="arrowLeft" @mouseover="mouseover" @mouseleave="mouseleave">
        <i class="el-icon-arrow-down"></i>
      </div>
      <div
        class="cloneBox"
        @mouseover="mouseover"
        @mouseleave="mouseleave"
        v-show="isClonetabBox"
      >
        <div class="box">
          <div class="item" @click="cloneCurrent">关闭当前标签页</div>
          <div class="item" @click="cloneOther">关闭其他标签页</div>
          <div class="item" @click="cloneAll">关闭全部标签页</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "z-tabs",
  data() {
    return {
      // 控制关闭tabs盒子的显示和隐藏
      isClonetabBox: false,
      // 左右移动
      tabLeft: 0,
      // tab数组
      tabList: [],
      // 激活
      active: 0,
    };
  },
  created() {
    this.getTabList();
  },
  watch: {
    // 监听路由变化
    $route(newValue, oldValue) {
      this.setTab(newValue);
    },
  },
  methods: {
    // 设置tab
    setTab(route) {
      // 判断当前点击的是否是首页
      // 如果不是首页 判断 tabList是否有这一项如果没有就追加 如果有就跳转到当前页面
      if (route.meta.index > 0) {
        var isTab = this.tabList.findIndex((item) => {
          return item.meta.index == route.meta.index;
        });
        if (isTab < 0) {
          this.tabList.push({
            path: route.path,
            meta: route.meta,
          });
        }
        this.active = route.meta.index;
        window.sessionStorage.setItem("tabs", JSON.stringify(this.tabList));
      } else {
        this.active = 0;
        this.$router.push("/");
      }
    },
    // 获取tabs
    async getTabList() {
      var arr = JSON.parse(window.sessionStorage.getItem("tabs"));
      if (arr != null) {
        this.tabList = arr;
        this.setTab(this.$route);
      } else {
        this.setTab(this.$route);
      }
    },
    // 点击首页
    openHome() {
      this.active = 0;
      this.$router.push("/");
    },
    // 点击其他页面
    openTab(item) {
      this.active = item.meta.index;
      this.$router.push(item.path);
    },
    // 关闭tab
    close(index) {
      // 获取当前激活的页面
      var routerIndex = this.$route.meta.index;
      var RouterTab = this.tabList.findIndex((items) => {
        return items.meta.index == routerIndex;
      });
      if (this.tabList.length == 1) {
        this.tabList.splice(index, 1);
        this.$router.push("/");
        window.sessionStorage.setItem("tabs", JSON.stringify(this.tabList));
        return;
      }
      // 如果当前关闭的页面在数组中的索引不等于当前激活的页面 就删除
      if (index != RouterTab) {
      } else {
        if (index < this.tabList.length - 1) {
          this.$router.push(this.tabList[index + 1].path);
          this.active = index + 1;
        } else {
          this.$router.push(this.tabList[index - 1].path);
          this.active = index;
        }
      }
      this.tabList.splice(index, 1);

      if (this.tabList.length > 6) {
        if ((this.tabList.length - 6) * 160 < Math.abs(this.tabLeft)) {
          this.tabLeft = this.tabLeft + 160 * 4;
        }
      }
    },
    // 关闭当前页面
    cloneCurrent() {
      var index = this.tabList.findIndex((item) => {
        return item.meta.index == this.$route.meta.index;
      });
      console.log(index);
      if (index > -1) {
        this.close(index);
      }
    },
    // 关闭其他页面
    cloneOther() {
      var item = this.tabList.find((item) => {
        return item.meta.index == this.$route.meta.index;
      });
      this.tabList = [];
      this.tabList[0] = item;
      window.sessionStorage.setItem("tabs", JSON.stringify(this.tabList));
    },
    // 关闭全部
    cloneAll() {
      this.tabList = [];
      this.$router.push("/");
      window.sessionStorage.setItem("tabs", JSON.stringify(this.tabList));
    },
    // 左
    minus() {
      if (this.tabLeft < 0) {
        this.tabLeft = this.tabLeft + 160 * 4;
      }
    },
    // 右
    plus() {
      if ((this.tabList.length - 6) * 160 > Math.abs(this.tabLeft)) {
        this.tabLeft = this.tabLeft - 160 * 4;
      }
    },
    // 鼠标移入
    mouseover() {
      this.isClonetabBox = true;
    },
    // 鼠标移出
    mouseleave() {
      this.isClonetabBox = false;
    },
  },
};
</script>

<style lang="less" scoped>
.tabs {
  flex: 1;
  display: flex;
  align-items: center;
  overflow: hidden;

  .arrowLeft {
    width: 47px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border-left: 1px solid #f6f6f6;
    border-right: 1px solid #f6f6f6;
    cursor: pointer;
    box-sizing: border-box;
    position: relative;
    &:hover {
      background: #f6f6f6;
    }
  }
  .tabActrve {
    background: #f6f6f6;

    &::after {
      content: "";
      display: inline-block;
      position: absolute;
      width: 100%;
      height: 2px;
      top: 0;
      left: 0;
      background: #000;
    }
  }

  .left {
    display: flex;
  }
  .center {
    flex: 1;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: flex-start;
    .tab {
      flex: 1;
      display: flex;
      justify-content: flex-start;
      position: relative;
      white-space: nowrap;
    }
    .tabItem {
      max-width: 160px;
      border-right: 1px solid #f6f6f6;
      border-bottom: 1px solid #f6f6f6;
      min-height: 40px;
      padding: 0 15px;
      display: flex;
      align-items: center;
      cursor: pointer;
      box-sizing: border-box;
      position: relative;
      justify-content: space-between;
      .tabName {
        color: #666;
        font-size: 14px;
      }
      .clone {
        margin-left: 5px;
        border-radius: 50%;
        padding: 1px;
        box-sizing: border-box;

        &:hover {
          background: #ff5722;
          color: #fff;
        }
      }
      &:hover {
        background: #f6f6f6;
        transition: all 2s;
      }
      &:hover::after {
        content: "";
        display: inline-block;
        position: absolute;
        width: 100%;
        height: 2px;
        top: 0;
        left: 0;
        background: #000;
      }
    }
  }
  .right {
    display: flex;
    position: static;
    z-index: 9;
    .cloneBox {
      position: absolute;
      right: 0;
      top: 90px;
      z-index: 1;
      color: #666;
      font-size: 14px;
      padding: 4px 0;
      background: #f6f6f6;
      .box {
        background: #fff;
        padding: 4px 0;
        .item {
          line-height: 36px;
          cursor: pointer;
          padding: 0px 20px;
          &:hover {
            background: #f2f2f2;
          }
        }
      }
    }
  }
}
</style>