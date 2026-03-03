const {getAllFilePathsWithExtension, readFile} = require('./fileSystem');
const {readLine} = require('./console');

const files = getFiles();

console.log('Please, write your command!');
readLine(processCommand);

function getFiles() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(path => readFile(path));
}

function getComments() {
    let result = [];
    for (const file of files) {
        for (const line of file.lines) {
            if (line.startsWith('// TODO ')) {
                result.push(line);
            }
        }
    }

    return result;
}

function processCommand(command) {
    switch (command) {
        case 'show':
        case 'important':
        case 'user':
        
        case 'exit':
            process.exit(0);
            break;
        default:
            console.log('wrong command');
            break;
    }
}

// TODO you can do it!
