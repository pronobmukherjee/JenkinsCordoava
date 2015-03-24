Ext.define('LoginApp.view.NewBookingView',{
	extend: 'Ext.Container',
	alias: "widget.newbookingview",
	requires:['Ext.form.*','Ext.Container.*','Ext.Label','Ext.Img','LoginApp.ux.field.DateTimePicker','LoginApp.view.AddressBookView','Ext.scroll.*'],
	config:{
		border:	10,
        layout: 'fit',
		items:[
            {
                xtype: 'navigationBar'
            },
            {
                xtype: 'formpanel',
                scrollable: {
                    direction:'vertical',
                    directionLock: true
                },
                items: [
                    {
                        xtype:'fieldset',
                        defaults: {
                          labelAlign: 'top'
                        },
                        items:[
                            {
                                xtype: 'selectfield', //dropdown
                                id: 'RideShare',
                                itemId: 'RideShare',
                                labelWrap: true,
                                placeHolder:'Select',
                                labelWrap:'true',
                                options:[
                                    {text:'Book for', value:'Book for'},
                                    {text:'Self', value:'Self'},
                                    {text:'Other', value:'Other'}
                                ]
                            }
                        ]
                    },
                    {
                        xtype:'fieldset',
                        items:[
                            {
                                xtype:'segmentedbutton',
                                flex:'1',
                                style:'font-size:14px;',
                                name:'RideTypeSegment',
                                items:[
                                    {
                                        text:'Transfer',
                                        pressed: true
                                    },
                                    {
                                        text:'Wait+Return'
                                    },
                                    {
                                        text:'As Directed'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype:'fieldset',
                        title:'Vehicle Details',
                        defaults: {
                          labelAlign: 'top'
                        },
                        items:[
                            {
                                xtype: 'datetimepickerfield', //datepicker
                                name: 'date',
                                label: 'Pickup Date',
                                id: 'date',
                                labelWrap: true,
                                dateTimeFormat:'Y-m-d H:i',
                                value: new Date(),
                                picker: {
                                    minuteInterval:1,
                                    slotOrder:['year','month','day','hour','minute']
                                }
                            },
                            {
                                xtype: 'selectfield', //dropdown
                                itemId: 'VehicleType',
                                placeHolder:'Please select a vehicle',
                                labelWrap:'true',
                                id: 'VehicleType',
                                label: 'Vehicle Type',
                                labelWrap: true,
                                store: 'VehicleTypeByBrand',
                                valueField: 'NoOfPassengers',
                                displayField: 'Description',
                                autoSelect:'false'
                            },
                            {
                                xtype: 'selectfield', //dropdown
                                id: 'NoOfPassengers',
                                itemId: 'NoOfPassengers',
                                label: 'Passenger no',
                                labelWrap: true,
                                placeHolder:'Please select',
                                autoSelect:'false',
                                labelWrap:'true'
                            },
                            {
                                xtype: 'selectfield', //dropdown
                                id: 'RideShare',
                                itemId: 'RideShare',
                                label: 'Ride Share',
                                labelWrap: true,
                                placeHolder:'Select',
                                labelWrap:'true',
                                options:[
                                    {text:'Select', value:'Select'},
                                    {text:'Yes', value:'Yes'},
                                    {text:'No', value:'No'}
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        id: 'AddressPanel',
                        name: 'AddressPanel'
                    },
                    {
                        layout: {
                            type: 'hbox',
                            pack: 'end',
                            align: 'start'
                        },
                        items: [
                        {
                            xtype: 'button',
                            itemId: 'AdditionalStops',
                            name:'additionalStops_btn',
                            ui: 'action',
                            padding: '10px',
                            style:'width:50%;margin:8px;;font-size:14px;',
                            text: 'Additional Stops'
                        }]
                    },
                    {
                        layout: {
                            type: 'hbox',
                            pack:'center'
                        },
                        items: [
                        {
                            xtype: 'button',
                            itemId: 'getQuote',
                            name:'getQuote_btn',
                            ui: 'action',
                            style:'width:70%;margin:8px;font-size:18px;',
                            text: 'Get quote'
                        }]
                    }
                ]
           }
		],
		listeners: [
            {
                fn: 'onVehicleChange',
                event: 'change',
                delegate: '#VehicleType'
            }
        ]
	},
 
    onVehicleChange: function(selectfield, newValue, oldValue, options) {
 
        var formpanel = selectfield.up('newbookingview');
 
        var passengerField = formpanel.down('#NoOfPassengers');
//        alert('on change newValue='+newValue);
        var options = [], maxNumber = parseInt(newValue);
        options.push({text: 'Please select', value: 'Please select'})
        for (var i =1; i <= maxNumber; i++) {
          options.push({text: ''+i, value: i})
        }
        passengerField.setOptions(options);
    }
});