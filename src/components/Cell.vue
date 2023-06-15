<script>
export default {
  data () {
    return {};
  },
  props: {
    isBlack: Boolean,
    isSolution: Boolean,
    value: [String, null],
    nr: [Number, null],
  },
  mounted () {
    // console.log('here');
  }
}
</script>

<template>
  <article v-if="isBlack" class="black" />
  <article v-else :class="{solution: isSolution}">
    <span class="nr" v-if="nr">{{ nr }}</span>
    <span class="value" v-if="value">{{ value }}</span>
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