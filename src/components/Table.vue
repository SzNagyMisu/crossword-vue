<script>
import Cell from './Cell.vue';

export default {
  components: {Cell},
  props: {
    rows: {
        type: Array,
        required: true,
    }
  },
  emits: ["cellClicked"],
  methods: {
    cellClicked (cell) {
        this.$emit("cellClicked", { cell });
    }
  }
};
</script>

<template>
  <section class="table">
    <section class="row" v-for="row in rows">
      <Cell
        v-for="(cell, cellIdx) in row"
        :key="cellIdx"
        v-bind="cell"
        @click="() => cellClicked(cell)"
      />
    </section>
  </section>
</template>

<style scoped>
  section.row {
    display: flex
  }
</style>