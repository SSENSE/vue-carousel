const Vue = require('vue');
const Html2jade = require('html2jade');

/** convert html to pug as a Promise */
function html2pug(html) {
  return new Promise((resolve, reject) => {
    Html2jade.convertHtml(html, {bodyless: true}, (err, jade) => {
      if (err) {
        reject(err)
      } else {
        resolve(jade)
      }
    })
  })
}

/** call vm.nextTick() as a Promise */
function nextTick(vm) {
  return new Promise((resolve, reject) => {
    Vue.nextTick(() => resolve())
  })
}

/** call vm.nextTick() and check the snapshot as a Promise */
function expectToMatchSnapshot(vm, element) {
  return new Promise((resolve, reject) => {
    nextTick(vm).then(() => html2pug((element || vm.$el).innerHTML)).then((jade) => {
      expect(jade).toMatchSnapshot()
      resolve()
    }).catch((err)=>(reject(err)))
  })
}

exports.expectToMatchSnapshot = expectToMatchSnapshot;
