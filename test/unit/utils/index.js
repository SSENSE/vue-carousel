/* eslint-disable */

var createAppContainer = function() {
  // Remove existing app nodes
  var element = document.getElementById('app');
  if (element) {
    element.parentNode.removeChild(element);
  }
  const appContainer = document.createElement('div');
  const innerContainer = document.createElement('div');
  appContainer.id = 'app';
  innerContainer.id = 'appInner';
  appContainer.style.height = '800px';
  appContainer.appendChild(innerContainer);
  document.body.appendChild(appContainer);
}

module.exports = {
  'createAppContainer': createAppContainer
};