const table = require('./table')
const fs = require('fs');
const path = require('path');
const history = require('./history');
const git = require('../lib/git')
const colors = require('colors');

const filterCommit = commits => {
    return commits.reduce((result, item) => {
        const words = item.split('==>');
        const name = words[0].trim();
        const jiraMatchs = words[1].match(/\w{2,}\-\d{3,}/);
        if (jiraMatchs) {
            const jira = jiraMatchs[0];
            result[name] = result[name] || {};
            result[name][jira] = words[1].trim();
        }
        
        return result;
    }, {});
}

const getTitle = (options, branchs) => {
    const branchWords =  branchs.map(item => `[ ${colors.cyan(item)} ]`).join(' ');
        
    return  `\n branch ${branchWords} from ${colors.magenta(options.start)} to ${colors.magenta(options.end)} statistical results\n`
}


module.exports = {
    async generate(commits, options) {
        let commitArr = filterCommit(commits);
        let branchs = [await git.getBranch()]
        if (options.append) {
            const historyData = history.read();
            Object.keys(historyData.commits || {}).forEach(name => {
                commitArr[name] = {
                    ...(commitArr[name] || {}),
                    ...historyData.commits[name]
                }
            })

            branchs = [
                ...branchs,
                ...(historyData.branchs || [])
            ]
        }

        branchs = [...new Set(branchs)]

        history.write(commitArr, branchs)

        const tables = table.generate(commitArr)
        const title = getTitle(options, branchs);
        
        return [
            title,
            tables
        ].join('\n');
    }
}