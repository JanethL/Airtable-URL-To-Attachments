const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

/**
* An HTTP endpoint that acts as a webhook for Custom API or Webhook request event
* @returns {object} result Your return value
*/
module.exports = async () => {
  let result = {airtable: {}};

console.log(`Running [Airtable → Select Records by querying a Base]...`);
  result.airtable.selectQueryResult = await lib.airtable.query['@0.5.2'].select({
    baseId: `< Insert BaseId Here >`,
    table: `Product Inventory`,
    where: [
      {
        'QRCodeImage__is_null': true
      }
    ],
    limit: {
      'count': 0,
      'offset': 0
    }
  });
  console.log(`Running [Airtable → Update Records by querying a Base]...`);
  for (var i = 0; i < result.airtable.selectQueryResult.rows.length; i++) {
  await lib.airtable.query['@0.5.2'].update({
    baseId: `Insert BaseID Here`,
    table: `Product Inventory`,
    where: [
      { 
      'Product ID': `${result.airtable.selectQueryResult.rows[i].fields['Product ID']}`
      }
      ],
    limit: {
      'count': 0,
      'offset': 0
    },
    fields: {
      'QRCodeImage': [ {"url": `${result.airtable.selectQueryResult.rows[i].fields['QRCodeLink']}`}]
      },
    typecast: false
  });
  }
  return result;
};