<script>
export default {
    props: {
        stepIdx: Number,
        maxStepReached: Number,
        table: Array,
        definitions: Object,
    },
    data() {
        return {
            showJSON: false,
            copyButtonText: "Copy",
        };
    },
    computed: {
        jsonObject() {
            return JSON.stringify({
                stepIdx: this.stepIdx,
                maxStepReached: this.maxStepReached,
                table: this.table,
                definitions: this.definitions,
            });
        },
    },
    methods: {
        copyJSON() {
            const jsonContainer = this.$refs.JSONContainer;
            jsonContainer.select();
            navigator.clipboard.writeText(jsonContainer.value);
            jsonContainer.blur();
            this.copyButtonText = "Copied!";
            setTimeout(() => this.copyButtonText = "Copy", 5000);
        },
    },
}
</script>

<template>
    <input v-if="!showJSON" type="button" value="Export JSON" @click="showJSON = true">
    <section v-else>
        <textarea ref="JSONContainer">{{ jsonObject }}</textarea>
        <input type="button" :value="copyButtonText" @click="copyJSON">
        <input type="button" value="Done" @click="showJSON = false">
    </section>
</template>

<style scoped>
textarea {
    display: block;
    min-width: 50%;
    height: 250px;
    overflow-y: auto;
}


@media print {
    * {
        display: none;
    }
}
</style>