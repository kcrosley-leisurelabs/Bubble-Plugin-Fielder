function(instance, properties) {
    var d = document.createElement("div")
    d.style.display = "flex"
    d.style.width = properties.bubble.width()-0 + "px"
    d.style.height = properties.bubble.height()-0 + "px"
    // d.style.width = "100%"
    // d.style.height = "100%"
    
    d.style.overflow = "hidden"
    d.style.justifyContent = "center"
    d.style.background = "none"
    d.style.backgroundImage = "url('https://s3.amazonaws.com/appforest_uf/f1663790145122x151656668149928500/fielder.svg')"
    d.style.backgroundRepeat = "no-repeat"
    d.style.backgroundSize = "100% 100%"
    d.style.backgroundOrigin = "border-box"
    d.style.margin = "0 auto"
    // Classic,Electric Green,Hot Pink,Ferrari Red,Mustang Yellow,British Racing Green,Flame,Night Rider
    if (!properties.icolor || properties.icolor == 'Classic Blue') d.style.filter = "opacity(80%)"
    if (properties.icolor == 'Electric Green') d.style.filter = "sepia(100%) contrast(130%) saturate(200%) hue-rotate(72deg) opacity(80%)" 
    if (properties.icolor == 'Hot Pink') d.style.filter = "sepia(0%) contrast(260%) brightness(80%) saturate(270%) hue-rotate(153deg) opacity(80%)"
    if (properties.icolor == 'Enzo Red') d.style.filter = "sepia(100%) contrast(179%) brightness(104%) saturate(200%) invert(100%) hue-rotate(89deg) opacity(80%)"
    if (properties.icolor == 'Mustang Yellow') d.style.filter = "sepia(100%) contrast(164%) brightness(91%) saturate(200%) hue-rotate(360deg) opacity(80%)"
    if (properties.icolor == 'British Racing Green') d.style.filter = "sepia(100%) contrast(162%) brightness(39%) saturate(178%) hue-rotate(67deg) opacity(80%)"
    if (properties.icolor == 'Flame') d.style.filter = "sepia(100%) contrast(200%) brightness(74%) saturate(200%) hue-rotate(340deg)"
    if (properties.icolor == 'Night Rider') d.style.filter = "sepia(100%) brightness(4%) hue-rotate(162deg) opacity(80%)"
    instance.canvas.appendChild(d)
    // console.log('instance.canvas ', instance.canvas)
    // console.log('element dims: ', properties.bubble.width(), ' x ', properties.bubble.height())
}