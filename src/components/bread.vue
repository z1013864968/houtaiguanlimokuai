<template>
  <!-- 面包屑 -->
  <div class="bread">
    <el-breadcrumb separator="/" class="breadcrumb-inner">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <template v-for="item in $route.matched">
        <template v-if="item.path">
          <el-breadcrumb-item :key="item.path">
            {{ item.meta.name }}
          </el-breadcrumb-item>
        </template>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "z-bread",
  data() {
    return {
      currentRouter: null,
    };
  },
  created() {
    this.getBread();
  },
  methods: {
    getBread() {
      this.currentRouter = this.$route.fullPath;
    },
  },
};
</script>

<style>
</style>