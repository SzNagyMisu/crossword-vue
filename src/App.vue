<script>
import CrosswordTable from './components/CrosswordTable.vue';
import CrosswordSizeForm from './components/CrosswordSizeForm.vue';

const STEPS = {
  0: {
    title: "Define size",
    description: "Set the number of rows and columns",
    dependsOn: [],
  },
  1: {
    title: "Define black cells",
    description: "Click the cells to make them black - click again to revert",
    dependsOn: [0],
  },
  2: {
    title: "Define solution cells",
    description: "Click the cells to make them highlighted as the solution line",
    dependsOn: [0],
  },
  3: {
    title: "Add cell numbers",
    description: "Click the cells to add number to them",
    dependsOn: [0, 1],
  },
  4: {
    title: "Add letters",
    description: "Add letters to the cells that are not black",
    dependsOn: [0, 1],
  },
  5: {
    title: "Add definitions",
    description: "Add definitions to the numbers",
    dependsOn: [0, 1, 2, 3],
  }
};

export default {
  components: {CrosswordTable, CrosswordSizeForm},
  data() {
    return {
      steps: Object.values(STEPS),
      stepIdx: 0,
      table: []
    }
  },
  computed: {
    currentStep () {
      return this.steps[this.stepIdx];
    },
    rowsCount () {
      return this.table.length;
    },
    columnsCount () {
      return this.table[0] ? this.table[0].length : 0;
    },
  },
  methods: {
    isStepDisabled (step) {
      // return step.dependsOn.some(dependencyStep => this.stepIdx < dependencyStep)
    },
    setRows (rows) {
      const columns = this.columnsCount;
      this.setTable(rows, columns);
    },
    setColumns (columns) {
      const rows = this.rowsCount;
      this.setTable(rows, columns);
    },
    setTable (rows, columns) {
      console.log(rows, columns);
      const table = [];
      for (let row = 0; row < rows; row++) {
        const row = [];
        for (let col = 0; col < columns; col++) {
          row.push({});
        }
        table.push(row);
      }
      this.table = table;
      console.log(this.table)
    },
    onCellClicked ({ cell }) {
      switch (this.stepIdx) {
        case 1:
          cell.isBlack = !cell.isBlack;
          break;
        case 2:
          cell.isSolution = !cell.isSolution;
          break;
        case 3:
          this.addCellNumberTo(cell);
          break;
      }
    },
    addCellNumberTo (cellClicked) {
      let currentNr = 1;
      this.table.forEach(row => {
        row.forEach(cell => {
          if (cell.isBlack) return;

          if (cell === cellClicked) {
            if (cell.nr != null) {
              delete cell.nr;
            } else {
              cell.nr = currentNr;
              currentNr++;
            }
          } else if (cell.nr != null) {
            cell.nr = currentNr;
            currentNr++;
          }
        });
      });
    },
  },
  mounted () {
    // console.log(STEPS, this.steps)
  }
};
</script>

<template>
  <h1>Crossword</h1>
  <ul>
    <li v-for="(step, idx) in steps" :key="idx">
      <label>
        <input type="radio" :value="idx" name="stepNr" :disabled="isStepDisabled(step)" v-model="stepIdx">
        {{ step.title }}
      </label>
    </li>
  </ul>
  <h2>{{ currentStep.title }}</h2>
  <blockquote>{{ currentStep.description }}</blockquote>
  <CrosswordSizeForm :isActive="stepIdx === 0" :rows="rowsCount" :columns="columnsCount" @rowsChange="setRows" @columnsChange="setColumns" />
  <CrosswordTable :rows="table" @cellClicked="onCellClicked" />
</template>
