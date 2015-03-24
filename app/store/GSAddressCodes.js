Ext.define('LoginApp.store.GSAddressCodes', {
    extend: 'Ext.data.Store',
    alias: 'store.gsaddresscodes',
 
    config: {
        autoLoad:true,
        data: [
                { value: 'Airport', title: 'Airport' },
                { value: 'Home', title: 'Home' },
                { value: 'Hotel', title: 'Hotel' },
                { value: 'Office', title: 'Office' },
                { value: 'Other', title: 'Other' },
                { value: 'Private Hangar', title: 'Private Hangar' },
                { value: 'Restaurant', title: 'Restaurant' },
                { value: 'Station', title: 'Station' }
        ],
 
        storeId: 'GSAddressCodes',
 
        fields: [
            {
                name: 'value'
            },
            {
                name: 'title'
            }
        ],
        listeners:{
            load:function(store, records,operation)
            {
                //Append All in TownCities List
                var rec1 = {value: 'All', title: 'All' };
                store.insert(0,rec1);
             }
        }
    }
});