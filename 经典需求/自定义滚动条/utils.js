export const BAR_MAP = {
    vertical : {
        axis: 'Y',
        offset: 'offsetHeight',
        client: 'clientY',
        direction : 'top',
        key: 'vertical',
        scroll: 'scrollTop',
        scrollSize: 'scrollHeight',
        size: 'Height'
    },
    horizontal : {
        axis : 'X',
        offset : 'offsetWidth',
        client : 'clientX',
        direction: 'left',
        key: 'horizontal',
        scroll: 'scrollLeft',
        scrollSize: 'scrollWidth',
        size: 'width'
    }
}
export function renderThumbStyle({size,move,bar}){
    const style = {}
    const translate = `translate${bar.axis}(${move}%)`

    style[bar.size] = size
    style.transform = translate
    style.msTransform = translate
    style.webkitTransform = translate

    return style
}