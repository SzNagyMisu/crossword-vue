<script setup>
import { ref } from 'vue';

const props = defineProps({
    row: Number,
    col: Number,
    isBlack: Boolean,
    isSolution: Boolean,
    value: [String, null],
    nr: [Number, null],
    turn: String,
    isEditable: Boolean,
});
const emit = defineEmits(["input", "navigate"]);

const valueRef = ref(null);

const setValue = ($event) => {
    const letter = $event.data;
    if (letter) {
        emit("input", letter.toUpperCase());
    }
};
const onKeyDown = $event => {
    const key = $event.key;
    switch (key) {
        case "ArrowUp":
        case "ArrowDown":
        case "ArrowLeft":
        case "ArrowRight":
            emit("navigate", key);
            break;
        case "Backspace":
        case "Delete":
            emit("input", "");
    }
};
const focus = () => {
    valueRef.value.focus();
};

defineExpose({
    focus,
    row: props.row,
    col: props.col,
    value: props.value,
});
</script>

<template>
    <article v-if="isBlack" class="black" />
    <article v-else :class="{ solution: isSolution }">
        <span v-if="nr" class="nr">{{ nr }}</span>
        <span v-if="turn" :class="['turn', turn]"></span>
        <span
            class="value"
            ref="valueRef"
            :contenteditable="isEditable"
            @input="setValue"
            @keydown="onKeyDown">{{ value }}</span>
    </article>
</template>

<style scoped>
article {
    width: 30px;
    height: 30px;
    border: 1px solid black;
    margin: -1px 0 0 -1px;
    position: relative;
}

article.black {
    background: black;
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
}

article.solution {
    background-color: cornsilk;
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
}

span.nr {
    font-size: 9px;
    padding: 1px;
    display: block;
    width: 100%;
    height: 100%;
    margin-bottom: calc(-100% - 2px);
}

span.turn:after {
    display: flex;
    width: 100%;
    height: 100%;
    margin-bottom: -100%;
    font-size: 12px;
}
span.turn.down:after {
    content: "\2935";
    justify-content: end;
}
span.turn.right:after {
    content: "\2937";
    align-items: end;
}

span.value {
    display: inline-flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    font-size: 16px;
}


@media print {
    span.value {
        display: none;
    }
}
</style>