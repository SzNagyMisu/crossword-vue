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
        return {
            newDefinitions: {
                horizontal: {
                    nr: null,
                    show: false,
                },
                vertical: {
                    nr: null,
                    show: false,
                },
            },
        };
    },
    methods: {
        setDefinition(dimension, nr, value) {
            this.$emit("setDefinition", dimension, nr, value);
        },
        removeDefinition(dimension, nr) {
            this.$emit("removeDefinition", dimension, nr);
        },
        newDefinition(dimension) {
            this.newDefinitions[dimension].show = true;
        },
        createDefinition(dimension) {
            if (this.newDefinitions[dimension].nr == null) return;

            this.setDefinition(dimension, this.newDefinitions[dimension].nr, "");
            this.closeNewDefinition(dimension);
        },
        closeNewDefinition(dimension) {
            this.newDefinitions[dimension] = {
                nr: null,
                show: false,
            };
        },
    },
}
</script>

<template>
    <section v-for="dimension in Object.keys(definitions)" :key="dimension">
        <h3>{{ dimension }}</h3>
        <input type="button" value="+" @click="newDefinition(dimension)" />
        <ul>
            <li v-if="newDefinitions[dimension].show">
                <input type="number" class="new-definition" v-model="newDefinitions[dimension].nr" />
                <input type="button" value="Add" @click="createDefinition(dimension)" />
                <input type="button" value="Cancel" @click="closeNewDefinition(dimension)" />
            </li>
            <li v-for="(definition, nr) in definitions[dimension]" :key="nr">
                {{ nr }}.
                <input
                    type="text"
                    class="definition"
                    :value="definition"
                    @input="$event => setDefinition(dimension, nr, $event.target.value)"
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

input[type=text], input[type=number] {
    height: 18px;
}

input[type=number].new-definition {
    width: 30px;
}

input[type=text].definition {
    min-width: 50%;
    height: 18px;
}

input[type=button] {
    padding: 4px 8px;
}
</style>