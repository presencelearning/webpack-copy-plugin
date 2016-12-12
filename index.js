var fs = require('fs-extra');

function WebpackCopyPlugin(options) {
    if (typeof options !== "object") {
        options = {};
    }
    this.options = options;
}

WebpackCopyPlugin.prototype.apply = function(compiler) {
    var options = this.options;
    if (options.dirs) {
        compiler.plugin('compilation', function(compilation) {
            options.dirs.forEach(function(dirs) {
                if (dirs.from && dirs.to) {
                    fs.copy(dirs.from, dirs.to, { clobber: true }, function(err) {
                        if (err) {
                            console.error('err: ', err);
                        } else {
                            console.log(`Copied ${dirs.from} to ${dirs.to}`);
                        }
                    });
                } else {
                    console.error(`webpack-copy-plugin: options.dirs[].from ${dirs.from} and options.dirs[].to ${dirs.to} are required.`);
                }
            });
        });
    } else {
        console.error(`webpack-copy-plugin: options.dirs ${options.dirs} is required.`);
    }
};

module.exports = WebpackCopyPlugin;