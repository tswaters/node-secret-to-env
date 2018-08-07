/* eslint-env mocha */
'use strict'

const sinon = require('sinon')
const assert = require('assert')
const path = require('path')
const proxyquire = require('proxyquire')

describe('env-to-secret', () => {

  let get = null
  let getSync = null
  let config = null
  let configSync = null

  const encoding = 'utf-8'
  const dir = path.join(__dirname, 'fixtures')

  beforeEach(() => {
    ({get, getSync, config, configSync} = proxyquire('./', {
      fs: {
        readdir: sinon.stub().callsArgWith(2, null, ['secret-1', 'secret-2']),
        readdirSync: sinon.stub().returns(['secret-1', 'secret-2']),
        readFile: sinon.stub().callsArgWith(2, null, 'secret-value'),
        readFileSync: sinon.stub().returns('secret-value')
      }
    }))
  })

  afterEach(() => {
    delete process.env['secret-1']
    delete process.env['secret-2']
  })

  describe('get', () => {

    it('should get with no options properly - async', async () => {

      const result = await get()

      assert.deepEqual(result, {
        'secret-1': 'secret-value',
        'secret-2': 'secret-value'
      })

    })

    it('should get properly - async', async () => {

      const result = await get({encoding, dir})

      assert.deepEqual(result, {
        'secret-1': 'secret-value',
        'secret-2': 'secret-value'
      })

    })

    it('should get with no options properly - sync', () => {

      const result = getSync()

      assert.deepEqual(result, {
        'secret-1': 'secret-value',
        'secret-2': 'secret-value'
      })

    })

    it('should get properly - sync', () => {

      const result = getSync({encoding, dir})

      assert.deepEqual(result, {
        'secret-1': 'secret-value',
        'secret-2': 'secret-value'
      })

    })
  })

  describe('config', () => {

    let target = null

    beforeEach(() => {
      target = {}
    })

    it('should config properly with no options - async', async () => {

      await config()

      assert.equal(process.env['secret-1'], 'secret-value')
      assert.equal(process.env['secret-2'], 'secret-value')
    })

    it('should config properly - async', async () => {

      await config({target, encoding, dir})

      assert.deepEqual(target, {
        'secret-1': 'secret-value',
        'secret-2': 'secret-value'
      })

    })

    it('should config properly with no options - sync', () => {

      configSync()

      assert.equal(process.env['secret-1'], 'secret-value')
      assert.equal(process.env['secret-2'], 'secret-value')

    })

    it('should config properly - sync', () => {

      configSync({target, encoding, dir})

      assert.deepEqual(target, {
        'secret-1': 'secret-value',
        'secret-2': 'secret-value'
      })

    })
  })


})
