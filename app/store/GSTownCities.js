Ext.define('LoginApp.store.GSTownCities', {
    extend: 'Ext.data.Store',
    alias: 'store.gstowncities',
 
    config: {
 
        data: [
            {
                id: 1,
                CountryID: 81,
                name: 'RICKMANSWORTH'
            },
            {
                id: 2,
                CountryID: 81,
                name: 'AYLESBURY'
            },
            {
                id: 3,
                CountryID: 81,
                name: 'COBHAM'
            },
            {
                id: 4,
                CountryID: 94,
                name: 'Los Angles'
            },
            {
                id: 5,
                CountryID: 94,
                name: 'San francisco'
            },
            {
                id: 6,
                CountryID: 94,
                name: 'California'
            },
            {
                id: 7,
                CountryID: 82,
                name: 'London'
            },
            {
                id: 8,
                CountryID: 94,
                name: 'New York'
            }
        ],
 
        storeId: 'GSTownCities',
 
        fields: [
            {
                name: 'id'
            },
            {
                name: 'CountryID'
            },
            {
                name: 'name'
            }
        ],
        listeners:{
            load:function(store, records,operation)
            {
                //Append All in TownCities List
                var rec1 = { id: 0, CountryID: 0,name:'All' };
                store.insert(0,rec1);
             }
        }
    }
});