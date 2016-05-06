module.exports = function returnInfoWindowHtml(originNodeName, originNode, clickedNodeName, clickedNode, processPayment, log) {
  log(originNodeName, clickedNodeName);
  function generateHtml(paymentTypes) {
    // log('generateHtml');
    let text = (`<div><h5>PAY BY:</h5>`);
    paymentTypes.forEach((mode) => {
      text += (`<button onclick=${processPayment(mode)}>${mode.toUpperCase()}</button>`);
    });
    text += '</div>';
    return text;
  }
  
  let paymentTypes = [];
  ['taxi', 'bus', 'underground', 'river'].forEach((mode) => {
    log(mode, originNode[mode], clickedNode[mode]);
    log(originNode[mode].indexOf(+clickedNodeName) !== -1, clickedNode[mode].indexOf(originNodeName) !== -1);
    if (originNode[mode].indexOf(+clickedNodeName) !== -1, clickedNode[mode].indexOf(originNodeName) !== -1) {
      paymentTypes.push(mode);
    }
  });
  log(paymentTypes);
  
  return generateHtml(paymentTypes);
};
