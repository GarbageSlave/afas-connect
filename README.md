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
    - [DataConnector](#DataConnector)
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

#### v3.x
```js
const { Profit } = require('afas-connect');
const { Languages, EnvTypes } = require('afas-connect/lib/models');

const ProfitService = new Profit({
  token: '<YOUR_TOKEN_HERE>',
  env: '12345',
  envType: EnvTypes.Production, // or 'production' like in v2.x
  // Optional
  language: Languages.Dutch // or 'nl-nl'
})
```

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

## Profit API

### JSON

**Models**

From /lib/models you can import some enums which make some options more verbose. 
They are for convience, so you can still just use 1 instead of OperatorTypes.EqualTo if you want to.
```js
// All enums
const { OrderBy, OperatorTypes, Languages, EnvTypes, ImageSizes } = require('afas-connect/lib/models');
```

#### Profit

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

#### GetConnector

**GetConnector.get(getconnectorname[, config])**
```js
// Getting data
const response = await ProfitService.GetConnector.get('Profit_Article' [, config])

// -> expected response { skip: 0, take: 100, rows: [...] }
```

**GetConnector.metainfo(getconnectorname)**
```js
// Getting the metainfo of a getconnector
const metainfo = await ProfitService.GetConnector.metainfo('Profit_Article')

// -> expected response { rows: [...] }
// If left empty, example .metainfo(''), gives a list of all connectors, use Profit.metainfo() then instead
```
##### GetConnector Config Schema
```js
const { OrderBy, OperatorTypes } = require('afas-connect/lib/models');
{
  // `skip` indicates how much records AFAS should skip
  skip: number

  // `take` indicates the max records AFAS should take
  take: number, 

  // `orderby` controls the order by which the records will be recieved
  orderby: [
    { 
      fieldId: string, 
      order: 'ASC', 'DESC' or OrderBy.* // Example: OrderBy.Ascending, which is basically 'ASC' but more verbose
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
      operatortype: number or OperatorType.*, // example: OperatorType.EqualTo, which is basically 1 but more verbose
      or: [
        { 
          filtervalue: string, 
          operatortype: number or OperatorType.*
        }, 
        { 
          ...
        }
      ] 
    }
  ]
}
```

##### Advanced examples GetConnector
Here we will make full use of the config when getting from a GetConnector
```js
const { OrderBy, OperatorTypes } = require('afas-connect/lib/models');

// Getting data using filter
const config1 = {
  skip: 0, 
  take: 50, 
  orderby: [
    { 
      fieldId: 'Itemcode', 
      order: OrderBy.Ascending 
    },
    { 
      fieldId: 'Date', 
      order: OrderBy.Descending
    }
  ], 
  filter: [
    { 
      filterfieldid: 'Itemcode', 
      filtervalue: '12345AB',
      operatortype: OperatorTypes.EqualTo, 
      or: [
        { 
          filtervalue: '6789CD', 
          operatortype: OperatorTypes.ContainsText
        }, 
        { 
          filtervalue: '0000', 
          operatortype: OperatorTypes.StartsWith
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

#### UpdateConnector

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

#### DataConnector

**DataConnector.version()**
```js
// Get AFAS version
const response = await ProfitService.DataConnector.version()

// -> expected response { version: "<YOUR AFAS VERSION>" }
```

**DataConnector.file(fileId, fileName[, binary])**
```js
// Get file from AFAS
const response = await ProfitService.DataConnector.file(123, 'report', false)
```

**DataConnector.image(format, imageId[, binary])**
```js
const { ImageSizes } = require('afas-connect/lib/models');

// Get image from AFAS
const response = await ProfitService.DataConnector.image(0 or ImageSizes.Original, 'image' [, false])
```

**DataConnector.subject(subjectId, fileId)**
```js
// Get image from AFAS
const response = await ProfitService.DataConnector.subject(123, 456)
```

**DataConnector.report(reportId, additionalFilter[, binary])**
```js
// Get image from AFAS
const response = await ProfitService.DataConnector.subject(123, '?filterfieldids=Project&filtervalues=Test&operatortypes=1', false)
```

#### InsiteConnector

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
##### Advanced examples InsiteConnector
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
### SOAP

#### SoapConnector

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

- DataConnector File upload 

Furthermore I consider this package to be fairly complete, however! If you would like something added/ changed you can send in a PR or dm me on Discord garbageslave#0438

From time to time I will probably update this package as things either change or I discover something new. For now, thank you for using this package! :) 
