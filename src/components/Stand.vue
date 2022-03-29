<script>

import sizes from '../constants';

let line = 10;

let defaultWidth = 300;
let defaultHeight = 1612;



// 1080 - 20
// 1060/2 = 530
// 530 - 72


export default {
  name: 'Stand',
  inject: ['provider'],
  props: {
    stand: {type:Object, default:{}}
  },
  // data(){
  //   return {
  //     stand:{size:'m'}
  //   }
  // },  z
  render(){
    if(!this.provider.context) return 
    let ctx = this.provider.context;
    
    // Clear the old area from the previous render.
    
    // Clear the area for the text.
    

    // Draw the new rectangle.
    // if (!this.stand){
    //   this
    // }
    console.log(`spy: this.stand`, this.stand); // BURN
    let mirror = false || this.stand.mirror;
    let  x = this.stand.x || 0;
    let  y = this.stand.y || 0;
    let size = this.stand.size || 'mn';
    let srcimg = this.stand.img || "data:image/jpeg;base64,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";

    let w = this.stand.size[0];
    let h = this.stand.size[1];
    
    let offsetX =  x * defaultWidth  + line/2;
    let offsetY = y * defaultHeight + line/2;
    
    ctx.strokeStyle = "#000";
    ctx.lineWidth = line;
  
    let footsize =  sizes.heights[h].footsize;
    let height =  sizes.heights[h].height;
    let width = sizes.widths[w].width;
    

    // ctx.strokeRect(10,20,30,40);

    // ctx.clearRect(offsetX, offsetY, 2 *(line))
    ctx.fillStyle = '#FFF'
    ctx.fillRect(offsetX ,offsetY , width + line, footsize + line);
    ctx.strokeRect(offsetX ,offsetY , width + line, footsize + line);
    ctx.strokeRect(offsetX ,offsetY + footsize + line , width + line, height + line);
    ctx.strokeRect(offsetX ,offsetY + footsize + height + line * 2 , width + line, height+line);
    ctx.fillRect(offsetX ,offsetY + footsize + height * 2 + line * 3 , width+line , footsize+line);
    ctx.strokeRect(offsetX ,offsetY + footsize + height * 2 + line * 3 , width+line , footsize+line);
  var img = new Image;

  img.onload = function(){
    
    ctx.drawImage(img, offsetX + line/2 , (offsetY + footsize + height + 2.5 * line ), width, height); // Or at whatever offset you like
     
    ctx.save();

    
    if (mirror){
      ctx.scale(-1,-1);  
      ctx.drawImage(img, - offsetX - line/2 , -(offsetY + footsize + 1 * height + 1.5 * line), -width, height); // Or at whatever offset you 
    } else {
      ctx.scale(1,-1);
      ctx.drawImage(img, offsetX + line/2 , -(offsetY + footsize + 1 * height + 1.5 * line), width, height); // Or at whatever offset you 
    }

    
    ctx.restore();
  };
  img.src =srcimg;
  
  if (this.stand.useBack){
    var img2 = new Image;
    console.log(`spy: this.stand--FindMe`, this.stand); // BURN
    img2.onload = function(){ 
      ctx.save();
      if (mirror){
        ctx.scale(-1,-1);  
        ctx.drawImage(img2, - offsetX - line/2 , -(offsetY + footsize + 1 * height + 1.5 * line), -width, height); // Or at whatever offset you 
      } else {
        ctx.scale(1,-1);
        ctx.drawImage(img2, offsetX + line/2 , -(offsetY + footsize + 1 * height + 1.5 * line), width, height); // Or at whatever offset you 
      }

      
      ctx.restore();
    };
    img2.src =this.stand.backImg;
  }
    
    

  }
}
</script>