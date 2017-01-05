const Vue = require('vue');
const tidy = require('libtidy').compat.htmltidy.tidy;

const options = {
  doctype: 'html5',
  'hide-comments': true,
  'show-body-only': true,
  indent: true,
  'indent-attributes': true,
  'vertical-space': true,
  'drop-empty-elements': false,
  wrap: 0,
  tabSize: 2
};

function expectToMatchSnapshot(vm, element) {
  return new Promise((resolve, reject) => {
    Vue.nextTick().then(() => {
      const html = (element || vm.$el).innerHTML;
      tidy(html, options, (err, cleanHtml) => {
        if (err) {
          return reject(err);
        }

        expect(cleanHtml).toMatchSnapshot();
        resolve();
      });
    }).catch(reject);
  });
}

exports.expectToMatchSnapshot = expectToMatchSnapshot;
