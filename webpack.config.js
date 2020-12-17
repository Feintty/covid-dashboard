const path = require('path');
module.exports = {
  mode:"development",
    entry: [`./src/js/init.js`,],
    output: {
      path: path.resolve('./src/build/'),
      filename: 'bundle.js'
    }
};