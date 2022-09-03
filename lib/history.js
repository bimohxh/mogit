const fs = require('fs');
const path = require('path');

module.exports =  {
    write(commits, branchs) {
        fs.writeFileSync(path.join(__dirname, '../logs/commits.json'), JSON.stringify({
            commits,
            branchs
        }, null, 4), 'utf8');
    },
    read() {
        try {
            const data = require('../logs/commits.json');
            return data;
        } catch(e) {
        }
        return {};
    }
}