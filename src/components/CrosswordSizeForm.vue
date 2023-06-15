<script>
export default {
    props: {
        rows: {
            required: true,
            type: Number,
        },
        columns: {
            required: true,
            type: Number,
        },
        isActive: {
            required: true,
            type: Boolean,
        },
    },
    emits: ["rowsChange", "columnsChange"],
    data () {
        return {};
    },
    methods: {
        onColumnsChange ($event) {
            this.$emit("columnsChange", +$event.target.value);
        },
        onRowsChange ($event) {
            this.$emit("rowsChange", +$event.target.value);
        }
    },
}
</script>

<template>
    <form>
        <input type="number" :readonly="!isActive" :value="rows" name="rows" @input="onRowsChange">
        X
        <input type="number" :readonly="!isActive" :value="columns" name="columns" @input="onColumnsChange" :disabled="rows < 1">
    </form>
</template>

<style scoped>
form {
    margin-bottom: 24px;
}

input {
    width: 50px;
}

input:read-only {
    border: none;
}

input:read-only:focus {
    outline: none;
}

input[name=rows]:read-only {
    text-align: right;
}

input[name=columns]:read-only {
    text-align: center;
}
</style>