<template>
  <div class="hello">
    {{clear}}
    <canvas id="page" ref="page"></canvas>
    <slot></slot>
  </div>
</template>

<script>
const width = 2480;
const height = 3229;

export default {
  name: 'Can',
  props: {
    msg: String,
    clear: Boolean
  },
  data(){
    return {
      provider:{
      context:null
    }
  }},
  render(){
    
    this.provider.context.clearRect(0,0,width,height);
  },
  mounted(){
    
    this.provider.context = this.$refs['page'].getContext('2d');

    this.$refs['page'].width = width;
    this.$refs['page'].height = height;
  },
  provide () {
    return {
      provider: this.provider
    }
  },
  watch: {
    clear: function(newVal, oldVal){
      if (newVal){
        this.provider.context.fillStyle = "#123456"
        this.provider.context.clearRect(0,0,width,height);
        this.provider.context.beginPath();
        
        this.$forceUpdate();
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
