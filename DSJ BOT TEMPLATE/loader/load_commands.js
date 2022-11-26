const fs = require('fs');

module.exports = async client => {

    let i = 1;

    fs.readdirSync('./commands').filter(f => f.endsWith('.js')).forEach(async file => {
        let currentCommand = require(`../commands/${file}`);
        if (!currentCommand.name || typeof(currentCommand.name) !== 'string') throw new TypeError(`[ERROR] Command "${file.slice(0, file.length - 3)}" was not loaded ! (undefined command)`);
        client.commands.set(currentCommand.name, currentCommand);
        var isLoaded = 'is succesfully loaded!';
        console.log(`Command "${file}" ${isLoaded} ${i++}`);
        //console.log('------------------------------------------------');
    });
}