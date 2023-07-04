<script>
export default {
    emits: ["importJSON"],
    data() {
        return {
            showForm: false,
            json: "",
        };
    },
    methods: {
        importJSON() {
            this.$emit("importJSON", this.json);
            this.onFormReset();
        },
        onFormReset() {
            this.showForm = false;
            this.json = "";
        },
    },
}
</script>

<template>
    <input v-if="!showForm" type="button" :value="i18n.t`Import JSON`" @click="showForm = true">
    <form v-else @submit.prevent="importJSON" @reset="onFormReset">
        <fieldset>
            <textarea v-model="json" />
        </fieldset>
        <fieldset>
            <input type="submit" :value="i18n.t`Import`">
            <input type="reset" :value="i18n.t`Cancel`">
        </fieldset>
    </form>
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