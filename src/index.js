var assert = require("assert");
var fs = require("fs");
var path = require("path");
var util = require("util");

var rc = require("rc");
var colors = require("colors");
var swig = require("swig");
var markdownIt = require("markdown-it");

var parse = require("./parse");

// Load config
var config = rc("adventurer", {
    output: "out/",
    template: "default"
});

// Create our markdown renderer
var md = new markdownIt();

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

// If the output directory does not exist, create it
try {
    fs.mkdirSync(config.output);
} catch (e) {
    if (e.code != "EEXIST") {
        console.log(e.message.red);
    }
}

// Loop through each item and render it
for (var key in storyGraph) {
    var data = storyGraph[key];

    // If there are links, convert file extension
    if (data.links) {
        for (var i = 0; i < data.links.length; i++) {
            data.links[i].filename = data.links[i].filename.replace("md", "html");
        }
    }

    // Render the markdown
    data.content = md.render(data.content);

    // Render to file
    var file = swig.renderFile("templates/default.html", data);
    fs.writeFileSync(path.join(process.cwd(), config.output, key.replace("md", "html")), file);
}

