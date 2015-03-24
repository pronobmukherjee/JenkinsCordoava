Ext.define('LoginApp.model.VehicleTypeModel', {
 extend: 'Ext.data.Model',
    config:{
        fields: [
            {
                name: 'Description',
                type: 'string'
            },
            {
                name: 'NoOfPassengers',
                type: 'string'
            },
            {
                name: 'ServiceID',
                type: 'string'
            },
            {
                name: 'Type',
                type: 'string'
            }
        ]
    }
});