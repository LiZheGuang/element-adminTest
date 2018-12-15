<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-table
        :data="commodityListData.list"
        :expand-row-keys="expendRow"
        :row-key="row => row.index"
        style="width: 100%"
      >
        <el-table-column type="expand" >
          <template slot-scope="props">
            <el-form label-position="left" v-for="item in props.row.abbrId " inline class="demo-table-expand">
              <el-form-item label="商品关联ID">
                <span>{{ item._id }}</span>
              </el-form-item>
              <el-form-item label="商品名称">
                <span>{{ item.title }}</span>
              </el-form-item>
              <el-form-item label="商品版本">
                <span>{{ item.version }}</span>
              </el-form-item>
              <el-form-item label="差价">
                <span>{{ item.priceSpread }}</span>
              </el-form-item>
              <el-form-item label="库存">
                <span>{{ item.repertory}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="title"></el-table-column>
        <el-table-column label="商城价" prop="promotionPrice"></el-table-column>
        <el-table-column label="市场价" prop="marketRprice"></el-table-column>
        <el-table-column label="商品id" prop="_id"></el-table-column>
        <el-table-column label="出版社id" prop="pressId"></el-table-column>
        <el-table-column label="商品类型" prop="category"></el-table-column>
        <el-table-column label="上架状态(1上架)" prop="status"></el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope" v-if="scope.row.status === 0">
            <!-- <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button> -->
            <el-button size="small" @click="clickEditStatus(scope.row)">上架</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    
      </div>
    </div>
  </div>
</template>

<script>
import headTop from "../components/headTop";
import { baseUrl, baseImgPath } from "@/config/env";
import {
  getCommodityList,
postEditStatus,
} from "@/api/getData";
export default {
  data() {
    return {
      // new
      commodityListData: ""
    };
  },
  created() {
    this.restaurant_id = this.$route.query.restaurant_id;
    this.initData();
  },
  computed: {
    specs: function() {
      let specs = [];
      if (this.selectTable.specfoods) {
        this.selectTable.specfoods.forEach(item => {
          specs.push({
            specs: item.specs_name,
            packing_fee: item.packing_fee,
            price: item.price
          });
        });
      }
      return specs;
    }
  },
  components: {
    headTop
  },
  methods: {
    async initData() {
      try {
        // const countData = await getFoodsCount({restaurant_id: this.restaurant_id});
        // if (countData.status == 1) {
        //     this.count = countData.count;
        // }else{
        //     throw new Error('获取数据失败');
        // }
        this.getFoods();
      } catch (err) {
        console.log("获取数据失败", err);
      }
    },
    async clickEditStatus(scope){

      let _id = scope._id
      let postEditStatusRes =  await postEditStatus({
        id:_id,
        status:1
      })
      if(postEditStatusRes.data.code === 200){
        this.$message('上架成功');
location.reload()
      }
    },
    async getFoods() {
      const CommodityList = await getCommodityList();
      let commodityListData = CommodityList.data;
      //   this.tableData = [];
      commodityListData.list.forEach((item, index) => {
        item.promotionPrice = item.promotionPrice / 100;
        item.marketRprice = item.marketRprice / 100;
      });
      this.commodityListData = commodityListData;
    }
  

 
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.table_container {
  padding: 20px;
}
.Pagination {
  display: flex;
  justify-content: flex-start;
  margin-top: 8px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>
