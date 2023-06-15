<script>
import Cell from './Cell.vue';

export default {
  components: {Cell},
  props: {
    rows: {
        type: Array,
        required: true,
    },
    cellsEditable: {
      required: true,
      type: Boolean,
    },
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
        :isEditable="cellsEditable"
        v-bind="cell"
        @click="() => cellClicked(cell)"
        @input="value => cell.value = value"
      />
    </section>
  </section>
</template>

<style scoped>
  section.row {
    display: flex
  }
</style>