# Secret to Env

[![npm version][npm-badge]][npm-url]
[![Build Status][travis-badge]][travis-url]
[![Coverage Status][coveralls-badge]][coveralls-url]
[![Dependency Status][david-badge]][david-url]

Used to parse docker secrets into environment variables

## Install

```sh
npm i secret-to-env
```

## Usage

```js
const {get, getSync} = require('secret-to-env')

const result = await get() // returns promise, resolves to secrets
const result = getSync() // uses sync methods, returns secrets

await config() // populates secrets into process.env
configSync() // uses sync methods, populates into process.env
```

## API

### config

populates secrets into `target`

*options* - passed as object.

* _target_ - object to mutate, defaults to `process.env`

* _dir_ - directory to load, default to `/var/run/secret`

* _encoding_ - file encoding, defaults to utf-8

### get

returns secrets as pogo

*options* - passed as object.

* _dir_ - directory to load, default to `/var/run/secret`

* _encoding_ - file encoding, defaults to utf-8

## License

MIT


[npm-badge]: https://badge.fury.io/js/secret-to-env.svg
[npm-url]: https://badge.fury.io/js/secret-to-env
[travis-badge]: https://travis-ci.org/tswaters/node-secret-to-env.svg?branch=master
[travis-url]: https://travis-ci.org/tswaters/node-secret-to-env
[coveralls-badge]: https://coveralls.io/repos/github/tswaters/node-secret-to-env/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/tswaters/node-secret-to-env?branch=master
[david-badge]: https://david-dm.org/tswaters/node-secret-to-env.svg
[david-url]: https://david-dm.org/tswaters/node-secret-to-env
