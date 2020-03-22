<template>
  <div class="floor">
    <div class="floor-title">{{ floorTitle }}</div>
    <div class="floor-irregular">
      <div class="floor-one">
        <img v-lazy="floorData[0].image" width="100%" />
      </div>
      <div>
        <div class="floor-two">
          <img v-lazy="floorData[1].image" width="100%" />
        </div>
        <div>
          <img v-lazy="floorData[2].image" width="100%" />
        </div>
      </div>
    </div>
    <div class="floor-regular">
      <div v-for="(item, index) in floorData.slice(3)" :key="index">
        <img v-lazy="item.image" width="100%" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "floor",
  props: ["floorData", "floorName", "floor"],
  computed: {
    floorTitle() {
      return this.floorName[this.floor];
    }
  }
};
</script>

<style scoped>
.floor-title {
  height: 1.8rem;
  line-height: 1.8rem;
  text-align: center;
  font-size: 1rem;
  background-color: #ddd;
}
.floor-irregular {
  display: flex;
  border-bottom: 1px solid #ddd;
}
.floor-irregular div {
  width: 10rem;
  box-sizing: border-box;
}
.floor-one {
  border-right: 1px solid #ddd;
}
.floor-two {
  border-bottom: 1px solid #ddd;
}
.floor-regular {
  display: flex;
  flex-wrap: wrap;
}
.floor-regular div {
  box-sizing: border-box;
  width: 10rem;
  border-bottom: 1px solid #ddd;
}
.floor-regular div:nth-child(odd) {
  border-right: 1px solid #ddd;
}
</style>
