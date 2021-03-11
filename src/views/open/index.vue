<template>
  <!-- 投票 -->
  <div class="voteBox">
    <!-- 筛选条件 -->
    <div class="top">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input size="small" v-model="formInline.user" placeholder="请输入姓名"></el-input>
        </el-form-item>
          <el-form-item label="评分">
          <el-input size="small" v-model="formInline.user" placeholder="请输入评分"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button size="mini" icon="el-icon-search" type="primary">搜索</el-button>
            <el-button size="mini" icon="el-icon-refresh" plain>重置</el-button>
        </el-form-item>
      </el-form>
      <el-button size="mini" icon="el-icon-plus" type="primary">添加</el-button>
    </div>
    <!-- 表格 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%; margin-top: 10px"
      highlight-current-row
      :header-cell-style="{ background: '#f8f8f9', color: '#606266' }"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="name" label="投票人"> </el-table-column>
      <el-table-column label="投票评分" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-rate v-model="scope.row.grade" show-text> </el-rate>
        </template>
      </el-table-column>
      <el-table-column label="投票时间">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button size="small" icon="el-icon-edit" type="text"
            >修改</el-button
          >
          <el-button size="small" icon="el-icon-delete-solid" type="text"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <z-pager></z-pager>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
      tableData: [
        {
          date: "2020-05-02",
          name: "张三",
          grade: 3,
        },
        {
          date: "2021-05-04",
          name: "李四",
          grade: 5,
        },
        {
          date: "2016-05-01",
          name: "王麻子",
          grade: 4,
        },
        {
          date: "2016-05-03",
          name: "赵六",
          grade: 1,
        },
        {
          date: "2016-05-03",
          name: "孙七",
          grade: 1,
        },
        {
          date: "2016-05-03",
          name: "周八",
          grade: 1,
        },
        {
          date: "2016-05-03",
          name: "吴九",
          grade: 1,
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.voteBox {
  width: 100%;
}
</style>