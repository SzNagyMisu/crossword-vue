<script>
export default {
    emits: ["nextStep"],
    props: {
        steps: {
            type: Object,
            required: true,
        },
        currentStep: {
            type: Number,
            required: true,
        },
        isCurrentStepValid: {
            type: Boolean,
            required: false,
        },
    },
    data () {
        return {};
    },
    methods: {
        stepState(stepNr) {
            if (stepNr < this.currentStep) {
                return "done";
            } else if (stepNr === this.currentStep) {
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

    <input type="button" :disabled="!isCurrentStepValid" class="success" value="Next" @click="nextStep">
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
    border-radius: 4px;
    padding: 4px 16px;
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