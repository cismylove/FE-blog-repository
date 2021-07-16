let scrollbarWidth;
export default function(){
    if(scrollbarWidth!==undefined) return
    let outer = document.createElement('div')
    outer.style.position = 'absolute'
    outer.style.visibility = 'hidden'
    outer.style.overflow = 'scroll'
    outer.style.width = '100px'
    
    let inner = document.createElement('div')
    inner.style.width = '100%'
    outer.appendChild(inn)

    document.body.appendChild(outer)
    scrollbarWidth = outer.offsetWidth - inner.offsetWidth

    document.body.removeChild(outer)
    return scrollbarWidth
}