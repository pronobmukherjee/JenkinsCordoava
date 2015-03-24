Ext.define('LoginApp.store.GSCountries', {
    extend:'Ext.data.Store',
    config:{
        refs: {
               navigationView:'homepageview navigationview'
        },
        model:'LoginApp.model.GSCountry',
//        requires: ['LoginApp.proxy.soap'],
        autoLoad:false,
           proxy: {
            type: 'ajax',
            url: 'http://demo5532567.mockable.io/CountryList',
            reader: {
                type: 'json',
                rootProperty:'GSCountry'
            }
        },
        listeners:{
            beforeload:function()
            {
//                alert('Before');
                Ext.Viewport.setMasked({
                        xtype: 'loadmask',
                        message: 'Loading...'
                    });
             },
            load:function(store, records,operation)
            {
//                alert('HERE'+store.getCount());
                var rec = { CurrencyTypeID: '0', CountryID: '0',Country:'All' };
                store.insert(0,rec);
                Ext.Viewport.setMasked(false);
            }
        }
    }
});