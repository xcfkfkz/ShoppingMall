<template>
  <div class="navbar-div">
    <van-nav-bar
      title="商品详情"
      left-text="返回"
      left-arrow
      @click-left="back"
    />
    <div class="top-image">
      <img v-lazy="goodsInfo.IMAGE1" width="100%" />
    </div>
    <div class="goods-name">{{ goodsInfo.NAME }}</div>
    <div class="goods-price">价格：￥{{ goodsInfo.PRESENT_PRICE }}</div>
    <div>
      <van-tabs sticky swipeable>
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsInfo.DETAIL"></div>
        </van-tab>
        <van-tab title="评价">
          正在制作中
        </van-tab>
      </van-tabs>
    </div>
    <div class="goods-bottom">
      <div>
        <van-button size="large" type="primary" @click="addToCart"
          >加入购物车</van-button
        >
      </div>
      <div>
        <van-button size="large" type="danger">直接购买</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Toast } from "vant";

export default {
  name: "GoodsDetails",
  data() {
    return {
      goodsId: "",
      goodsInfo: null
    };
  },
  methods: {
    getInfo() {
      axios({
        url: "/goods",
        method: "get",
        params: {
          goodsId: this.goodsId
        }
      })
        .then(res => {
          if (res.status === 200 && res.data) {
            this.goodsInfo = res.data;
          } else {
            Toast("服务器错误，数据取得失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    back() {
      this.$router.go(-1);
    },
    addToCart() {
      //取出购物车内的商品数据
      let cartInfo = localStorage.cartInfo
        ? JSON.parse(localStorage.cartInfo)
        : [];
      //判断购物车内是否已经有这个商品
      //如果没有返回undefined，如果有返回第一个查找到的数据
      let hadGoods = cartInfo.some(cart => cart.goodsId === this.goodsId);
      if (!hadGoods) {
        //没有商品直接添加到数组中
        //重新组成添加到购物车的信息
        let newGoodsInfo = {
          goodsId: this.goodsInfo.ID,
          name: this.goodsInfo.NAME,
          price: this.goodsInfo.PRESENT_PRICE,
          image: this.goodsInfo.IMAGE1,
          count: 1
        };
        cartInfo.push(newGoodsInfo); //添加到购物车
        localStorage.cartInfo = JSON.stringify(cartInfo); //操作本地数据
        Toast.success("添加成功");
      } else {
        Toast.success("已有此商品");
      }
      this.$router.push({ name: "Cart" }); //进行跳转
    }
  },
  created() {
    this.goodsId = this.$route.query.goodsId;
    this.getInfo();
  }
};
</script>

<style scoped>
.detail {
  font-size: 0px;
}

.goods-name,
.goods-price {
  background-color: #fff;
}

.goods-bottom {
  display: flex;
  flex-direction: row;
  flex-flow: nowrap;
  position: fixed;
  bottom: 0px;
  left: 0px;
  background-color: #fff;
  width: 100%;
}

.goods-bottom > div {
  flex: 1;
  padding: 5px;
}
</style>
