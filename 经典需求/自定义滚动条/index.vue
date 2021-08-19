<template>
  <div class="scrollbar">
    <div @scroll="scrollHandler" :style='renderWrapStyle' ref="wrap" class="scrollbar_wrap">
        <div class="scrollbar_view">
            <slot></slot>
        </div>
    </div>
    <Bar :size='sizeWidth' :move='moveX'></Bar>
    <Bar :size='sizeHeight' :move='moveY' vertical></Bar>
  </div>
</template>

<script>
import scrollbarWidth from './scrollbar-width'
import Bar from './bar'
export default {
  components: {
    Bar
  },
  computed:{
    wrap(){
        return this.$refs.wrap
    },
    renderWrapStyle(){
        let style = {}
        let gutter = scrollbarWidth()
        if(gutter){
            style = `margin-right: -${gutter}px`
        }
        return style
    }
  },
  props: {},
  data() {
    return {
        sizeWidth: '',
        sizeHeight: '',
        moveX: '',
        moveY: ''
    }
  },
  methods: {
    scrollHandler(){
        this.moveY = this.wrap.scrollTop * 100 / this.wrap.scrollHeight
        this.moveX = this.wrap.scrollLeft * 100 / this.wrap.scrollWidth
    },
    update(){
        let widthPercentage,heightPercentage;
        widthPercentage = this.wrap.clientWidth * 100 / this.wrap.scrollWidth
        heightPercentage = this.wrap.clientHeight * 100 / this.wrap.scrollHeight

        this.sizeWidth = widthPercentage < 100 ? widthPercentage + '%' : ''
        this.sizeHeight = heightPercentage < 100 ? heightPercentage + '%' : ''
    }
  }
}
</script>
<style scoped>
.scrollbar{
    overflow: hidden;
}
</style>