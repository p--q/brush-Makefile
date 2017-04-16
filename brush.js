var BrushBase = require('brush-base');
var regexLib = require('syntaxhighlighter-regex').commonRegExp;
function Brush() {
    var functions =  'subst patsubst strip findstring filter filter-out sort dir notdir suffix basename addsuffix addprefix join word wordlist words firstword wildcard foreach origin shell'; 
    var constants = 'PHONY SUFFIXES DEFAULT PRECIOUS INTERMEDIATE SECONDARY IGNORE SILENT EXPORT_ALL_VARIABLES';
    this.regexList = [
        { regex: regexLib.singleLinePerlComments, css: 'comments' },  // one line comments
        { regex: regexLib.doubleQuotedString, css: 'string' }, // double quoted strings
        { regex: regexLib.singleQuotedString, css: 'string' }, // single quoted strings
        { regex: /\$\([^\@%<\?\^\+\*]\w+\)/gm,             css: 'variable' },  // 変数
        { regex: /((\$\(?[\@%<\?\^\+\*](D\)|F\))*)|%|\$&lt;)/gm,    css: 'keyword' },   // 自動変数
        { regex: new RegExp(this.getKeywords(functions), 'gm'),   css: 'functions' }, // テキスト変形関数
        { regex: new RegExp(this.getKeywords(constants), 'gm'),   css: 'constants' }  // ビルトインターゲット名  
    ];
}
Brush.prototype = new BrushBase();
Brush.aliases = ['Makefile'];
module.exports = Brush;
