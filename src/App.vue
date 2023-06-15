<script>
import Cell from './components/Cell.vue';

export default {
  components: {Cell},
  data() {
    return {
      rows: [
        [{
          value: 'A',
          nr: 1,
        }, {
          value: 'B',
        }, {
          value: 'C',
          nr: 2,
        }, {
          isBlack: true,
    		}],
        [{
          value: 'A',
          nr: 3,
        }, {
          isBlack: true,
    		}, {
          value: 'B',
          nr: 4,
        }, {
          value: 'C',
        }],
      ]
    }
  }
};
</script>

<template>
  <section>
    <section class="row" v-for="row in rows">
      <Cell
        v-for="(cell, cellIdx) in row"
        :key="cellIdx"
        v-bind="cell"
      />
    </section>
  </section>
</template>

<style scoped>
  section.row {
    display: flex
  }
</style>