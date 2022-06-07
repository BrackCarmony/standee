<template>
  <div class="hello">
    <button @click="makeData"> Make Save Link <Note>Usually you can just right click the image and save it.  If that method fails, you can make a link and have the browser download it that way.</Note></button> 
    <a v-show="imageData" target='_blank' :href='imageData' download="test.png"> Save Data </a>
    <br/>
    <button @click="scale = scale * 1 + 0.1">Zoom In <Note>Does not effect the size of the image generated.</Note></button>
    <input style="max-width: 45px; padding-right:0px;" type="number" v-model="scale" step=".1" min=".01" max="2"/>
    <button @click="scale = scale * 1 - 0.1">Zoom Out <Note>Does not effect the size of the image generated.</Note></button>

    
    <canvas  :style="{transform: 'scale(' + scale +')', transformOrigin:'0 0'}" class="corner bordered" id="page" ref="page"></canvas>
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
      scale: 1,
      imageData:null,
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
  methods: {
    makeData:function(){
      let canvas = this.$refs['page'];
      console.log('gettingImageData');
      if (!canvas) 
      { 
        setTimeout(()=>{
          this.$forceUpdate();
        }, 1000);
        return 'Loading';
      }

      this.imageData = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      console.log(this.imageData);
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



.hello {
  background: rgb(240,240,240);
  padding:5px;
}
</style>
