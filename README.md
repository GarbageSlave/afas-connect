### What is AFAS Connect?
An API that makes it easy to connect to Afas Profit REST services written in javascript.

### Getting started / Installation

To install using npm, simply:
```bash
$ npm install afas-connect
```
Yarn:
```bash
$ yarn add afas-connect
```

### Examples

Initializing
```js
const { Profit } = require('afas-connect');

const AfasService = new Profit({
  apiKey: '<YOUR_API_KEY_HERE>',
  env: '12345',
  envType: 'production'
})
```

Using the GetConnector
```js
// Getting data
const response = await AfasService.GetConnector.get('Profit_Article')

// -> expected response { skip: 0, take: 100, rows: [...ect] }
console.log(response.rows)

// Get metainfo
const metainfo = await AfasService.GetConnector.metainfo('Profit_Article')
```

Using the UpdateConnector
```js
// Inserts a record
await AfasService.UpdateConnector.insert('FbItemArticle', {
  FbItemArticle: {
    Element: {
      Fields: {
        ItCd: "123"
      }
    }
  }
})

// Updates main record, inserts sub record
await AfasService.UpdateConnector.insertSubUpdateMain('FbItemArticle', 'FbArticleCustom', {
  FbItemArticle: {
    Element: {
      Fields: {
        ItCd: "123"
      }
    }
  }
})

// Updates a record
await AfasService.UpdateConnector.update('FbItemArticle', {
  FbItemArticle: {
    Element: {
      Fields: {
        ItCd: "456"
      }
    }
  }
})

// Deletes a record
await AfasService.UpdateConnector.delete('FbItemArticle', 'FbItemArticle/FbItemArticle/ItCd/123')

// Get metainfo
const metainfo = await AfasService.UpdateConnector.metainfo('FbItemArticle')
```

### Planned
- Merge all functions into one class. Which will be a breaking change I think
- Create SOAP method alternative
- ~~Change node-fetch to axios~~
- Do more typing of variables
- Write better tests
