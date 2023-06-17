<script>
export default {
    emits: ["setDefinition", "removeDefinition"],
    props: {
        definitions: {
            type: Object,
            required: true,
        },
    },
    data () {
        return {};
    },
    methods: {
        setDefinition(dimension, nr, $event) {
            this.$emit("setDefinition", dimension, nr, $event.target.value);
        },
        removeDefinition(dimension, nr) {
            this.$emit("removeDefinition", dimension, nr);
        },
        newDefinition(dimension) {
            // TODO
        },
    },
}
</script>

<template>
    <section v-for="dimension in Object.keys(definitions)" :key="dimension">
        <h3>{{ dimension }}</h3>
        <ul>
            <li v-for="(definition, nr) in definitions[dimension]" :key="nr">
                {{ nr }}.
                <input
                    type="text"
                    :value="definition"
                    @input="$event => setDefinition(dimension, nr, $event)"
                >
                <input type="button" value="×" @click="() => removeDefinition(dimension, nr)">
            </li>
        </ul>
    </section>
</template>

<style scoped>
h3::first-letter {
    text-transform: capitalize;
}

ul {
    list-style: none;
}

li {
    margin-bottom: 8px;
}

input[type=text] {
    min-width: 50%;
    height: 18px;
}

input[type=button] {
    padding: 4px 8px;
}
</style>