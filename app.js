const readline = require('readline');
module.exports = askForNames;

function askForNames() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const names = [];

    function ask() {
        rl.question('Enter a name (or type "done" to finish): ', (answer) => {
            if (answer.toLowerCase() === 'done') {
                console.log('Names:', names);
                rl.close();
            } else {
                names.push(answer);
                ask();
            }
        });
    }

    ask();
}

askForNames();