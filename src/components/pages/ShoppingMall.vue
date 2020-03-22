<template>
  <div>
    <div class="search-bar">
      <van-row type="flex" justify="center" align="center">
        <van-col
          type="flex"
          justify="center"
          align="center"
          span="3"
          class="iconfont"
          >&#xe7a3;</van-col
        >
        <van-col type="flex" justify="center" align="center" span="16">
          <van-search v-model="keyWords" placeholder="请输入搜索关键词" />
        </van-col>
        <van-col type="flex" justify="center" align="center" span="5">
          <van-button size="small">查找</van-button>
        </van-col>
      </van-row>
    </div>
    <div class="swipe-area">
      <van-swipe :autoplay="1000">
        <van-swipe-item v-for="(img, index) in bannerPic" :key="index">
          <img v-lazy="img.image" width="100%" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="type-bar">
      <div v-for="(goods, index) in category" :key="index">
        <img v-lazy="goods.image" width="55rem" />
        <span>{{ goods.mallCategoryName }}</span>
      </div>
    </div>
    <!-- adBanner -->
    <div>
      <img v-lazy="adBanner" width="100%" />
    </div>
    <!-- recommend -->
    <div class="recommend-area">
      <div class="recommend-title">
        商品推荐
      </div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(goods, index) of recommendGoods" :key="index">
            <div class="recommend-item">
              <img v-lazy="goods.image" width="99%" />
              <div>{{ goods.goodsName }}</div>
              <div>
                ￥{{ goods.price | priceFilter }}({{
                  goods.mallPrice | priceFilter
                }})
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- floor -->
    <floor :floorData="floor1" :floorName="floorName" floor="floor1"></floor>
    <floor :floorData="floor2" :floorName="floorName" floor="floor2"></floor>
    <floor :floorData="floor3" :floorName="floorName" floor="floor3"></floor>
    <!-- Hot Area -->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <van-list>
          <van-row gutter="20">
            <van-col span="12" v-for="(item, index) in sellWell" :key="index">
              <goods-info :sellWellItem="item"></goods-info>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import priceFilter from "../../filter/priceFilter";
import floor from "../common/floor";
import goodsInfo from "../common/goodsInfo";
export default {
  name: "ShoppingMall",
  components: {
    swiper,
    swiperSlide,
    floor,
    goodsInfo
  },
  data() {
    return {
      keyWords: "",
      swiperOption: { slidesPerView: 3 },
      bannerPic: [],
      category: [],
      adBanner: "",
      recommendGoods: [],
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: {},
      sellWell: []
    };
  },
  filters: {
    priceFilter
  },
  beforeCreate() {
    axios({
      url: "/mall",
      method: "GET"
    })
      .then(response => {
        this.bannerPic = response.data.slides;
        this.category = response.data.category;
        this.adBanner = response.data.advertesPicture.PICTURE_ADDRESS;
        this.recommendGoods = response.data.recommend;
        this.floor1 = response.data.floor1;
        this.floor2 = response.data.floor2;
        this.floor3 = response.data.floor3;
        this.floorName = response.data.floorName;
        this.sellWell = response.data.hotGoods;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
@font-face {
  font-family: "iconfont";
  src: url("../../../public/font/iconfont.eot");
  src: url("../../../public/font/iconfont.eot?#iefix")
      format("embedded-opentype"),
    url("../../../public/font/iconfont.woff2") format("woff2"),
    url("../../../public/font/iconfont.woff") format("woff"),
    url("../../../public/font/iconfont.ttf") format("truetype"),
    url("../../../public/font/iconfont.svg#iconfont") format("svg");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 2rem;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.type-bar {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  background-color: #fff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 0.7rem;
  text-align: center;
}
.recommend-area {
  margin-top: 0.3rem;
}
.recommend-title {
  border-bottom: 1px solid #eee;
  padding-left: 0.2rem;
  font-size: 1rem;
  color: #e5017d;
}
.recommend-body {
  border-bottom: 1px solid #eee;
}
.recommend-item {
  border-right: 1px solid #eee;
  font-size: 0.7rem;
  text-align: center;
}
.hot-title {
  height: 1.8rem;
  line-height: 1.8rem;
  text-align: center;
  font-size: 1rem;
  background-color: #ddd;
}
.hot-goods {
  margin-bottom: 3.125rem;
  overflow: hidden;
  background-color: #fff;
}
</style>
