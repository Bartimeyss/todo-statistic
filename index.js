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
    let i = 0;
    for (const file of files) {
        for (const line of file.split('\n')) {
            const idx = line.indexOf('// TODO ')
            if (idx != -1 && line.indexOf('indexOf') == -1) {            
                //console.log(line)
                result.push(line.slice(idx + 8));
            }
        }
    }

    return result;
}

function parseLine(line){
    // [string] => [userInfo, Date, text, importance]
    const meta = line.split(';');
    return [meta[0], new Date(meta[1]), meta[2], line.match(/!/g)];
}

function processCommand(command) {
    const comments = getComments();
    const predprocessed = comments.map(parseLine); 
    //console.log(predprocessed[0]);

    //getComments();
    switch (command) {
        case 'show':
            for (todo of comments){
                console.log(todo);
            }
        case 'important':
            for (todo of predprocessed){
                if (todo[3] !== null){
                    console.log(`${meta[0]}; ${formatDate(meta[1])}; ${meta[2]};`);
                }
            }
        case 'user':
            for (todo of)
        case 'sort':
            //predprocessed.sort((a, b) => b[3] >= a[3])
        case 'exit':
            process.exit(0);
            break;
        default:
            console.log('wrong command');
            break;
    }
}

function formatDate (date) {
    const d = date.getDate().toString().padStart(2, '0');
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${d}-${m}-${date.getFullYear()}`
}

// TODO you can do it!
