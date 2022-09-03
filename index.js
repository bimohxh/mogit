const { exec } = require('child_process');
const tty = process.platform === 'win32' ? 'CON' : '/dev/tty';

exec(`git log --since="2022-08-22" --pretty=format:"%an ==>  %B"  < ${tty}`, {
    cwd: process.cwd(),
    maxBuffer: 5000 * 1024
  }, (err, stdout) => {
        console.log(stdout.split('\n').filter(item => {
            return /xmkfb\-\d+\):/.test(item) && item.includes('==>')
        }).reduce((result, item) => {
            const words = item.split('==>');
            const name = words[0].trim();
            result[name] = result[name] || [];
            result[name].push(words[1].trim());
            return result;
        }, {}));
  });
