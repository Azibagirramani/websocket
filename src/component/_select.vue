<template>
  <select
    class="form-select form-select-sm shadow wb-2 text-capitalize"
    aria-label=".form-select-sm example"
    v-model="Ivalue"
  >
    <option v-for="(value, index) in items" :value="value" :key="index">
      {{ value }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      required: false,
      default: "",
    },
    placeholder: {
      type: String,
      required: false,
    },
    items: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
  },
  computed: {
    Ivalue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.wb-2 {
  width: 10rem !important;
  height: 3rem !important;
}
</style>
