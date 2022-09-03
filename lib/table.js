var Table = require('cli-table3');
const colors = require('colors');

// 每排 5 个
const formatJirasTd = (jiras) => {
    return jiras.reduce((result, item) => {
        const last = result[result.length - 1];
        if (!last || last.length >= 5) {
            result.push([item])
        } else {
            last.push(item)
        }
        return result;
    }, []).map(item => item.join(' ')).join('\n')
}


module.exports = {
    generate(commitArr) {
        var table = new Table({
            head: ['Name', 'Amount', 'Detail'],
            colWidths: [20, 12, 70]
        });
        const tds = Object.keys(commitArr).map(name => {
            return [
                name,
                colors.green.bold(Object.keys(commitArr[name]).length),
                colors.grey(formatJirasTd(Object.keys(commitArr[name])))
            ]
        })
        
        // tds.sort((a, b) => b[1] - a[1]);
        table.push(...tds)
        return table.toString();
    }
}