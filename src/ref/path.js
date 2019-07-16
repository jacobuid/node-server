const path = require('path');

// Base name
console.log('File base name: ', path.basename(__filename));

// Directory name
console.log('File directory name (method 1): ', path.dirname(__filename));
console.log('File directory name (method 2): ', __dirname);

// File type
console.log('File type: ', path.extname(__filename));

// Create path object
console.log('File Options: \n', path.parse(__filename));

// Contatenate paths
console.log('Contatenate path: ', path.join(__dirname, 'test', 'hello-world.html'));