<script>
export default {
    expose: ["currentStep"],
    emits: ["setStepIdx"],
    props: {
        steps: {
            type: Array,
            required: true,
        },
        stepIdx: {
            type: Number,
            required: true,
        },
        maxStepReached: {
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
        setStep(idx) {
            this.$emit("setStepIdx", idx);
        },
        nextStep() {
            this.setStep(this.stepIdx + 1);
        },
        previousStep() {
            this.setStep(this.stepIdx - 1);
        },
    },
}
</script>

<template>
    <h2>Steps</h2>

    <nav>
        <ul>
            <li
                v-for="(step, idx) in steps"
                :key="idx"
                :class="{active: stepIdx === idx, disabled: maxStepReached < idx}"
                @click="() => setStep(idx)"
            >{{ step.title }}</li>
        </ul>
    </nav>

    <input
        v-if="stepIdx > 0"
        type="button"
        :value="i18n.t`Back`"
        @click="previousStep"
    />
    <input
        v-if="stepIdx < steps.length - 1"
        type="button"
        :disabled="!isCurrentStepValid"
        class="success"
        :value="i18n.t`Next`"
        @click="nextStep"
    >

    <h2>{{ currentStep.title }}</h2>
    <blockquote>{{ currentStep.description }}</blockquote>
</template>

<style scoped>
nav ul {
    padding-inline-start: 0;
}

nav li {
    list-style: none;
    display: inline-block;
    padding: 5px 10px;
    background-color: green;
    border: 1px solid darkslategray;
    color: white;
    cursor: pointer;
    margin-left: -1px;
}
nav li.active {
    text-decoration: underline;
}
nav li.disabled {
    background-color: white;
    color: darkslategray;
    cursor: not-allowed;
}
nav li:first-child {
    border-radius: 5px 0 0 5px;
    margin-left: 0;
}
nav li:last-child {
    border-radius: 0 5px 5px 0;
}

input[type=button].success {
    background-color: green;
    border: 1px green solid;
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