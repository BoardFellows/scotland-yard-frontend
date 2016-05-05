module.exports = function returnNodeSvgMapMarker(text, node) {
  let mapMarkerSpec = {
    height: 20,
    width: 20, 
    outlineColor: (node.underground.length) ? '#D62700' : '#002A4A',
    strokeWidth: 2,
    topColor: '#E3D6B7',
    botColor: (node.bus.length) ? '#17607D' : '#E3D6B7',
    boxStroke: (node.underground.length) ? '#D62700' : '#002A4A',
    boxFill: '#FFFFFF', 
    textStroke: '#002A4A'     
  };
  
  return ('data:image/svg+xml;utf-8,' +
    encodeURIComponent(
    `<svg width="${mapMarkerSpec.width + 2 * mapMarkerSpec.strokeWidth}" height="${mapMarkerSpec.height + 2 * mapMarkerSpec.strokeWidth}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${mapMarkerSpec.width + 2 * mapMarkerSpec.strokeWidth} ${mapMarkerSpec.height + 2 * mapMarkerSpec.strokeWidth}" version="1.1" class="mapSvg"> \
      <defs> 
        <clipPath id="clip-bottom"> 
          <rect width="${mapMarkerSpec.width}" height="${mapMarkerSpec.height/2}" x="${mapMarkerSpec.strokeWidth}" y="${mapMarkerSpec.strokeWidth}" /> 
        </clipPath> \
        <clipPath id="clip-top"> \
          <rect width="${mapMarkerSpec.width}" height="${mapMarkerSpec.height/2}" x="${mapMarkerSpec.strokeWidth}" y="${mapMarkerSpec.height/2 + mapMarkerSpec.strokeWidth}" /> 
        </clipPath> \
      </defs> \
      <circle cx="${mapMarkerSpec.width/2 + mapMarkerSpec.strokeWidth}" cy="${mapMarkerSpec.height/2 + mapMarkerSpec.strokeWidth}" r="${mapMarkerSpec.height/2}" class="mapSvg__outline" stroke="${mapMarkerSpec.outlineColor}" stroke-width="${mapMarkerSpec.strokeWidth}"/> \
      <circle cx="${mapMarkerSpec.width/2 + mapMarkerSpec.strokeWidth}" cy="${mapMarkerSpec.height/2 + mapMarkerSpec.strokeWidth}" r="${mapMarkerSpec.height/2}" class="mapSvg__semicirc mapSvg__tophalf" clip-path="url(#clip-bottom)" fill="${mapMarkerSpec.topColor}"/> \
      <circle cx="${mapMarkerSpec.width/2 + mapMarkerSpec.strokeWidth}" cy="${mapMarkerSpec.height/2 + mapMarkerSpec.strokeWidth}" r="${mapMarkerSpec.height/2}" class="mapSvg__semicirc mapSvg__botHalf" clip-path="url(#clip-top)" fill="${mapMarkerSpec.botColor}"/> \
      <rect x="${mapMarkerSpec.width/8 + mapMarkerSpec.strokeWidth}" y="${mapMarkerSpec.width/4 + mapMarkerSpec.strokeWidth}" width="${mapMarkerSpec.width * 3/4}" height="${mapMarkerSpec.height/2}" class="mapSvg__textbox" fill="${mapMarkerSpec.boxFill}" stroke="${mapMarkerSpec.boxStroke}"/> \
      <text x="${mapMarkerSpec.width/2 + mapMarkerSpec.strokeWidth}" y="${mapMarkerSpec.height/2 + mapMarkerSpec.strokeWidth}" text-anchor="middle" class="mapSvg__text" stroke="${mapMarkerSpec.textStroke}" font-size="${4 * mapMarkerSpec.strokeWidth}" dy="${mapMarkerSpec.strokeWidth}" font-family="Open Sans, sans-serif">${text}</text> \
  </svg>`));

};
