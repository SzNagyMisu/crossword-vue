<script>
export default {
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
            console.log(dimension, nr, $event);
        },
        removeDefinition(dimension, nr) {
            //TODO
        }
    },
}
</script>

<template>
    <h3>Horizontal</h3>
    <ul>
        <li v-for="(definition, nr) in definitions.horizontal" :key="nr">
            {{ nr }}.
            <input
                :value="definition"
                @input="$event => setDefinition('horizontal', nr, $event)"
            >
        </li>
    </ul>
    <h3>Vertical</h3>
    <ul>
        <li v-for="(definition, nr) in definitions.vertical" :key="nr">
            {{ nr }}.
            <input
                :value="definition"
                @input="$event => setDefinition('vertical', nr, $event)"
            >
        </li>
    </ul>
</template>

<style scoped>
ul {
    list-style: none;
}

li {
    margin-bottom: 8px;
}

input {
    min-width: 50%;
    height: 18px;
}
</style>