var fs = require("fs");
var path = require("path");

var grayMatter = require("gray-matter");

var parse = function(file, basePath, graph) {
    // Read entry file
    var contents = fs.readFileSync(path.join(basePath, file));

    // Parse entry file
    entry = grayMatter(contents.toString());

    // If graph does not exist, create it
    if (!graph) {
        graph = {};
    }

    // If file has already been parsed, skip it
    if (graph.hasOwnProperty(file)) {
        return graph;
    }

    // Add current file to graph
    graph[file] = {
        content: entry.content
    };
    for (var key in entry.data) {
        graph[file][key] = entry.data[key];
    }

    // Loop through links and parse them
    if (entry.data.hasOwnProperty("links")) {
        var links = entry.data.links;
        for (var i = 0; i < links.length; i++) {
            parse(links[i].filename, basePath, graph);
        }
    }

    return graph;
};

module.exports = parse;

