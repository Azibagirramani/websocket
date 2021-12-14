<template>
  <div>
    <div class="d-flex gap-3 align-items-center">
      <div class="battery">
        <div
          class="battery-level"
          :style="{ backgroundColor: batteryColor, width: percent + '%' }"
        ></div>
      </div>
      <div class="flex-1">
        <div class="text-muted f-7">{{ percent }}%</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    percent: {
      type: Number,
      required: true,
      default: 50,
    },
  },

  computed: {

    // set the color of the battery based on the percentage
    batteryColor() {
      if (this.percent >= 50) {
        return "green";
      } else if (this.percent >= 30) {
        return "yellow";
      } else {
        return "red";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.f-7 {
  font-size: 0.7rem;
  font-weight: 800;
}

.battery:after {
  background-color: #fff;
  border: 2px solid #e6e5e5;
  content: "";
  display: block;
  height: 10px;
  position: absolute;
  right: -6px;
  top: 6px;
  width: 6px;
}
.battery {
  background-color: #fff;
  border: 2px solid #ebebeb;
  height: 1.5rem;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  width: 3rem;
}

.battery-level {
  height: 100%;
}
</style>
