/* eslint-env mocha */
'use strict'

const assert = require('assert')
const path = require('path')
const {get, getSync} = require('./')

describe('env-to-secret', () => {

  const encoding = 'utf-8'
  const dir = path.join(__dirname, 'fixtures')

  let target = null

  beforeEach(() => {
    target = {}
  })

  it('should load things properly - async', async () => {

    await get({target, encoding, dir})

    assert.deepEqual(target, {
      'secret-1': 'secret-1-value',
      'secret-2': 'secret-2-value'
    })

  })

  it('should load things properly - sync', () => {

    getSync({target, encoding, dir})

    assert.deepEqual(target, {
      'secret-1': 'secret-1-value',
      'secret-2': 'secret-2-value'
    })

  })

})
