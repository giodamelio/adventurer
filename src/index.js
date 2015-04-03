var assert = require("assert");
var fs = require("fs");
var path = require("path");
var util = require("util");

var rc = require("rc");
var colors = require("colors");

var parse = require("./parse");

// Load config
var config = rc("adventurer", {});

var entryFile;
try {
    // Check if entry is given
    assert.equal(config._.length, 1, "You must provide ONE entry file");

    // Full path to entry file
    entryFile = path.join(process.cwd(), config._[0]);

    // Check that entry exists
    assert.ok(fs.existsSync(entryFile), "Entry file must exist");
} catch (e) {
    console.log(e.message.red);
    process.exit(1);
}

// Parse the story into a graph
var entryFileName = path.basename(entryFile);
var basePath = path.dirname(entryFile);
var storyGraph = parse(entryFileName, basePath);

console.log(util.inspect(storyGraph, {
    depth: null
}));

