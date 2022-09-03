// const report = require('../lib/report')
// const commits = require("./commits")
const git = require('../lib/git')

// const content = report.generate(commits, {});

// console.log(content);

const action = async () => {
    console.log(await git.getBranch());
}

action();

