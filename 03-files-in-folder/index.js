const fs = require('fs');
const path = require('path'); //import modules

const fileName = path.join(__dirname, 'secret-folder');

fs.readdir(fileName, { withFileTypes: true }, (err, files) => {
    if (err) {
        console.log(err);
    }
    for (let i = 0; i < files.length; i++) {
        let currentFile = path.join(fileName, files[i].name);
        fs.stat(currentFile, (statError, Dirent) => {
            if (statError) throw statError;
            if (files[i].isFile()) {
                console.log(`${files[i].name.slice(0, files[i].name.indexOf('.'))} - ${path.extname(files[i].name).slice(1)} - ${Dirent.size} b`);
            }
        });
    }
});