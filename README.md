# Webpack Copy Plugin

Copies directories from anywhere to anywhere (not limited to webpack build).


## Why?

If you want to copy files for any reason.
One reason is because angular 2 and webpack has an import problem from `node_modules`, so this is
a workaround to automatically copy the files from `node_modules` to a local directory.


## Usage


### Install

Add to `package.json` & `npm install`
`"webpack-copy-plugin": "git+ssh://git@github.com/presencelearning/webpack-copy-plugin"`

### Add to webpack config:


And ignore the generated file (write directory) to prevent infinite webpack build loops.

```
var WebpackCopyPlugin = require('webpack-copy-plugin');
var WatchIgnorePlugin = webpack.WatchIgnorePlugin;
...
new WebpackCopyPlugin({
    dirs: [
        { from: 'node_modules/my-dir1', to: 'src/lib1' },
    ],
    options: {},
}),

new WatchIgnorePlugin([
    'src/lib1'
])
```