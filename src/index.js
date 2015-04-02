var assert = require("assert");
var fs = require("fs");
var path = require("path");

var rc = require("rc");

// Load config
var config = rc("adventurer", {});

try {
    // Check if entry is given
    assert.equal(config._.length, 1, "You must provide ONE entry file");

    // Check that entry exists
    assert.ok(fs.existsSync(path.join(__dirname, config._[0])), "Entry file must exist");
} catch (e) {
    console.log(e.message);
    process.exit(1);
}

console.log(config);

