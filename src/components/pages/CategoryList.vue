<template>
  <div>
    <div class="navbar">
      <van-nav-bar title="类别列表" />
    </div>
    <div>
      <van-row>
        <van-col span="6">
          <div id="leftNav">
            <ul>
              <li
                v-for="(item, index) in category"
                :key="index"
                @click="activeCategory(index, item.ID)"
                :class="{ categoryActive: index === categoryActiveIndex }"
              >
                {{ item.MALL_CATEGORY_NAME }}
              </li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <van-tabs v-model="active" @click="activeSubCategory">
            <van-tab
              v-for="(item, index) in subCategory"
              :key="index"
              :title="item"
            >
            </van-tab>
          </van-tabs>
          <div id="list-div">
            <van-pull-refresh v-model="isRefresh" @refresh="pullDown">
              <van-list v-model="loading" :finished="finished" @load="pullUp">
                <div
                  class="list-item"
                  v-for="(item, index) in goodsList"
                  :key="index"
                  @click="goGoodsDetails(item.ID)"
                >
                  <div class="list-item-img">
                    <img :src="item.IMAGE1" :onerror="errImg" width="100%" />
                  </div>
                  <div class="list-item-text">
                    <div>{{ item.NAME }}</div>
                    <div>￥{{ item.ORI_PRICE }}</div>
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Toast } from "vant";
export default {
  name: "CategoryList",
  data() {
    return {
      category: null,
      subCategory: null,
      categoryActiveIndex: 0, //被激活的父类的索引
      active: 0, //被激活的子类
      timeoutID: null,
      loading: false, //上拉加载使用
      finished: false, //下拉加载是否没有数据了
      page: 1, //商品列表的页数
      goodsList: [], //商品信息
      subCategoryId: "", //商品子分类ID
      isRefresh: false, //下拉加载
      errImg: 'this.src="' + require("../../assets/logo.png") + '"'
    };
  },
  methods: {
    getCategory() {
      axios({
        url: "/category",
        method: "get"
      })
        .then(response => {
          if (response.status === 200 && response.data) {
            this.category = response.data.RECORDS;
            this.getSubCategoryByCategoryId(this.category[0].ID);
          } else {
            Toast("服务器错误，数据取得失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getSubCategoryByCategoryId(categoryId) {
      axios({
        url: "/category",
        method: "GET",
        params: { categoryId: categoryId }
      })
        .then(response => {
          if (response.status === 200 && response.data) {
            this.subCategory = response.data;
            this.active = 0;
            this.subCategoryId = this.subCategory[0];
            this.pullUp();
          } else {
            Toast("服务器错误，数据取得失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    activeCategory(index, categoryId) {
      this.categoryActiveIndex = index;
      this.page = 1;
      this.finished = false;
      this.goodsList = [];
      this.getSubCategoryByCategoryId(categoryId);
    },
    pullUp() {
      if (!this.timeoutID) {
        this.getGoodList();
        this.loading = false;
        this.timeoutID = setTimeout(() => {
          this.timeoutID = null;
        }, 500);
      }
    },
    pullDown: (function() {
      let timeoutID = null;
      return function() {
        if (!timeoutID) {
          this.isRefresh = false;
          this.finished = false;
          this.goodsList = [];
          this.page = 1;
          this.pullUp();
          timeoutID = setTimeout(() => {
            timeoutID = null;
          }, 500);
        }
      };
    })(),
    getGoodList() {
      axios({
        url: "/category",
        method: "get",
        params: {
          subCategoryId: this.subCategoryId
            ? this.subCategoryId
            : this.subCategory[0],
          page: this.page
        }
      })
        .then(response => {
          console.log(response);
          if (response.status === 200 && response.data.length) {
            this.page++;
            this.goodsList.push(...response.data);
          } else {
            this.finished = true;
          }
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    activeSubCategory() {
      this.subCategoryId = this.subCategory[this.active];
      this.goodsList = [];
      this.finished = false;
      this.page = 1;
      this.pullUp();
    },
    goGoodsDetails(goodsId) {
      this.$router.push({ name: "GoodsDetails", query: { goodsId: goodsId } });
    }
  },
  created() {
    this.getCategory();
  },
  mounted() {
    let clientHeight = document.documentElement.clientHeight;
    document.getElementById("leftNav").style.height =
      clientHeight - 46 - 50 + "px";
    document.getElementById("list-div").style.height =
      clientHeight - 90 - 50 + "px";
  }
};
</script>

<style scoped>
#leftNav {
  background-color: aliceblue;
}
#leftNav ul li {
  line-height: 2rem;
  border-bottom: 1px solid #e4e7ed;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}
.categoryActive {
  background-color: #fff;
}
.list-item {
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  padding: 5px;
}
#list-div {
  overflow: scroll;
}
.list-item-img {
  flex: 8;
}
.list-item-text {
  flex: 16;
  margin-top: 10px;
  margin-left: 10px;
}
</style>
