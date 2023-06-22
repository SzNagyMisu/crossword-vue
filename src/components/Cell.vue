<script>
export default {
  expose: ["focus", "row", "col", "value"],
  data () {
    return {};
  },
  props: {
    row: Number,
    col: Number,
    isBlack: Boolean,
    isSolution: Boolean,
    value: [String, null],
    nr: [Number, null],
    isEditable: Boolean,
  },
  emits: ["input", "navigate"],
  methods: {
    setValue ($event) {
      const letter = $event.data;
      if (letter) {
        this.$emit("input", letter.toUpperCase());
      }
    },
    onKeyDown ($event) {
      const key = $event.key;
      switch (key) {
        case "ArrowUp":
        case "ArrowDown":
        case "ArrowLeft":
        case "ArrowRight":
          this.$emit("navigate", key);
          break;
        case "Backspace":
        case "Delete":
          this.$emit("input", "");
      }
    },
    focus () {
      this.$refs.value.focus();
    },
  },
}
</script>

<template>
  <article v-if="isBlack" class="black" />
  <article v-else :class="{solution: isSolution}">
    <span class="nr" v-if="nr">{{ nr }}</span>
    <span
      class="value"
      ref="value"
      :contenteditable="isEditable"
      @input="setValue"
      @keydown="onKeyDown"
    >{{ value }}</span>
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
  }

  article.solution {
    background-color: cornsilk;
  }
  
  span.nr {
    font-size: 9px;
    padding: 1px;
    position: absolute
  }
  
  span.value {
    display: inline-flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    font-size: 16px;
  }
</style>