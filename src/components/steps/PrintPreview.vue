<script setup>
import CrosswordTable from '../CrosswordTable.vue';
import { ref } from 'vue';

defineProps({
    table: {
        type: Array,
        required: true,
    },
    definitions: {
        type: Object,
        required: true,
    },
});

const title = ref("");

const print = () => window.print();
</script>

<template>
    <input type="text" class="crossword-title" v-model="title" placeholder="Title" />

    <CrosswordTable
        :rows="table"
        :cellsEditable="false"
    />

    <section v-for="dimension in Object.keys(definitions)" :key="dimension">
        <h3>{{ dimension }}</h3>
        <ul>
            <li v-for="(definition, nr) in definitions[dimension]" :key="nr">
                <strong>{{ nr }}</strong>.
                {{ definition }}
            </li>
        </ul>
    </section>

    <input type="button" value="Print" @click="print" />
</template>

<style scoped>
h3::first-letter {
    text-transform: capitalize;
}

input.crossword-title {
    margin-bottom: 24px;
    height: 1.5em;
    line-height: 1.5em;
    font-size: 1.5em;
    font-weight: bold;
    padding: 5px 10px;
}


@media print {
    input.crossword-title {
        border: none;
    }

    input.crossword-title:placeholder-shown {
        display: none;
    }

    input[type=button] {
        display: none;
    }
}
</style>
