<template>
  <div class="hello">
    Standees View
    <div>
      
    <div class="exact" id="page">
      <div class="row">
        <Standee :style="{position:'absolute', top:stand.y, left:stand.x}" v-bind="stand" v-for="(stand, i) in positions || []" :key="i+'rt1'"/>
        {{stand.mirror}}
      </div>
    </div>
    <div class="builder card"> 
      <div class="card" v-for = "(stand, i) in stands" :key="'st' + i">
        <select v-model="stand.size" type="text">
          <option value="s">Small</option>
          <option value="m">Medium</option>
          <option value="l">Large</option>
          <option value="h">Huge</option>
          <option value="g">Gigantic</option>
          <option value="mt">Medium-Tall</option>
          <option value="lt">Large-Tall</option>
          <option value="ht">Huge-Tall</option>
          <option value="gt">Gigantic-Tall</option>
        </select>
        <input v-model="stand.amt" />
        
        <croppa 
        :height="188" 
        :width="92" 
        :ref="stand.ref" 
        :canvas-color="'white'"/>
        <button @click="setImageToResult(stand, stand.ref )">Update</button>
      </div>
      <div>

        <button @click="saveImage()">
          Save Page as Image
        </button>
      </div>
      
    </div>
  </div>
  </div>
</template>

<script>

import Standee from './Standee.vue'
import html2canvas from 'html2canvas';
import {debounce} from 'lodash';

function blobToDataURL(blob, callback) {
    var a = new FileReader();
    a.onload = function(e) {callback(e.target.result);}
    a.readAsDataURL(blob);
}

let sizes = {
  s:{h:1 ,w:1}, //130 120
  m:{h:2 ,w:1}, //188+72 190+70 260 
  mt:{h:4 ,w:1},
  l:{h:2 ,w:2},
  lt:{h:4 ,w:2},
  h:{h:2 ,w:3},
  ht:{h:4 ,w:3},
  g:{h:2 ,w:4},
  gt:{h:4,w:4},
}


export default {
  name: 'HelloWorld',
  components:{Standee},
  props: {
    msg: String,
  },
  data:function(){
    return {
      test:null,
      stands:[
        {size:'m', ref:'a'},
        {size:'m', ref:'b'},
        {size:'m', ref:'c'},
        {size:'m', ref:'d'},
        {size:'m', ref:'e'},
        {size:'m', ref:'f'},
        {size:'m', ref:'g'},
        {size:'m', ref:'h'},
        {size:'m', ref:'i'},
        {size:'m', ref:'j'},
        {size:'m', ref:'k'},
        {size:'m', ref:'l'},
        {size:'m', ref:'m'},
        {size:'m', ref:'n'},
        {size:'m', ref:'o'},
        {size:'m', ref:'p'},

        ],
        testBlob:null
    }
  },
  computed:{
    talls:function(){
      return this.stands.filter(e=>e.size.includes('t'))
    },
    mediums:function(){
      return this.stands.filter(e=>!e.size.includes('t') && e.size !='s')
    },
    shorts:function(){
      return this.stands.filter(e=>e.size=="s")
    },
    positions:function(){
      let pref = ['gt','ht','lt','mt','g','h','l','m','s'];
      
      let dx =92;
      let dy =520;
      // let pages = this.stands.reduce((pages, cur, i)=>{
      //     let amt = cur.amt || 1;
          
      //       pages.pages[0].stands.push(Object.assign({}, cur, {x: Math.random()*1000+'px', y: Math.random()*1000+'px'}));
          
      //   return pages
      // }, {pages:[{stands:[]}], full:0})

      return this.stands.map((stand, i)=>{
        let obj = Object.assign({}, stand);
        obj.x = Math.floor(i/2) * dx + 'px';
        obj.y = (i%2) * dy +'px'; 
        return obj
      });
    }

  },
  methods:{
    saveImage:function(){
      let page = document.getElementById('page');
      html2canvas(page).then(canvas=>{
        document.body.appendChild(canvas);
      });
    },
    setImageToResult(boundStandee, boundRef){
      boundStandee.image = this.$refs[boundRef][0].generateBlob(b=>{
        blobToDataURL(b, b=>{
          boundStandee.image = b
          this.$forceUpdate();
          this.positions();
          })
      }, 'image/jpeg',
        0.8)
    },
    test1:function(){
      this.test.generateBlob(b=>{
        var urlCreator = window.URL || window.webkitURL;
        blobToDataURL(b, b=>{
          this.testBlob = b
          this.$forceUpdate();
          })
      }, 'image/jpeg',
        0.8)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

.standee {
  border:4px solid black;
  background-size:contain;
  background-position:bottom;
  background-repeat: no-repeat;
  float:left;
  box-sizing: border-box;

}

.exact {
  overflow:scroll;
  width:75vw;
  height:500px;
  border:1px solid lightgray;
  padding:1px;
  line-height: 0;
  float:left;
  position: relative;
}

.builder {
  display: inline-block;
  width:20vw;
  padding:1px;
  float:right;
}

.card{
  padding:3px;
  margin:3px;
  border:1px solid #eee;
  box-shadow: 2px 2px 2px lightgrey;
}

.row{
  width:736px;  
  height:325px;
}
</style>
