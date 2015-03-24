Ext.define('LoginApp.model.GSCountry', {
 extend: 'Ext.data.Model',
    config:{
     fields: [
      {
       name: 'Country',
       type: 'string'
      },
      {
       name: 'CountryID',
       type: 'string'
      },
      {
       name: 'CurrencyTypeID',
       type: 'string'
      }
     ]
    }
});