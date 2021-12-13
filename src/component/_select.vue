<template>
  <select
    class="form-select form-select-sm"
    aria-label=".form-select-sm example"
  >
    <option selected>Open this select menu</option>
    <option v-for="(option, index) in options" :value="option" :key="index">
      {{ option }}
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
    options: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    selectOptions() {
      return this.options.map((option) => {
        return {
          value: option.value,
          text: option.text,
        };
      });
    },
  },
};
</script>

<style></style>
