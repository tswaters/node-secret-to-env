# Secret to Env

Used to parse docker secrets into environment variables

## Install

```sh
npm i secret-to-env
```

## Usage

```js
const {get, getSync} = require('secret-to-env')

await get() // returns promise
getSync() // uses sync fs methods
```

## Options

* target - object to mutate, defaults to `process.env`

* dir - directory to load, default to `/var/run/secret`

* encoding - file encoding, defaults to utf-8

## License

MIT

