var assert = require("assert");
var fs = require("fs");
var path = require("path");
var util = require("util");

var rc = require("rc");
var colors = require("colors");
var grayMatter = require("gray-matter");

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

// Parse entry
var entry = fs.readFileSync(entryFile);
entry = grayMatter(entry.toString());
console.log(util.inspect(entry));

