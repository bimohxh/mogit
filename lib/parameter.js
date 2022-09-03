const dayjs = require('dayjs');

module.exports = [
    {
        key: 'start',
        command: '-s, --start <YYYY-MM-DD>',
        description: 'start time, default is monday this week',
        default: dayjs().add(-dayjs().day(), 'day').format('YYYY-MM-DD')
    },
    {
        key: 'end',
        command: '-e, --end <YYYY-MM-DD>',
        description: 'end time, default is today',
        default: dayjs().format('YYYY-MM-DD')
    },
    {
        key: 'append',
        command: '-a, --append',
        description: 'if you want ot accumulate the results in different branch or repo, you shoud set true.',
        default: false
    },
    {
        key: 'output',
        command: '-o, --output <file name>',
        description: 'output to a file at current folder, output at current terminal if not specified',
        default: ''
    }
]