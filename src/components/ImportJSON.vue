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
        importJSON($event) {
            $event.preventDefault();
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
    <input v-if="!showForm" type="button" value="Import JSON" @click="showForm = true">
    <form v-else @submit="importJSON" @reset="onFormReset">
        <fieldset>
            <textarea cols="30" rows="10" v-model="json" />
        </fieldset>
        <fieldset>
            <input type="submit" value="Import">
            <input type="reset" value="Cancel">
        </fieldset>
    </form>
</template>
