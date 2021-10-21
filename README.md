### What is AFAS Connect?
An API that makes it easy to connect to Afas Profit REST services written entirely in TypeScript.

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

#### REST

##### Initializing
```js
const { Profit } = require('afas-connect');

const AfasService = new Profit({
  apiKey: '<YOUR_API_KEY_HERE>',
  env: '12345',
  envType: 'production'
})
```

##### Using the GetConnector
```js
// Getting data
const response = await AfasService.GetConnector.get('Profit_Article')

// -> expected response { skip: 0, take: 100, rows: [...ect] }
console.log(response.rows)

// Getting data using filter
const config1 = {
  skip: 0, 
  take: 50, 
  orderby: [
    { 
      fieldId: 'Itemcode', 
      order: 'ASC' 
    },
    { 
      fieldId: 'Date', 
      order: 'DESC' 
    }
  ], 
  filter: [
    { 
      filterfieldid: 'Itemcode', 
      filtervalue: '12345AB',
      operatortype: 1, 
      or: [
        { 
          filtervalue: '6789CD', 
          operatortype: 6 
        }, 
        { 
          filtervalue: '0000', 
          operatortype: 10
        }
      ] 
    }
  ]
}
const response1 = await AfasService.GetConnector.get('Profit_Article', config1)

// Or, using the jsonFilter 
const config2 = {
  skip: 0, 
  take: 50,
  orderby: [{ fieldId: 'Itemcode', order: 'ASC' }, { fieldId: 'Date', order: 'DESC' }], 
  jsonFilter: {
    "Filters": {
      "Filter": [
        // Base
        {
          "@FilterId": "Filter 1",
          "Field": [
            {
              "@FieldId": "Itemcode",
              "@OperatorType": 1,
              "#text": "12345AB"
            },
            {
              "@FieldId": "Date",
              "@OperatorType": 1,
              "#text": "01-01-2021"
            }
          ]
        },
        // Or
        {
        "@FilterId": "Filter 2",
          "Field": [
            {
              "@FieldId": "Itemcode",
              "@OperatorType": 6,
              "#text": "6789CD"
            },
            {
              "@FieldId": "Date",
              "@OperatorType": 1,
              "#text": "02-02-2021"
            }
          ]
        },
        // Or
        {
          "@FilterId": "Filter 3",
          "Field": [
            {
              "@FieldId": "Itemcode",
              "@OperatorType": 10,
              "#text": "0000"
            }
          ]
        }
      ]
    }
  }
}
const response2 = await AfasService.GetConnector.get('Profit_Article', config2)

// Get metainfo of Getconnector
const metainfo = await AfasService.GetConnector.metainfo('Profit_Article')

```

##### Using the UpdateConnector
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

#### SOAP

##### Getting data

```js
const response = await AfasService.SoapConnector.get('Profit_Article')

// -> expected response { GetDataResult: "<XML DATA STRING />" }
console.log(response.GetDataResult)

```

### Planned
- Create SOAP method alternative ✅
- Do more typing of variables
- Write better tests
