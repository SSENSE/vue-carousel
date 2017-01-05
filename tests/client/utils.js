const Vue = require('vue');
const tidy = require('htmltidy').tidy;

const options = {
  doctype: 'html5',
  hideComments: true,
  showBodyOnly: true,
  indent: true,
  indentAttributes: true,
  verticalSpace: true,
  wrap: 0,
  tabSize: 2
};

function expectToMatchSnapshot(vm, element) {
  return new Promise((resolve, reject) => {
    Vue.nextTick().then(() => {
      const html = (element || vm.$el).innerHTML;
      tidy(html, options, (err, cleanHtml) => {
        expect(cleanHtml).toMatchSnapshot();
        resolve();
      });
    }).catch((err) => reject(err));
  });
}
exports.expectToMatchSnapshot = expectToMatchSnapshot;
