<template>
  <div class="goods-info" @click="goDetails">
    <div>
      <img v-lazy="sellWellItem.image" width="90%" />
    </div>
    <div class="goods-name">{{ sellWellItem.name }}</div>
    <div class="goods-price">￥{{ sellWellItem.price | priceFilter }}</div>
  </div>
</template>

<script>
import priceFilter from "../../filter/priceFilter";
export default {
  name: "goodsInfo",
  props: ["sellWellItem"],
  filters: {
    priceFilter
  },
  methods: {
    goDetails() {
      this.$router.push({
        name: "GoodsDetails",
        query: { goodsId: this.sellWellItem.goodsId }
      });
    }
  }
};
</script>

<style scoped>
.goods-name,
.goods-price {
  font-size: 0.8rem;
  padding: 0 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
