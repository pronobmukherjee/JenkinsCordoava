Ext.define('LoginApp.store.VehicleTypeByBrand', {
    extend:'Ext.data.Store',
    config:{
        refs: {
        },
        model:'LoginApp.model.VehicleTypeModel',
        autoLoad:false,
           proxy: {
            type: 'ajax',
            url: 'http://demo5532567.mockable.io/vehicletype',
            reader: {
                type: 'json',
                rootProperty:'GSServices'
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
                var rec = { Description: 'Please select a vehicle', NoOfPassengers: '1',ServiceID:'' ,Type:''};
                store.insert(0,rec);
                Ext.Viewport.setMasked(false);
            }
        }
    }
});