
'use strict'

const path = require('path')
const {promisify} = require('util')
const {
  readdirSync,
  readFileSync,
  readdir: _readdir,
  readFile: _readFile
} = require('fs')

const readdir = promisify(_readdir)
const readFile = promisify(_readFile)

function parseOpts (opts) {

  if (!opts.path) {
    opts.path = '/var/run/secrets'
  }

  if (!opts.encoding) {
    opts.encoding = 'utf-8'
  }

  if (!opts.target) {
    opts.target = process.env
  }

  return opts
}

module.exports.get = async (opts) => {

  const {dir, encoding, target} = parseOpts(opts)
  const secrets = await readdir(dir)

  for (const secret_name of secrets) {
    const secret_value = await readFile(path.join(dir, secret_name), encoding)

    if (!target.hasOwnProperty(secret_name)) {
      target[secret_name] = secret_value.trim()
    }

  }

}

module.exports.getSync = opts => {
  const {dir, encoding, target} = parseOpts(opts)
  const secrets = readdirSync(dir)

  for (const secret_name of secrets) {
    const secret_value = readFileSync(path.join(dir, secret_name), encoding)

    if (!target.hasOwnProperty(secret_name)) {
      target[secret_name] = secret_value.trim()
    }

  }  
}
