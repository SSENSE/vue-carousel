# hexo-renderer-marked

[![Build Status](https://travis-ci.org/hexojs/hexo-renderer-marked.svg?branch=master)](https://travis-ci.org/hexojs/hexo-renderer-marked)  [![NPM version](https://badge.fury.io/js/hexo-renderer-marked.svg)](http://badge.fury.io/js/hexo-renderer-marked) [![Coverage Status](https://img.shields.io/coveralls/hexojs/hexo-renderer-marked.svg)](https://coveralls.io/r/hexojs/hexo-renderer-marked?branch=master)

Add support for [Markdown]. This plugin uses [marked] as render engine.

## Installation

``` bash
$ npm install hexo-renderer-marked --save
```

- Hexo 3: >= 0.2
- Hexo 2: 0.1.x

## Options

You can configure this plugin in `_config.yml`.

``` yaml
marked:
  gfm: true
  pedantic: false
  sanitize: false
  tables: true
  breaks: true
  smartLists: true
  smartypants: true
```

- **gfm** - Enables [GitHub flavored markdown](https://help.github.com/articles/github-flavored-markdown)
- **pedantic** - Conform to obscure parts of `markdown.pl` as much as possible. Don't fix any of the original markdown bugs or poor behavior.
- **sanitize** - Sanitize the output. Ignore any HTML that has been input.
- **tables** - Enable GFM [tables](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#wiki-tables). This option requires the `gfm` option to be true.
- **breaks** - Enable GFM [line breaks](https://help.github.com/articles/github-flavored-markdown#newlines). This option requires the `gfm` option to be true.
- **smartLists** - Use smarter list behavior than the original markdown.
- **smartypants** - Use "smart" typograhic punctuation for things like quotes and dashes.

[Markdown]: http://daringfireball.net/projects/markdown/
[marked]: https://github.com/chjj/marked