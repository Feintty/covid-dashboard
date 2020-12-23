const path = require('path');
module.exports = {
  mode:"development",
    entry: [`./src/js/list.js`, `./src/js/table.js`, `./src/js/graphic.js`],
    output: {
      path: path.resolve('./src/build/'),
      filename: 'bundle.js'
    }
};