const fs = require('fs');
const path = require('path');

const styleFolder = path.join(__dirname, 'styles');
const testFolder = path.join(__dirname, 'test-files');

const bundle = path.join(testFolder, 'bundle.css');

const stream = fs.createWriteStream(bundle, 'utf-8');

fs.readdir(styleFolder, (err, files) => {
    if (err)
        console.log(err);
    for (const file of files) {
        if (path.extname(file) === '.css') {
            const outStream = fs.createReadStream(path.join(styleFolder, file), 'utf-8');
            outStream.on('data', chunk => {
                stream.write(chunk);
            })
        }
    }
})
