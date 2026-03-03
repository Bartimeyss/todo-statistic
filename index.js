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

function parseLine(line) {
    // [string] => [userInfo, Date, text, importance]
    const meta = line.split(';');

    return [meta[0], new Date(meta[1]), meta[2], (line.match(/!/g) || []).length, meta.length != 1];
}

function formatTodo(todo) {
    if (todo[4]) {
        console.log(`${todo[0]}; ${formatDate(todo[1])}; ${todo[2]};`);
        return
    }
    console.log(todo[0])

}

function processCommand(command) {
    const comments = getComments();
    const predprocessed = comments.map(parseLine);
    //console.log(predprocessed[0]);

    //getComments();
    const commandData = command.split(' ');
    switch (commandData[0]) {
        case 'show':
            for (todo of comments) {
                console.log(todo);
            }
            break;
        case 'important':
            for (todo of predprocessed) {
                if (todo[3] !== null) {
                    formatTodo(todo);
                }
            }
            break;
        case 'user':
            for (todo of predprocessed) {
                if (todo[0].toLowerCase() === commandData[1].toLowerCase()) {
                    //console.log(todo)
                    formatTodo(todo);
                }
            }
            break;

        case 'sort':
            if (commandData.length === 1) {
                break;
            }
            switch (commandData[1]) {
                case 'importance':
                    predprocessed.sort((a, b) => b[3] - a[3]);
                    break;
                case 'date':
                    predprocessed.sort((a, b) => b[1] - a[1]);
                    break;
                case 'user':
                    predprocessed.sort((a, b) => a[0].localeCompare(b[0]));
                    break;
            }
            for (todo of predprocessed) {
                formatTodo(todo);
            }
            break;
        case 'date':
            for (todo of predprocessed){
                if (todo[1] - new Date(commandData) >= 0){
                    formatTodo(todo);
                }
            }
            break;
        case 'exit':
            process.exit(0);
            break;
        default:
            console.log('wrong command');
            break;
    }
}

function formatDate(date) {
    const d = date.getDate().toString().padStart(2, '0');
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${d}-${m}-${date.getFullYear()}`
}

// TODO you can do it!
