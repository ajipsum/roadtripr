process.env.NODE_ENV = 'test'

require('babel-core/register')()

require.extensions['.css'] = function () {return null}
/*
var jsdom = require('jsdom');
var exposedProperties = ['window', 'navigator', 'document']
const { JSDOM } = jsdom;
*/
var fs = require('fs');
require.extensions['.png'] = function(module, filepath) {
  var src = fs.readFileSync(filepath).toString ('base64');
  return module._compile('module.exports = "data:image/png;base64,' + src + '";');

}
/*
const { document } = (new JSDOM('')).window;
global.document = document
global.navigator = { userAgent: 'node.js' }
global.window = document.defaultView
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property)
    global[property] = document.defaultView[property]
  }
})
documentRef = document */