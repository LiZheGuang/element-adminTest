<template>
  <div>
    <head-top></head-top>
    <el-row style="margin-top: 20px;">
      <el-col :span="14" :offset="4">
        <header class="form_header">选择商品种类</header>
        <el-form :model="categoryForm" ref="categoryForm" label-width="110px" class="form">
          <el-row class="category_select">
            <el-form-item label="商品种类">
              <el-select
                v-model="categoryForm.categorySelect"
                :placeholder="selectValue.label"
                style="width:100%;"
              >
                <el-option
                  v-for="item in categoryForm.categoryList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-row>
        </el-form>
        <header class="form_header">添加商品</header>
        <el-form :model="foodForm" ref="foodForm" label-width="110px" class="form food_form">
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="foodForm.name"></el-input>
          </el-form-item>

          <el-form-item label="商城价" prop="activity">
            <el-input v-model="foodForm.activity"></el-input>
          </el-form-item>
          <el-form-item label="市场价" prop="description">
            <el-input v-model="foodForm.description"></el-input>
          </el-form-item>

          <el-form-item label="折扣价" prop="description">
            <el-input v-model="foodForm.description"></el-input>
          </el-form-item>

          <!-- <el-form-item label="上传食品图片">
            <el-upload
              class="avatar-uploader"
              :action="baseUrl + '/v1/addimg/food'"
              :show-file-list="false"
              :on-success="uploadImg"
              :before-upload="beforeImgUpload"
            >
              <img
                v-if="foodForm.image_path"
                :src="baseImgPath + foodForm.image_path"
                class="avatar"
              >
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>-->
          <el-form :model="categoryForm" ref="categoryForm" label-width="110px" class="form">
            <el-row>
              <el-form-item label="商品种类">
                <el-select
                  v-model="categoryForm.categorySelect"
                  :placeholder="selectValue.label"
                  style="width:100%;"
                >
                  <el-option
                    v-for="item in categoryForm.categoryList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-row>
          </el-form>

          <el-form-item label="折扣时间" prop="time">
            <el-date-picker
              v-model="promotion"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>

          <el-row style="overflow: auto; text-align: center;">
            <el-button
              type="primary"
              @click="dialogFormVisible = true"
              style="margin-bottom: 10px;"
            >添加规格</el-button>
            <el-table
              :data="foodForm.specs"
              style="margin-bottom: 20px;"
              :row-class-name="tableRowClassName"
            >
              <el-table-column prop="specs" label="商品名称"></el-table-column>
              <el-table-column prop="packing_fee" label="库存"></el-table-column>
              <el-table-column prop="price" label="差价"></el-table-column>
              <el-table-column prop="price" label="版本名称"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="small" type="danger" @click="handleDelete(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <el-form-item>
            <el-button type="primary" @click="addFood('foodForm')">确认添加商品</el-button>
            <el-button type="success" @click="clickpostCommodityCreation()">快速添加商品</el-button>
          </el-form-item>
        </el-form>
        <el-dialog title="添加规格" v-model="dialogFormVisible">
          <el-form :rules="specsFormrules" :model="specsForm">
            <el-form-item label="库存" label-width="100px" prop="specs">
              <el-input v-model="specsForm.specs" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="商品名称" label-width="100px" prop="specs">
              <el-input v-model="specsForm.specs" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="差价" label-width="100px" prop="specs">
              <el-input v-model="specsForm.specs" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="版本名称" label-width="100px" prop="specs">
              <el-input v-model="specsForm.specs" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addspecs">确 定</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import headTop from "@/components/headTop";
import { postCommodityCreation } from "@/api/getData";
import { baseUrl, baseImgPath } from "@/config/env";
export default {
  data() {
    return {
      promotion: "",
      baseUrl,
      baseImgPath,
      restaurant_id: 1,
      categoryForm: {
        categoryList: [
          {
            value: "book",
            label: "图书"
          },
          {
            value: "video",
            label: "视频"
          }
        ],
        categorySelect: "",
        name: "",
        description: ""
      },
      foodForm: {
        name: "",
        description: "",
        image_path: "",
        activity: "",
        attributes: [],
        specs: [
          {
            specs: "默认",
            packing_fee: 0,
            price: 20
          }
        ]
      },

      attributes: [
        {
          value: "新",
          label: "新品"
        },
        {
          value: "招牌",
          label: "招牌"
        }
      ],
      showAddCategory: false,
      foodSpecs: "one",
      dialogFormVisible: false,
      specsForm: {
        specs: "",
        packing_fee: 0,
        price: 20
      },
      specsFormrules: {
        specs: [{ required: true, message: "请输入规格", trigger: "blur" }]
      }
    };
  },
  components: {
    headTop
  },
  created() {
    this.initData();
  },
  computed: {
    selectValue: function() {
      return (
        this.categoryForm.categoryList[this.categoryForm.categorySelect] || {}
      );
    }
  },
  methods: {
    async initData() {
      try {
        const result = await getCategory(this.restaurant_id);
        if (result.status == 1) {
          result.category_list.map((item, index) => {
            item.value = index;
            item.label = item.name;
          });
          this.categoryForm.categoryList = result.category_list;
        } else {
          console.log(result);
        }
      } catch (err) {
        console.log(err);
      }
    },
    addCategoryFun() {
      this.showAddCategory = !this.showAddCategory;
    },
    uploadImg(res, file) {
      if (res.status == 1) {
        this.foodForm.image_path = res.image_path;
      } else {
        this.$message.error("上传图片失败！");
      }
    },
    beforeImgUpload(file) {
      const isRightType =
        file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isRightType) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isRightType && isLt2M;
    },
    addspecs() {
      this.foodForm.specs.push({ ...this.specsForm });
      this.specsForm.specs = "";
      this.specsForm.packing_fee = 0;
      this.specsForm.price = 20;
      this.dialogFormVisible = false;
    },
    handleDelete(index) {
      this.foodForm.specs.splice(index, 1);
    },
    tableRowClassName(row, index) {
      if (index === 1) {
        return "info-row";
      } else if (index === 3) {
        return "positive-row";
      }
      return "";
    },
    addFood(foodForm) {
      this.$refs[foodForm].validate(async valid => {
        if (valid) {
          const params = {
            ...this.foodForm,
            category_id: this.selectValue.id,
            restaurant_id: this.restaurant_id
          };
          try {
            const result = await addFood(params);
            if (result.status == 1) {
              console.log(result);
              this.$message({
                type: "success",
                message: "添加成功"
              });
              this.foodForm = {
                name: "",
                description: "",
                image_path: "",
                activity: "",
                attributes: [],
                specs: [
                  {
                    specs: "默认",
                    packing_fee: 0,
                    price: 20
                  }
                ]
              };
            } else {
              this.$message({
                type: "error",
                message: result.message
              });
            }
          } catch (err) {
            console.log(err);
          }
        } else {
          this.$notify.error({
            title: "错误",
            message: "请检查输入是否正确",
            offset: 100
          });
          return false;
        }
      });
    },
    async clickpostCommodityCreation() {
      let title = [
        "三体",
        "三国演义",
        "水浒",
        "斗破苍穹",
        "摆渡者",
        "明日之子",
        "七龙珠"
	  ];
	  let keyNumber = this.sum(0,title.length -1)

	  let mathTitle = title[keyNumber]

      let data = {
        category: keyNumber % 2  ? 'video' :'book',
        title: mathTitle,
        marketRprice: 8500,
        salePrice: 6500,
        promotionPrice: 5500,
        promotionEndTime: "1544177129002",
        picture: [
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544782013&di=0fc4b5dbb2d7a9996997c8da97cb9852&imgtype=jpg&er=1&src=http%3A%2F%2Fimage13.m1905.cn%2Fuploadfile%2F2018%2F0426%2F20180426035739175560.jpg"
        ],
        pressId: "5c10b0f145253d6299773068",
        skuData: {
          repertory: 1499,
          title: mathTitle+"上集",
          version: "亚马逊精选版",
          picture: [
            {
              url:
                "http://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E4%B8%89%E4%BD%93&step_word=&hs=0&pn=12&di=91572017350&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=777645829%2C1873139044&os=2373354084%2C1656594747&simid=0%2C0&adpicid=0&lpn=0&ln=1805&fr=&fmq=1544512931149_R&fm=&ic=undefined&s=undefined&hd=undefined&latest=undefined&copyright=undefined&se=&sme=&tab=0&width=&height=&face=undefined&ist=&jit=&cg=&oriquery=&objurl=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171005%2Ff7073fce3f454b44a1376aa4310b7dff.jpeg&gsm=3c&rpstart=0&rpnum=0&tabname=&islist=&querylist=&selected_tags=",
              urlTitle: "淘气包马小跳"
            }
          ]
        }
      };
      let createRes = await postCommodityCreation(data);
      if (createRes.data.code === 200) {
        this.$message("商品创造成功");
      }
    },
    sum(m, n) {
      var num = Math.floor(Math.random() * (m - n) + n);
      return num;
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.form {
  min-width: 400px;
  margin-bottom: 30px;
  &:hover {
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
    border-radius: 6px;
    transition: all 400ms;
  }
}
.food_form {
  border: 1px solid #eaeefb;
  padding: 10px 10px 0;
}
.form_header {
  text-align: center;
  margin-bottom: 10px;
}
.category_select {
  border: 1px solid #eaeefb;
  padding: 10px 30px 10px 10px;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
}
.add_category_row {
  height: 0;
  overflow: hidden;
  transition: all 400ms;
  background: #f9fafc;
}
.showEdit {
  height: 185px;
}
.add_category {
  background: #f9fafc;
  padding: 10px 30px 0px 10px;
  border: 1px solid #eaeefb;
  border-top: none;
}
.add_category_button {
  text-align: center;
  line-height: 40px;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  border: 1px solid #eaeefb;
  border-top: none;
  transition: all 400ms;
  &:hover {
    background: #f9fafc;
    span,
    .edit_icon {
      color: #20a0ff;
    }
  }
  span {
    .sc(14px, #999);
    transition: all 400ms;
  }
  .edit_icon {
    color: #ccc;
    transition: all 400ms;
  }
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
.cell {
  text-align: center;
}
</style>
