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
    <input type="text" class="crossword-title" v-model="title" :placeholder="i18n.t`Title`" />

    <CrosswordTable
        :rows="table"
        :cellsEditable="false"
        :isPrintPreview="true"
    />

    <section v-for="dimension in Object.keys(definitions)" :key="dimension">
        <h3>{{ definitions[dimension].title }}</h3>
        <ul>
            <li v-for="(definition, nr) in definitions[dimension].lines" :key="nr">
                <strong>{{ nr }}</strong>.&nbsp;<span :class="{bold: definition.isBold}">{{ definition.value }}</span>
            </li>
        </ul>
    </section>

    <input type="button" :value="i18n.t`Print`" @click="print" />
</template>

<style scoped>
input.crossword-title {
    margin-bottom: 12px;
    height: 1.5em;
    line-height: 1.5em;
    font-size: 1.5em;
    font-weight: bold;
    padding: 5px 10px;
    width: 100%;
    text-align: center;
}

h3 {
    margin-bottom: 0;
}

ul {
    margin-top: 0;
    padding-inline-start: 0;
}

li {
    display: inline;
    margin-right: 3px;
    font-size: 14px;
}
li::after {
    content: " ";
}

span.bold {
    font-weight: bold;
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
