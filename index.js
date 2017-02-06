var path = require('path');
var fs = require('fs-extra');

function WebpackCopyPlugin(options) {
    if (typeof options !== "object") {
        options = {};
    }
    this.options = options;
}

// https://github.com/pingyuanChen/webpack-uglify-js-plugin/blob/master/utils/file.js#L10
// Like mkdir -p. Create a directory and any intermediary directories.
function mkdir (dirpath, mode) {
  // Set directory mode in a strict-mode-friendly way.
  if (mode == null) {
    mode = parseInt('0777', 8) & (~process.umask());
  }
  var pathSeparatorRe = /[\/\\]/g;
  dirpath.split(pathSeparatorRe).reduce(function(parts, part) {
    parts += part + '/';
    var subpath = path.resolve(parts);
    if (!fs.existsSync(subpath)) {
      try {
        fs.mkdirSync(subpath, mode);
      } catch(e) {
        throw console.error('Unable to create directory "' + subpath + '" (Error code: ' + e.code + ').', e);
      }
    }
    return parts;
  }, '');
}

WebpackCopyPlugin.prototype.apply = function(compiler) {
    var options = this.options;
    if (options.dirs) {
        compiler.plugin('compilation', function(compilation) {
            options.dirs.forEach(function(dirs) {
                if (dirs.from && dirs.to) {
                    mkdir(dirs.to);
                    fs.copy(dirs.from, dirs.to, { clobber: true }, function(err) {
                        if (err) {
                            // console.error('err: ', err);
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