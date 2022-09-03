const { exec } = require('child_process');
const tty = process.platform === 'win32' ? 'CON' : '/dev/tty';

module.exports = {
    getCommits(startTime, endTime) {
        return new Promise((resolve, reject) =>{
            const command = `git log --since="${startTime}" --until="${endTime}" --pretty=format:"%an ==>  %B"  < ${tty}`;
            // console.log('command', command)
            exec(command, {
                cwd: process.cwd(),
                maxBuffer: 5000 * 1024
                }, (err, stdout) => {
                    const commits = stdout.split('\n').filter(item => item && item.includes('==>') && !item.includes('Merge branch'));
                    resolve(commits)
                });
        })
    },

    getBranch() {
        return new Promise((resolve, reject) =>{
        exec('git rev-parse --abbrev-ref HEAD', {
            cwd: process.cwd()
            }, (err, stdout) => {
                resolve(stdout.replace(/\n/g, ''))
            });
        })
    }
}


