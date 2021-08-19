<template>
  <div @mousedown='clickTrackHandler' class="scrollbar_bar" :class="'is-'+bar.key">
      <div @mousedown='clickThumbHandler' ref='thumb' :style="thumbStyle" class="scrollbar_thumb">
      </div>
  </div>
</template>

<script>
import {BAR_MAP,renderThumbStyle} from './utils';
export default {
  components: {},
  props: {
    vertical:Boolean,
    size: String,
    move: String
  },
  computed:{
    bar(){
        return BAR_MAP[vertical ? 'vertical' : 'horizontal']
    },
    thumbStyle(){
        return renderThumbStyle(this)
    },
    thumb(){
        return this.$refs.thumb
    },
    wrap(){
        return this.$parent.wrap
    }
  },
  data() {
    return {
    }
  },
  methods: {
    clickTrackHandler(e){
        const offset = Math.abs(e.target.getRoundingClientRect()[this.bar.direction] - e[this.bar.client])
        const thumbHalf =  this.thumb[this.bar.offset] / 2
        const thumbPositionPercentage = ( offset - thumbHalf ) * 100/ this.$el[this.bar.offset]
        this.wrap[this.bar.scroll] = (thumbPositionPercentage * this.wrap[this.bar.scrollSize] / 100) + 'px'
    },
    clickThumbHandler(e){
        if(e.button == 2) return
        this.startDrag(e)
        this[this.bar.axis]  = e.currentTraget[this.bar.offset]-(e[this.bar.client]-e.target.getRoundingClientRect()[this.bar.direction])
    },
    startDrag(e){
        this.dragStart = true
        document.addEventListener('mousemove',this.mousemoveDocumentHandler,false)
        document.addEventListener('mouseup',this.mouseupDocumentHandler,false)
    },
    mousemoveDocumentHandler(e){
        if(!this[this.bar.axis]) return
        if(!this.dragStart) return
        const offset = e[this.bar.client] - this.thumb.getRoundingClientRect()[this.bar.direction]
        const thumbClickPosition = this.thumb[this.bar.offset] - this[this.bar.axis]
        const thumbPositionPercentage = (offset - thumbClickPosition) *100 / this.$el[this.bar.offset]
        this.wrap[this.bar.scroll] = thumbPositionPercentage * this.wrap[this.bar.scrollSize] / 100 + 'px'

        document.onselect = () => false
    },
    mouseupDocumentHandler(){
        this[this.bar.axis] = 0
        this.dragStart = false

        document.removeEventListener('mousemove',this.mousemoveDocumentHandler,false)

        document.onselect = null
    },
  },
  destroy(){
      document.removeEventListener('mouseup',this.mouseupDocumentHandler,false)
  }
}
</script>
<style scoped>
.is-vertical.scrollbar_bar{
    width: 6px;
}
.is-horizontal.scrollbar_bar{
    height: 6px;
}
</style>