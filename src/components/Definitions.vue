<script>
export default {
    emits: ["setTitle", "createDefinition", "setDefinition", "toggleBoldness", "removeDefinition"],
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
        setTitle(dimension, value) {
            this.$emit("setTitle", dimension, value);
        },
        setDefinition(dimension, nr, value) {
            this.$emit("setDefinition", dimension, nr, value);
        },
        toggleBoldness(dimension, nr) {
            this.$emit("toggleBoldness", dimension, nr);
        },
        removeDefinition(dimension, nr) {
            this.$emit("removeDefinition", dimension, nr);
        },
        newDefinition(dimension) {
            this.newDefinitions[dimension].show = true;
        },
        createDefinition(dimension) {
            if (this.newDefinitions[dimension].nr == null) return;

            this.$emit("createDefinition", dimension, this.newDefinitions[dimension].nr);
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
        <input
            type="text"
            class="dimension-title"
            :value="definitions[dimension].title"
            @input="$event => setTitle(dimension, $event.target.value)"
        />
        <input type="button" value="+" @click="newDefinition(dimension)" />
        <ul>
            <li v-if="newDefinitions[dimension].show">
                <input type="number" class="new-definition" v-model="newDefinitions[dimension].nr" />
                <input type="button" value="Add" @click="createDefinition(dimension)" />
                <input type="button" value="Cancel" @click="closeNewDefinition(dimension)" />
            </li>
            <li v-for="(definition, nr) in definitions[dimension].lines" :key="nr">
                {{ nr }}.
                <input
                    type="text"
                    :class="{definition: true, bold: definition.isBold}"
                    :value="definition.value"
                    @input="$event => setDefinition(dimension, nr, $event.target.value)"
                >
                <input
                    type="button"
                    :class="{boldToggle: true, active: definition.isBold}"
                    value="B"
                    @click="() => toggleBoldness(dimension, nr)"
                />
                <input type="button" value="×" @click="() => removeDefinition(dimension, nr)" />
            </li>
        </ul>
    </section>
</template>

<style scoped>
ul {
    list-style: none;
}

li {
    margin-bottom: 8px;
}

input[type=text], input[type=number] {
    height: 18px;
}

input[type=text].dimension-title {
    font-size: 1.2em;
    height: 1.2em;
    line-height: 1.2em;
    padding: 5px 10px;
    display: block;
}

input[type=number].new-definition {
    width: 30px;
}

input[type=text].definition {
    min-width: 50%;
    height: 18px;
}

input[type=text].definition.bold {
    font-weight: bold;
}

input[type=button] {
    padding: 4px 8px;
}

input[type=button].boldToggle {
    font-weight: bold;
}

input[type=button].boldToggle.active {
    background-color: black;
    color: grey;
}
</style>