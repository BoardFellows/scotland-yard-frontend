module.exports = function returnInfoWindowHtml(originNodeName, originNode, clickedNodeName, clickedNode, processPayment) {
  function generateHtml(paymentTypes) {
    let text = (
      `<div class="well"> \
      <h5>PAY BY:</h5>`
    );
    paymentTypes.forEach((mode) => {
      text += (`<button onclick=${processPayment(mode)}>${mode.toUpperCase()}</button>`);
    });
    text += '</div>';
    return text;
  }
  
  let paymentTypes = [];
  ['taxi', 'bus', 'underground', 'river'].forEach((mode) => {
    if (originNode[mode][clickedNodeName] && clickedNode[mode][originNodeName]) {
      paymentTypes.push(mode);
    }
  });
  return encodeURIComponent(generateHtml(paymentTypes));
};
