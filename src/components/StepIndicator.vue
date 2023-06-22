<script>
export default {
    emits: ["nextStep", "finish"],
    props: {
        stepIdx: {
            type: Number,
            required: true,
        },
        table: {
            type: Array,
            required: true,
        },
        definitions: {
            type: Object,
            required: true,
        },
    },
    data () {
        return {
            steps: [
                {
                    title: "Define size",
                    description: "Set the number of rows and columns",
                    isValid({ table }) {
                        return table.length && table[0].length;
                    },
                },
                {
                    title: "Define black cells",
                    description: "Click the cells to make them black - click again to revert",
                    isValid() {
                        return true;
                    },
                },
                {
                    title: "Define solution cells",
                    description: "Click the cells to make them highlighted as the solution line",
                    isValid() {
                        return true;
                    },
                },
                {
                    title: "Add cell numbers",
                    description: "Click the cells to add number to them",
                    isValid() {
                        return true;
                    },
                },
                {
                    title: "Add letters",
                    description: "Add letters to the cells that are not black",
                    isValid({ table }) {
                        return table.every(row => row.every(cell => cell.isBlack || cell.value != null));
                    },
                },
                {
                    title: "Add definitions",
                    description: "Add definitions to the numbers",
                    isValid({ table, definitions }) {
                        return table.every(row => row.every(cell => !cell.nr || definitions.horizontal[cell.nr] || definitions.vertical[cell.nr]));
                    },
                },
            ]
        };
    },
    computed: {
        currentStep() {
            return this.steps[this.stepIdx];
        },
        isCurrentStepValid() {
            return this.currentStep.isValid({
                table: this.table,
                definitions: this.definitions,
            });
        },
    },
    methods: {
        stepState(stepNr) {
            if (stepNr < this.stepIdx) {
                return "done";
            } else if (stepNr === this.stepIdx) {
                return "active";
            } else {
                return "pending"
            }
        },
        nextStep() {
            this.$emit("nextStep");
        },
        finish() {
            this.$emit("finish");
        },
    },
}
</script>

<template>
    <h2>Steps</h2>
    <ul>
        <li
            v-for="(step, nr) in steps"
            :key="nr"
            :class="stepState(nr)"
        >{{ step.title }}</li>
    </ul>

    <input
        v-if="stepIdx < steps.length - 1"
        type="button"
        :disabled="!isCurrentStepValid"
        class="success"
        value="Next"
        @click="nextStep"
    >
    <input
        v-else
        type="button"
        :disabled="!isCurrentStepValid"
        class="success"
        value="Done"
        @click="finish"
    >

    <h2>{{ currentStep.title }}</h2>
    <blockquote>{{ currentStep.description }}</blockquote>
</template>

<style scoped>
li.done {
    color: green;
}

li.active {
    color: blue;
}

li.pending {
    color: grey;
    list-style-type: circle;
}

input[type=button].success {
    background-color: green;
    border: 1px greenyellow solid;
    color: white;
    cursor: pointer;
}

input[type=button].success:disabled {
    background-color: lightgray;
    border-color: darkslategray;
    color: darkslategray;
    cursor: not-allowed;
}
</style>