/* jshint node: true */
'use strict';
var path = require('path');
var find = require('broccoli-stew').find;
var log = require('broccoli-stew').log;

module.exports = {
  name: 'ember-highlight-js',
  treeFor: function(name)  {
      var config = this.app.project.config().emberHighlightJs || {};
      var style = config.style;

      if (name === 'styles' && style) {
        return log(find([
          find(__dirname + '/vendor/highlight.js/styles/{' + style + '}.css'),
          this._super.treeFor.apply(this, arguments)
        ]));
      }

      return this._super.treeFor.apply(this, arguments);
  },

  included: function included(app) {
    this.app = app;

    this._super.included(app);

    var config = this.app.emberHighlightJs || {};
    var style = config.style;

    app.import('vendor/highlight.js/index.js', {
      exports: {
        'highlight.js': [
          'default',
          'highlight',
          'highlightAuto',
          'highlightBlock'
        ]
      }
    });

    if (style) {
      app.import('vendor/highlight.js/styles/' + style + '.css')
    }
  }
};
