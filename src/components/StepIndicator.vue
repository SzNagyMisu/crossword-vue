<script>
export default {
    expose: ["currentStep"],
    emits: ["nextStep"],
    props: {
        steps: {
            type: Array,
            required: true,
        },
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
        return {};
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


@media print {
    * {
        display: none;
    }
}
</style>