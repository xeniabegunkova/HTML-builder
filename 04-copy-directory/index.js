const fs = require('fs');

const folder = `${__dirname}/files/`;
const copyFolder = `${__dirname}/files-copy/`;

const createFolder = () => {
    fs.mkdir(copyFolder, err => {
        if (err) throw err; // не удалось создать папку
        console.log('New directory already created');
    });
};

const copyFile = () => {
    fs.readdir(folder, (err, files) => {
        files.forEach(e => {
            fs.copyFile(
                folder + e,
                copyFolder + e,
                (err) => {if (err) throw err}
            )
        });
        console.log('All files copied!')
    })
}

fs.rm(copyFolder, { recursive: true }, err => {
    createFolder();
    copyFile();
})