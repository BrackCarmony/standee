<template>
  <div class="page">
    <!-- <Standee /> -->
    
    
    <div class="holder">
      <Can :clear="clear">
        <Stand :stand="stand" v-for="stand in stands"/>
        <!-- <Stand /> -->
      </Can>
    </div>
    
    <div class="list">
    <button @click="addStand"> Add standee </button>

    <button @click="allSmall"> All Small </button>
    <button @click="allMed"> All Medium </button>
    <button @click="allLarge"> All Large </button>
    <button @click="allLargeTall"> All Large-Tall + Small</button>
    
    <div class="card-holder">
      <div class="card" v-for="stand in standList" :key="stand.id">
        <select v-model="stand.size" @change="setSizes(stand)" type="text">
            <option value="ms">Small (1X1)</option>
            <option value="mn">Medium (1X2)</option>
            <option value="ln">Large (2X2)</option>
            <option value="ht">Huge-Tall (3X3)</option>
            <option value="gt">Gigantic-Tall (4X3)</option>
            <option value="gg">Gigantic-Giant (4X4)</option>
            <option value="hn">Huge (3X2)</option>
            <option value="gn">Gigantic (4X2)</option>
            <option value="mt">Medium-Tall (1X3)</option>
            <option value="lt">Large-Tall (2X3)</option>
            <option value="mg">Medium-Giant (1X4)</option>
            <option value="lg">Large-Giant (2X4)</option>
            <option value="hg">Huge-Giant (3X4)</option>
            <option value="lt">Long-Short (2X1)</option>
            <option value="ht">Huge-Short (3X1)</option>
            <option value="gt">Gigantic-Short (4X1)</option>
          </select>
        <input v-model="stand.amt" @change="clearMe()" type="number" step="1"/>
        <croppa v-model="stand.croppa"  canvas-color="#ffffff" :width="stand.ratioWidth || 290" :height="stand.ratioHeight || 478"> </Croppa>

        <button @click="useCrop(stand)"> Use Crop </button>
        <br/>
        {{stand.id}}
      </div>
    </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Can from '@/components/Can.vue'
import Stand from '@/components/Stand.vue'
import Standees from '@/components/Standees.vue'
import Standee from '@/components/Standee.vue'
import Croppa from 'vue-croppa'
import Vue from 'vue';
import sizes from '../constants';
Vue.use(Croppa);

var pageWidth = 8;
var pageHeight = 4;


function makeEmptyMatrix(width, height){
  return new Array(width).fill(0).map(e=>new Array(height).fill(false))
}

function findSpot(m, stand){
  let height = stand.height;
  let width = stand.width;
  let w = m.length;
  let h = m[0].length;
  for (var i=0;i<=w-width;i++){
    for (var j=0;j<=h-height;j++){
      if (!m[i][j]){
        stand.x = i;
        stand.y = j/2;
        stand.page = 1;
        m = mark(m, width, height, i, j);
        return true;
      }
    }
  }
  stand.page =0;
  return m;
}

function mark(mtx, width, height, wAnc, hAnc){
  for (var i=0;i<width;i++){
    for (var j=0;j<height;j++){
      mtx[i+wAnc][j+hAnc]=true;
    }
  }
  return mtx;
}

function size(stand){
  if (!stand.size){
    return;
  }
  let w = stand.size[0];
  let h = stand.size[1];
  stand.width = sizes.widths[w].slots
  stand.ratioWidth = sizes.widths[w].width;
  stand.height = sizes.heights[h].slots
  stand.ratioHeight = sizes.heights[h].height;
  
}

export default {
  name: 'home',
  components: {
    Can,
    Stand,
    Standees,
    Standee,
    // Croppa
  },
  data: ()=>{
    return {
      standList:new Array(8).fill(0).map((e,i)=>{ return {id:Math.random(), amt:1, size:'mn', height:2, width:1, croppa:{}}}),
      clear:false,
      // croppa:{}
    }
  },
  methods: {
    addStand: function(){
      this.standList.push({
        size:'mn',
        amt:1,
        height:2,
        width:1,
        croppa:{},
        id: Math.random()
      })

      this.clearMe();

    },
    clearMe:function(){
      // let canvas = document.getElementById('page')
      // let context = canvas.getContext('2d');
      // console.log(canvas.width);
      // console.log(canvas.height);

      // context.clearRect(0,0,canvas.widt, canvas.height);
      this.clear = true;
      this.$forceUpdate();

      setTimeout(()=>{
        this.clear = false;
        this.$forceUpdate();
      }, 100)
    },
    setSizes:function(stand){
      size(stand);
      this.clearMe();
    },
    useCrop:function(stand){
      stand.img = stand.croppa.generateDataUrl('png', 0);
      this.clearMe();
      setTimeout(()=>{
        this.standList = [...this.standList]
        this.$forceUpdate();
      }, 100)
    },
    removeStand: function(stand){
      this.standList = this.standList.filter(e=>e.id != stand.id);
    },
    allMed: function(stand){
      this.standList = new Array(20).fill(0).map((e,i)=>{ return {id:Math.random(), amt:1, size:'mn', croppa:{}}})
      this.standList.forEach(size);
      this.clearMe();
    },
    allLarge: function(stand){
      this.standList = new Array(10).fill(0).map((e,i)=>{ return {id:Math.random(), amt:1, size:'ln', croppa:{}}})
      this.standList.forEach(size);
      this.clearMe();
    },
    allSmall: function(stand){
      this.standList = new Array(40).fill(0).map((e,i)=>{ return {id:Math.random(), amt:1, size:'ms', croppa:{}}})
      this.standList.forEach(size);
      this.clearMe();
    },
    allLargeTall: function(stand){
      this.standList = [... new Array(5).fill(0).map((e,i)=>{ return {id:Math.random(), amt:1, size:'lt', croppa:{}}}), ... new Array(10).fill(0).map((e,i)=>{ return {id:Math.random(), amt:1, size:'ms', croppa:{}}})]
      this.standList.forEach(size);
      this.clearMe();
    }

  },
  computed: {
    stands:function(){
      if (!this.standList){
        return [];
      }
      let used = new Array()
      let list = this.standList.reduce((arr, cur) => {
        for (var i=0;i<cur.amt;i++){
          arr.push({size:cur.size, img: cur.img, height: cur.height, width:cur.width})
        }
        return arr;
      }, []);

      list.forEach(size);
      
      // list.sort((a, b)=>{
      //   return a.height < b.height       
      // })
      let m = makeEmptyMatrix(pageWidth, pageHeight);
      for (var i=0;i<list.length;i++){
        findSpot(m, list[i]);
      }
      return list.filter(e=>e.page==1);
    }
  }
}
</script>
<style scoped>
  .holder{
    overflow: auto;
    flex:3;
    border:1px solid black;
    box-sizing: border-box;
    width:50vw;
    height:98vh;
    box-shadow: 2px 2px 2px black;
  }

  .page{

    display:flex;
  }

  .list{
    flex:1;
  }

  .card{
    padding:5px;
    border:1px solid grey;
    margin:5px;
    box-shadow: 2px 2px 2px black;
  }

  .card-holder{
    overflow: auto;
    height:98vh;
  }
</style>
