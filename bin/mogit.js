#! /usr/bin/env node
const program = require('commander');
const generate = require('../actions/generate');
const parameter = require('../lib/parameter');
program
  .version(require('../package.json').version, '-v, --version', 'output the current version')
  .usage(`command parameter`)

  parameter.forEach(item => {
    program.option(item.command, item.description)
  })

program.parse(process.argv)

generate(program.opts());
