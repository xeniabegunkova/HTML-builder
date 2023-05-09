const fs = require('fs');
const promises = require('fs/promises');
const path = require('path'); //копируем нужные модули

function copy(from, to) {
    promises.readdir(from, {
        withFileTypes: true
    }).then(files => {
        files.forEach(file => {
            if (file.isFile()) {
                const filePath = path.join(from, file.name)
                fs.copyFile(filePath, path.join(to, file.name), (err) => {
                    if (err)
                        console.log(err);
                })
            } else {
                createDir(to, file.name, () => {
                    copy(path.join(from, file.name), path.join(to, file.name))
                })
            }
        })
    })
}

function createDir(srcPath, dirName, afterCreate) {
    fs.mkdir(path.join(srcPath, dirName), { recursive: true }, (err) => {
        if (err)
            console.log(err);
        afterCreate();
    })
}

function createStyle() {
    const styleStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'))
    promises.readdir(path.join(__dirname, 'styles'))
        .then(files => {
            files.forEach(file => {
                const readStream = fs.createReadStream(path.join(__dirname, 'styles', file), 'utf-8');
                readStream.on('data', (data) => {
                    styleStream.write(data);
                })
            })
        })
}

function createHTML() {
    let arr = [];
    const inStream = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');
    const outStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));

    promises.readdir(path.join(__dirname, 'components'), { withFileTypes: true })
        .then(
            files => {
                files.forEach(file => {
                    const fileName = path.basename(file.name)
                    const fileExt = path.extname(file.name)
                    arr.push(fileName.replace(fileExt, ""))
                })
            })

    inStream.on('data', async data => {
        let result = data.toString()
        for await (const component of arr) {
            let tempTag = `{{${component}}}`
            if (result.search(new RegExp(tempTag, 'g')) !== -1) {
                let tmpHtml = await getFileContent(`${component}.html`)
                result = result.replaceAll(tempTag, tmpHtml)
            }
        }
        outStream.write(result);
    })
}

async function getFileContent(fileName) {
    const readStream = fs.createReadStream(path.join(__dirname, 'components', fileName), 'utf-8')
    let resultStr = '';
    for await (const chunk of readStream) {
        resultStr = chunk;
    }
    return resultStr;
}

fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, (err) => {
    if (err)
        console.log(err);
    copy(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'));
    createStyle();
    createHTML();
})

//https://www.tabnine.com/code/javascript/functions/fs/copyFile
//https://www.geeksforgeeks.org/node-js-fspromises-copyfile-method/