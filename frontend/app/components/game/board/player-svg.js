module.exports = function(player, playerSpec) {
  return ('data:image/svg+xml;utf-8,' +
    encodeURIComponent(
      `<svg width="${playerSpec.width}" height="${playerSpec.height}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${playerSpec.width} ${playerSpec.height}" version="1.1" class="mapSvg"> \
        <circle cx="${playerSpec.width/2}" cy="${playerSpec.height/2}" r="${playerSpec.height/4}" class="mapSvg__player" stroke="${playerSpec[player].color}" fill="${playerSpec[player].color}"/> \
      </svg>`
    )
  );
};
