const git = require('../lib/git');
const fs = require('fs');
const path = require('path');
const report = require('../lib/report');
const parameter = require('../lib/parameter');

module.exports = async function(args) {


    // 合并参数
    const options = parameter.reduce((result, item) => {
        return {
            ...result,
            [item.key]: args[item.key] === undefined ? item.default : args[item.key]
        }
    }, {})

    // console.log('options', options)
    
    const commits = await git.getCommits(options.start, options.end)
    const content = await report.generate(commits, options);

    // fs.writeFileSync(`./gitfish-report.md`, content, 'utf-8');
    console.log(content)
}


