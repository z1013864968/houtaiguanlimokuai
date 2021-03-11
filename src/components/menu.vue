<template>
  <!-- 导航菜单 -->
  <el-menu
    :collapse="!isopen"
    :default-active="$route.path"
    class="menu"
    background-color="#20222a"
    text-color="#ffffff"
    router
  >
    <template v-for="item in routerPath">
      <el-submenu
        v-if="item.children && item.children.length >= 1"
        :key="item.path"
        :index="item.children[0].path"
      >
        <template slot="title">
          <i :class="item.meta.icon"></i>
          <span>{{ item.meta.name }}</span>
        </template>
        <template v-for="citem in item.children">
          <el-menu-item :index="citem.path" :key="citem.path">
            {{ citem.meta.name }}
          </el-menu-item>
        </template>
      </el-submenu>
      <el-menu-item v-if="!item.children" :index="item.path" :key="item.path">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{ item.meta.name }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
export default {
  name: "z-menu",
  props: {
    isopen: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      routerPath: [],
    };
  },
  created() {
    this.getRouterInfo();
  },
  methods: {
    getRouterInfo() {
      var arr = [];
      arr = this.$router.options.routes;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].path == "/") {
          this.routerPath = this.$router.options.routes[i].children;
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu {
  border-right: none;
  overflow-y: auto;
}
</style>