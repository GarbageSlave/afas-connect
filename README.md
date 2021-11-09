### What is AFAS Connect?

An all-in-one API that makes it easy to connect to Afas Profit REST / SOAP services written entirely in TypeScript.

### Table of Contents

- [Installation](#Installation)
- [Initializing](#Initializing)
- [Examples](#Examples)
  - [REST](#REST)
    - [Using the GetConnector](#Using-the-GetConnector)
    - [Using the UpdateConnector](#Using-the-UpdateConnector)
    - [Using the CustomConnector](#Using-the-CustomConnector)
    - [Using the InsiteConnector](#Using-the-InsiteConnector)
  - [SOAP](#SOAP)
    - [Getting data](#Getting-data)
    - [Updating, inserting and deleting data](#Updating,-inserting-and-deleting-data)
- [Planned](#Planned)

### Installation

To install using npm, simply:
```bash
$ npm install afas-connect
```
Yarn:
```bash
$ yarn add afas-connect
```

##### Initializing

```js
const { Profit } = require('afas-connect');

const AfasService = new Profit({
  token: '<YOUR_API_KEY_HERE>',
  env: '12345',
  envType: 'production'
})
```
### Examples

#### REST

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

##### Using the CustomConnector

```js
const response = await AfasService.CustomConnector.version()

// -> expected response { version: "<YOUR AFAS VERSION>" }
console.log(response.version)
```

#### Using the InsiteConnector

```js
const { Profit } = require('afas-connect');

const AfasServiceNoToken = new Profit({
  token: '',
  env: '12345',
  envType: 'production'
})

// Get users profile
const profile = await AfasServiceNoToken.InsiteConnector.profile("<INSITE PRIVATE KEY HERE>", "<INSITE 'CODE' URL QUERY PARAM HERE")

// Request a user specific token

// userId: could be something along the lines of 12345.Employee
// Environment API Key: You will find this in the In & Outite tab in AFAS
// Environment Key: You will find this in the In & Outite tab in AFAS
const request = await AfasServiceNoToken.InsiteConnector.requestOTP(profile.userId, "<ENVIRONMENT API KEY HERE>", "<ENVIRONMENT KEY HERE>")

// request will be true if the OTP request did not fail
if (request) {
  // The user will recieve an email with a code

  // otp: A code recieved in an email upon the request. If you already requested it recently, and did not recieve an email, you should use the most recent code 
  const userToken = await AfasServiceNoToken.InsiteConnector.validateOTP(profile.userId, "<ENVIRONMENT API KEY HERE>", "<ENVIRONMENT KEY HERE>", "<CODE RECIEVED IN EMAIL HERE>")

  AfasServiceNoToken.changeConfig({token: userToken})
}

```

#### SOAP

##### Getting data

```js
const response = await AfasService.SoapConnector.get('Profit_Article')

// -> expected response { GetDataResult: "<XML DATA STRING />" }
console.log(response.GetDataResult)

```

##### Updating, inserting and deleting data

```js
// Insert a record
const XMLstring1 = `
<FbItemArticle xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <Element>
        <Fields Action="insert">
          <ItCd>123</ItCd>
        </Fields>
    </Element>
</FbItemArticle>
`
await AfasService.SoapConnector.update('FbItemArticle', XMLstring1)

// Update a record
const XMLstring2 = `
<FbItemArticle xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <Element>
        <Fields Action="update">
          <ItCd>123</ItCd>
        </Fields>
    </Element>
</FbItemArticle>
`
await AfasService.SoapConnector.update('FbItemArticle', XMLstring2)

// Delete a record
const XMLstring3 = `
<FbItemArticle xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <Element>
        <Fields Action="delete">
          <ItCd>123</ItCd>
        </Fields>
    </Element>
</FbItemArticle>
`
await AfasService.SoapConnector.update('FbItemArticle', XMLstring3)
```

### Planned

- Add CustomConnector to SOAP
- Write better tests
