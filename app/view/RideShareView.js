Ext.define('LoginApp.view.RideShareView',{
	extend: 'Ext.form.Panel',
	alias: "widget.rideshareview",
	requires:['Ext.form.*','LoginApp.ux.field.DateTimePicker'],
	config:{
        layout: {
            type: 'vbox'
        },
        items:[
            {
                xtype: 'navigationBar'
            },
            {
                xtype:'fieldset',
                defaults: {
                          labelAlign: 'top'
                        },
                items:[
                   {
                        xtype: 'datetimepickerfield', //datepicker
                        name: 'date',
                        label: 'Pickup Date/Time',
                        id: 'date',
                        labelWrap: true,
                        dateTimeFormat:'Y-m-d H:i',
                        value: new Date(),
                        styleHtmlContent:true,
                        picker: {
                            minuteInterval:1,
                            slotOrder:['year','month','day','hour','minute']
                        }
                    },
                    {
                        xtype:'textfield',
                        name:'TownCity',
                        label:'Town/City',
                        id:'TownCity',
                        labelWrap: true,
                        styleHtmlContent:true
                    },
                    {
                        xtype:'textfield',
                        name:'PostZipCode',
                        label:'Post / ZipCode',
                        styleHtmlContent:true,
                        id:'PostZipCode',
                        labelWrap: true
                    },
                    {
                        xtype:'textfield',
                        name:'JourneyMileage',
                        label:'Journey Mileage',
                        styleHtmlContent:true,
                        id:'JourneyMileage',
                        labelWrap: true
                    },
                    {
                        xtype:'textfield',
                        name:'JourneyTime',
                        label:'Journey Time',
                        styleHtmlContent:true,
                        id:'JourneyTime',
                        labelWrap: true
                    },
                    {
                        xtype:'textfield',
                        name:'FlightNumber',
                        label:'Flight Number',
                        styleHtmlContent:true,
                        id:'FlightNumber',
                        labelWrap: true
                    }
                ]
            },
            {
                xtype: 'button',
                id: 'searchbutton',
                name:'search_btn',
                ui: 'action',
                style:'width:80%;margin:10px;font-size:14px;',
                text: 'Search'
            }
		]
	}
});