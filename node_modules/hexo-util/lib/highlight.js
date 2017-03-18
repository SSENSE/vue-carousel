'use strict';

var hljs = require('highlight.js/lib/highlight');
var Entities = require('html-entities').XmlEntities;
var entities = new Entities();
var alias = require('../highlight_alias.json');

hljs.configure({
  classPrefix: ''
});

function highlightUtil(str, options) {
  if (typeof str !== 'string') throw new TypeError('str must be a string!');
  options = options || {};

  var gutter = options.hasOwnProperty('gutter') ? options.gutter : true;
  var wrap = options.hasOwnProperty('wrap') ? options.wrap : true;
  var firstLine = options.hasOwnProperty('firstLine') ? +options.firstLine : 1;
  var caption = options.caption;
  var mark = options.hasOwnProperty('mark') ? options.mark : [];
  var tab = options.tab;
  var data = highlight(str, options);

  if (!wrap) return data.value;

  var lines = data.value.split('\n');
  var numbers = '';
  var content = '';
  var result = '';
  var line;

  for (var i = 0, len = lines.length; i < len; i++) {
    line = lines[i];
    if (tab) line = replaceTabs(line, tab);
    numbers += '<div class="line">' + (firstLine + i) + '</div>';
    content += '<div class="line';
    content += (mark.indexOf(firstLine + i) !== -1) ? ' marked' : '';
    content += '">' + line + '</div>';
  }

  result += '<figure class="highlight' + (data.language ? ' ' + data.language : '') + '">';

  if (caption) {
    result += '<figcaption>' + caption + '</figcaption>';
  }

  result += '<table><tr>';

  if (gutter) {
    result += '<td class="gutter"><pre>' + numbers + '</pre></td>';
  }

  result += '<td class="code"><pre>' + content + '</pre></td>';
  result += '</tr></table></figure>';

  return result;
}

function encodePlainString(str) {
  return entities.encode(str);
}

function replaceTabs(str, tab) {
  return str.replace(/^\t+/, function(match) {
    var result = '';

    for (var i = 0, len = match.length; i < len; i++) {
      result += tab;
    }

    return result;
  });
}

function loadLanguage(lang) {
  hljs.registerLanguage(lang, require('highlight.js/lib/languages/' + lang));
}

function tryLanguage(lang) {
  if (hljs.getLanguage(lang)) return true;
  if (!alias.aliases[lang]) return false;

  loadLanguage(alias.aliases[lang]);
  return true;
}

function loadAllLanguages() {
  alias.languages.filter(function(lang) {
    return !hljs.getLanguage(lang);
  }).forEach(loadLanguage);
}

function highlight(str, options) {
  var lang = options.lang;
  var autoDetect = options.hasOwnProperty('autoDetect') ? options.autoDetect : false;

  if (!lang) {
    if (autoDetect) {
      loadAllLanguages();
      return hljs.highlightAuto(str);
    }

    lang = 'plain';
  }

  var result = {
    value: encodePlainString(str),
    language: lang.toLowerCase()
  };

  if (result.language === 'plain') {
    return result;
  }

  if (!tryLanguage(result.language)) {
    result.language = 'plain';
    return result;
  }

  return tryHighlight(str, result.language) || result;
}

function tryHighlight(str, lang) {
  try {
    return hljs.highlight(lang, str);
  } catch (err) {
    return;
  }
}

module.exports = highlightUtil;
