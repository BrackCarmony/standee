<template>
  <span class="hider">
      <span class="qm">?</span>
      <div class="hidden" style="position:absolute">
        <slot></slot>
      </div>
    </span>
</template>

<script>
  /* eslint-disable */
  export default {
    name: 'Note',
    data() {
      return {
      }
    },
    props: ['fas'],
    components: {
    },
    created() {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hider {
    position: relative;
    top: 1px;
    margin-left: 2px;
  }
  .hidden {
    position: absolute;
    z-index: -100;
    opacity: 0;
    min-width: 250px;
    background: lightgrey;
    box-shadow: 1px 1px 1px grey;
    text-align: left;
    padding: 9px;
    border-radius: 3px;
    color: black;
    text-shadow: none;
  }

  .hider:hover .hidden {
    opacity: 1;
    z-index: 100;
    font-weight: normal;
    font-size: medium;
  }
  .qm {
    width:1em;
    height:1em;
    display:inline-block;
    border-radius:50%;
    background: rgba(20,20,20,.2);
    background-blend-mode: darken;
    border:1px solid black;
    line-height: 1em;
    text-align: center;
    font-weight: bold;
  }
</style>
