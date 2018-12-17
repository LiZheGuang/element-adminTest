<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-table :data="userData"  style="width: 100%">
        <el-table-column prop="_id" label="用户id" width="180"></el-table-column>
        <el-table-column prop="nickName" label="用户昵称" width="180"></el-table-column>
        <el-table-column prop="token" label="token"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import headTop from "../components/headTop";
import { getUserList } from "@/api/getData";
export default {
  data() {
    return {
      userData: []
    };
  },
  components: {
    headTop
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      this.getUsers();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
      this.getUsers();
    },
    async getUsers() {
      const Users = await getUserList();
      this.userData = Users.data.userList
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.table_container {
  padding: 20px;
}
</style>
