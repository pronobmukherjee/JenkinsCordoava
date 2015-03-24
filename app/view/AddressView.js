Ext.define('LoginApp.view.AddressView',{
	extend: 'Ext.Panel',
	alias: "widget.addressview",
	requires:[],
	config:{
        layout: {
            type: 'vbox'
        },
        items:[
            {
                xtype:'fieldset',
                defaults: {
                    labelAlign: 'top'
                },
                items:[
                    {
                        xtype:'textfield',
                        name:'TownCity',
                        label:'Building number/name',
                        id:'TownCity',
                        labelWrap: true,
                        styleHtmlContent:true
                    },
                    {
                        xtype:'textfield',
                        name:'PostZipCode',
                        label:'Street',
                        styleHtmlContent:true,
                        id:'PostZipCode',
                        labelWrap: true
                    },
                    {
                        xtype:'textfield',
                        name:'JourneyMileage',
                        label:'Town / City',
                        styleHtmlContent:true,
                        id:'JourneyMileage',
                        labelWrap: true
                    },
                    {
                        xtype:'textfield',
                        name:'JourneyTime',
                        label:'Post / Zip code',
                        styleHtmlContent:true,
                        id:'JourneyTime',
                        labelWrap: true
                    },
                    {
                        xtype: 'selectfield', //dropdown
                        itemId: 'Country',
                        placeHolder:'Select Country',
                        autoSelect:'true',
                        labelWrap:'true',
                        id: 'Country',
                        label: 'Country',
                        labelWrap: true,
                        store: 'GSCountries',
                        valueField: 'CountryID',
                        displayField: 'Country',
                        autoSelect:'true'
                    }
                ]
            }
		]
	}
});