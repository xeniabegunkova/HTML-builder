const fs = require('fs');

const stream = new fs.ReadStream("01-read-file/text.txt", {encoding: 'utf-8'});

stream.on('readable', function () {
    const data = stream.read();
    console.log(data);
});