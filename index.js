
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

  if (!opts.dir) {
    opts.dir = '/var/run/secrets'
  }

  if (!opts.encoding) {
    opts.encoding = 'utf-8'
  }

  if (!opts.target) {
    opts.target = process.env
  }

  return opts
}

exports.get = async (opts = {}) => {
  const {dir, encoding} = parseOpts(opts)
  const secrets = await readdir(dir, {encoding})
  const ret = {}

  for (const secret_name of secrets) {
    const secret_value = await readFile(path.join(dir, secret_name), encoding)
    ret[secret_name] = secret_value.trim()
  }

  return ret
}

exports.getSync = (opts = {}) => {
  const {dir, encoding} = parseOpts(opts)
  const secrets = readdirSync(dir, {encoding})
  const ret = {}

  for (const secret_name of secrets) {
    const secret_value = readFileSync(path.join(dir, secret_name), encoding)
    ret[secret_name] = secret_value.trim()
  }

  return ret
}

exports.config = async (opts = {}) => {
  const {target} = parseOpts(opts)
  const secrets = await exports.get(opts)

  for (const [secret_name, secret_value] of Object.entries(secrets)) {
    if (!target.hasOwnProperty(secret_name)) {
      target[secret_name] = secret_value
    }
  }
}

exports.configSync = (opts = {}) => {
  const {target} = parseOpts(opts)
  const secrets = exports.getSync(opts)

  for (const [secret_name, secret_value] of Object.entries(secrets)) {
    if (!target.hasOwnProperty(secret_name)) {
      target[secret_name] = secret_value
    }
  }
}
