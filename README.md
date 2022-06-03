### What is AFAS Connect?

An all-in-one API that makes it easy to connect to Afas Profit REST / SOAP services written entirely in TypeScript.

### Table of Contents

- [Installation](#Installation)
- [Initializing](#Initializing)
- [Profit API](#Profit-API)
  - [JSON](#JSON)
    - [Profit](#Profit)
    - [GetConnector](#GetConnector)
      - [GetConnector Config Schema](#GetConnector-Config-Schema)
      - [Advanced examples GetConnector](#Advanced-examples-GetConnector)
    - [UpdateConnector](#UpdateConnector)
    - [CustomConnector](#CustomConnector)
    - [InsiteConnector](#InsiteConnector)
      - [Advanced examples InsiteConnector](#Advanced-examples-InsiteConnector)
  - [SOAP](#SOAP)
    - [SoapConnector](#SoapConnector)
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

### Initializing

#### v2.x
```js
const { Profit } = require('afas-connect');

const ProfitService = new Profit({
  token: '<YOUR_TOKEN_HERE>',
  env: '12345',
  envType: 'production'
})
```
#### v1.x
```js
const { Profit } = require('afas-connect');

const ProfitService = new Profit({
  apiKey: '<YOUR_TOKEN_HERE>',
  env: '12345',
  envType: 'production'
})
```

### Profit API

#### JSON

##### Profit

**get Profit.config**
```js
// Get the current config
const currentconfig = ProfitService.config

// -> expected response { environment, environmentType }
```

**Profit.metainfo()**
```js
// Get environment metainfo
const metainfo = await ProfitService.metainfo()

// -> expected response { updateConnectors: [ { id, description } ], getConnectors: [ { id, description } ], info: { envid, appName, group, tokenExpiry } }
```

**Profit.changeConfig(AfasConfig)**
```js
// Change the current AfasConfig
ProfitService.changeConfig({ env: "67890" })
```

##### GetConnector

**GetConnector.get(getconnectorname[, config])**
```js
// Getting data
const response = await ProfitService.GetConnector.get('Profit_Article' [, config])

// -> expected response { skip: 0, take: 100, rows: [...] }
```

**GetConnector.metainfo(getconnectorname)**
```js
// Getting connectorname metainfo
const metainfo = await ProfitService.GetConnector.metainfo('Profit_Article')

// -> expected response { rows: [...] }
```
###### GetConnector Config Schema
```js
{
  // `skip` indicates how much records AFAS should skip
  skip: number

  // `take` indicates the max records AFAS should take
  take: number, 

  // `orderby` controls the order by which the records will be recieved
  orderby: [
    { 
      fieldId: string, 
      order: 'ASC' or 'DESC' 
    },
    {
      ...
    }
  ],
  // `filter` allows the recieved records to be filtered to, for example, a single record which you want
  filter: [
    {
      filterfieldid: string, 
      filtervalue: string,
      operatortype: number, 
      or: [
        { 
          filtervalue: string, 
          operatortype: number 
        }, 
        { 
          ...
        }
      ] 
    }
  ]
}
```

###### Advanced examples GetConnector
Here we will make full use of the config when getting from a GetConnector
```js
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
const response1 = await ProfitService.GetConnector.get('Profit_Article', config1)

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
const response2 = await ProfitService.GetConnector.get('Profit_Article', config2)
```

##### UpdateConnector

**UpdateConnector.insert(updateconnectorname, body)**
```js
// Inserts a record
await ProfitService.UpdateConnector.insert('FbItemArticle', {
  FbItemArticle: {
    Element: {
      Fields: {
        ItCd: "123"
      }
    }
  }
})
```

**UpdateConnector.insertSubUpdateMain(updateconnectorname, subupdateconnectorname, body)**
```js
// Updates main record, inserts sub record
await ProfitService.UpdateConnector.insertSubUpdateMain('FbItemArticle', 'FbArticleCustom', {
  FbItemArticle: {
    Element: {
      Fields: {
        ItCd: "123"
      }
    }
  }
})
```

**UpdateConnector.update(updateconnectorname, body)**
```js
// Updates a record
await ProfitService.UpdateConnector.update('FbItemArticle', {
  FbItemArticle: {
    Element: {
      Fields: {
        ItCd: "456"
      }
    }
  }
})
```
**UpdateConnector.delete(updateconnectorname, urlparams)**
```js
// Deletes a record
await ProfitService.UpdateConnector.delete('FbItemArticle', 'FbItemArticle/FbItemArticle/ItCd/123')
```

**UpdateConnector.metainfo(updateconnectorname)**
```js
// Get metainfo
const metainfo = await ProfitService.UpdateConnector.metainfo('FbItemArticle')

// -> expected response { rows: [...] }
```

##### CustomConnector

**CustomConnector.version()**
```js
// Get AFAS version
const response = await ProfitService.CustomConnector.version()

// -> expected response { version: "<YOUR AFAS VERSION>" }
```

**CustomConnector.file(fileId, fileName)**
```js
// Get file from AFAS
const response = await ProfitService.CustomConnector.file(123, 'report')
```

**CustomConnector.image(format, imageId[, inBinary])**
```js
// Get image from AFAS
const response = await ProfitService.CustomConnector.image(0, 'image' [, false])
```

**CustomConnector.subject(subjectId, fileId)**
```js
// Get image from AFAS
const response = await ProfitService.CustomConnector.subject(123, 456)
```

**CustomConnector.report(reportId, additionalFilter)**
```js
// Get image from AFAS
const response = await ProfitService.CustomConnector.subject(123, '?filterfieldids=Project&filtervalues=Test&operatortypes=1')
```

##### InsiteConnector

**InsiteConnector.profile(insitePrivateKey, insiteCodeParam[, intergrationtokenurl])**
```js
// Get profile on Insite
const profile = await ProfitService.InsiteConnector.profile("<INSITE PRIVATE KEY HERE>", "<INSITE 'CODE' URL QUERY PARAM HERE"[, "<EXAMPLE: https://12345.afasinsite.nl/intergrationtoken>"])
```

**InsiteConnector.requestOTP(profileUserId, environmentApiKey, EnvironmentKey)**
```js
// Request a user specific token
const request = await ProfitService.InsiteConnector.requestOTP(profile.userId, "<ENVIRONMENT API KEY HERE>", "<ENVIRONMENT KEY HERE>")
```

**InsiteConnector.validateOTP(profileUserId, environmentApiKey, EnvironmentKey, code)**
```js
// Validate request
const userToken = await AfasServiceNoTokenNoEnv.InsiteConnector.validateOTP(profile.userId, "<ENVIRONMENT API KEY HERE>", "<ENVIRONMENT KEY HERE>", "<CODE RECIEVED IN EMAIL HERE>")
// -> expected response '<YOUR USER TOKEN>'
```
###### Advanced examples InsiteConnector
Using the InsiteConnector in a website intergrated in Insite.
Here we create an instance without knowing the environment and token.
```js
const { Profit } = require('afas-connect');

const AfasServiceNoTokenNoEnv = new Profit({
  token: '',
  env: '',
  envType: 'production'
})

// Private key: You will find this in the In & Outsite tab in AFAS
// Code: When a website is intergrated in Insite, a few params will be added to the URL. In the URL is a 'code' query param, use that one here
// (optional) tokenUrl: use the 'tokenUrl' url query param here. SHOULD BE USED IF 'env' IS NOT FILLED IN 
const profile = await AfasServiceNoTokenNoEnv.InsiteConnector.profile("<INSITE PRIVATE KEY HERE>", "<INSITE 'CODE' URL QUERY PARAM HERE", "<EXAMPLE: https://12345.afasinsite.nl/intergrationtoken>")

// changing the env is required for the following requests to work. We know what to change it to since we have the users' profile
AfasServiceNoTokenNoEnv.changeConfig({ env: profile.environmentId })

// userId: could be something along the lines of 12345.Employee
// Environment API Key: You will find this in the In & Outsite tab in AFAS
// Environment Key: You will find this in the In & Outsite tab in AFAS
const request = await AfasServiceNoTokenNoEnv.InsiteConnector.requestOTP(profile.userId, "<ENVIRONMENT API KEY HERE>", "<ENVIRONMENT KEY HERE>")

// request will be true if the OTP request did not fail
if (request) {
  // The user will recieve an email with a code

  // otp: A code recieved in an email upon the request. If you already requested it recently, and did not recieve an email, you should use the most recent code 
  const userToken = await AfasServiceNoTokenNoEnv.InsiteConnector.validateOTP(profile.userId, "<ENVIRONMENT API KEY HERE>", "<ENVIRONMENT KEY HERE>", "<CODE RECIEVED IN EMAIL HERE>")

  AfasServiceNoTokenNoEnv.changeConfig({ token: userToken })
}
```
#### SOAP

##### SoapConnector

**SoapConnector.get(getconnectorname)**
```js
// Get data using SOAP
const response = await ProfitService.SoapConnector.get('Profit_Article')

// -> expected response { GetDataResult: "<XML DATA STRING />" }

```

**SoapConnector.update(updateconnectorname, xmlstring)**
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
await ProfitService.SoapConnector.update('FbItemArticle', XMLstring1)

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
await ProfitService.SoapConnector.update('FbItemArticle', XMLstring2)

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
await ProfitService.SoapConnector.update('FbItemArticle', XMLstring3)
```

### Planned

- Add CustomConnector to SOAP
- Write better tests
