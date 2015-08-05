'use strict';
var esprima = require('esprima'),
    escodegen = require('escodegen'),
    jsdiff = require('diff'),
    scopeFinder = require('./scope_finder'),
    astraverse = require('./astraverse');
var getDiff = function(file1, file2, fileName) {
    var ast1;
    var ast2;
    var format1, format2, diff;

    try {
        ast1 = esprima.parse(file1);
    } catch (e) {
        throw 'unable to parse ' + file1;
    }
    try {
        ast2 = esprima.parse(file2);
    } catch (e) {
        throw 'unable to parse ' + file2;
    }
    format1 = escodegen.generate(ast1);
    format2 = escodegen.generate(ast2);
    diff = jsdiff.diffLines(format2, format1);
    var patch = jsdiff.createPatch(fileName, format1, format2);
    return patch;
};
var applyPatch = function(file1, diff) {
    var format1;
    var ast1 = esprima.parse(file1);
    format1 = escodegen.generate(ast1);
    var patched = jsdiff.applyPatch(format1, diff);
    return patched + '\n';
};
var applyPatchPreserve = function(sourceCode, diff) {
    var createAst = function(source) {
        return esprima.parse(source, {
            loc: true,
            source: source.toString()
        });
    };
    var astOfOriginalFile = createAst(sourceCode);
    var regeneratedOriginalFile = escodegen.generate(astOfOriginalFile, {
        sourceMapWithCode: true, // Get both code and source map
        sourceContent: sourceCode.toString()
    });
    var patched = jsdiff.applyPatch(regeneratedOriginalFile.code, diff);
    var astOfPatchedFile = esprima.parse(patched, {
        loc: true,
        source: patched
    });

    return astraverse.equalizeTrees(astOfPatchedFile, sourceCode, createAst);
};
module.exports = {
    diff: getDiff,
    patch: applyPatch,
    patchPreserve: applyPatchPreserve
};
