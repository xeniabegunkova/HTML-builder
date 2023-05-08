const fs = require('fs')

const readline = require('readline');

const fileName = '02-write-file/test.txt';

const rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt("Write text here: ");

rl.prompt();

rl.on("line", function (answer) {
    // ask a question to interact with user. 
    if (answer.trim() === 'exit') rl.close();
    fs.appendFile(fileName, answer, (err) => err && console.error(err));
    rl.prompt();
}).on('close', function () {
    console.log('Thank you for checking!');
    // close the program
    rl.close();
    process.exit(0);
});

process.on('SIGINT', () => {
    stdout.write('До свидания!');
    process.exit();
})
