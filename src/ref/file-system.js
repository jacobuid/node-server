const path = require('path');
const fs = require('fs');


// Check if folder exist
fs.stat(path.join(__dirname, 'created-folder'), function(error, stats) {
    if (error && error.errno === -2) {
        // folder doesn't exist
    }
});


// Create folder
fs.mkdir(path.join(__dirname, 'created-folder'), {}, (error) =>{
    if(error) throw error;
    else {
        console.log('folder created...')
    }
});


// Create file
fs.writeFile(path.join(__dirname, '/created-folder', 'hello-world.txt'), 'Hello World!!', (error) => {
    if(error) throw error;
    else {
        console.log('file created and text written...');
    }
});


// Append file
fs.appendFile(path.join(__dirname, '/created-folder', 'hello-world.txt'), ' I love Node!!', (error) => {
    if(error) throw error;
    else console.log('text appended...');
});


// Read File
fs.readFile(path.join(__dirname, '/created-folder', 'hello-world.txt'), 'utf8', (error, data) => {
    if(error) throw error;
    else console.log('Text in file: ', data);
});


// Rename File
fs.rename(path.join(__dirname, '/created-folder', 'hello-world.txt'), path.join(__dirname, '/created-folder', 'file-renamed.txt'), (error, data) => {
    if(error) throw error;
    else console.log('File renamed...');
});


    


