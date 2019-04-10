<template>
  <div class="piece" :style="{width:width}">
    <!-- Foot1 -->
    <div class="foot standee" :style="{height:footsize}"> 

    </div>
    <!-- Mirror -->
    <div :class="{standee:1, rotate:rotate ,flip:mirror}" :style="{backgroundImage:img, height:height}">
      
    </div>
    <!-- Main -->
    <div class="standee" :style="{backgroundImage:img, height:height}">
      
    </div>
    <!-- Foot 2 -->
    <div class="foot standee" :style="{height:footsize}">
      
    </div>
  </div>
</template>

<script>
// 92 X 260
// 5L +2F +2H
// 5*4+2*188 + 2*72
let sizes = {
  s:{height:210, width:290, footsize:79}, //130 120
  m:{height:478, width:290, footsize:120}, //478+120 190+70 260 
  mt:{height:717, width:290, footsize:190},
  mg:{height:950, width:290, footsize:246},
  l:{height:478, width:590, footsize:120},
  lt:{height:717, width:590, footsize:190},
  lg:{height:950, width:590, footsize:246},
  h:{height:478, width:890, footsize:120},
  ht:{height:717, width:890, footsize:190},
  hg:{height:950, width:890, footsize:246},
  g:{height:478, width:1190, footsize:120},
  gt:{height:717, width:1190, footsize:190},
  gg:{height:950, width:1190, footsize:246},
}

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    size: {type:String, default:'m'},
    image: {type:String, default:'https://cdn.instructables.com/FFS/LEYA/H8CVKF2N/FFSLEYAH8CVKF2N.LARGE.jpg'},
    mirror: {type:Boolean, default:false},
    rotate: {type:Boolean, default:true}
  },
  data:function (){
    return {}
  },
  computed:{
    width:function(){
      console.log(this);
      return sizes[this.size].width+'px';
    },
    height:function(){
      return sizes[this.size].height+'px';
    },
    footsize: function(){
      return sizes[this.size].footsize+'px';
    },
    img: function(){
      return `url("${this.image}")`
    },
    backImg: function(){
      return `url("${this.back || this.image}")`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.standee {
  border:4px solid black;
  display: block;
  background-size:contain;
  background-position:bottom;
  background-repeat: no-repeat;
  box-sizing: border-box;
  line-height: 0;
}

.rotate { 
  transform:scaleY(-1);
}

.flip {
  transform:scaleX(-1);
}

.piece{
  display:inline-block;
}
</style>
