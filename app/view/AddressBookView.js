Ext.define('LoginApp.view.AddressBookView',{
	extend: 'Ext.form.Panel',
	alias: "widget.addressbookview",
    xtype:'AddressView',
	requires:['Ext.form.FieldSet','Ext.form.Password','Ext.Label','Ext.Img'],
	config:{
		border:	10,
		items:[
            {
                xtype: 'navigationBar'
            },
			{
				xtype: 'label',
			    html: 'Personal Address Book.',
			    style: 'color:#000000;margin:10px 10px;'	
			},
            {
				xtype: 'label',
			    html: 'Select an address from the drop-down menu to Edit or Remove.',
                labelWrap:true,
			    style: 'color:#000000;margin:10px 10px;'	
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
            },
			{
                xtype: 'selectfield', //dropdown
                itemId: 'TownCity',
                id: 'TownCity',
                label: 'Town/City',
                labelWrap: true,
                valueField: 'id',
                placeHolder:'Select Town/City',
                autoSelect:'true',
                labelWrap:'true',
                displayField: 'name'
            },
			{
                xtype: 'selectfield', //dropdown
                id: 'Code',
                itemId: 'Code',
                label: 'Code',
                labelWrap: true,
                store: 'GSAddressCodes',
                valueField: 'value',
                placeHolder:'Select Code',
                autoSelect:'true',
                labelWrap:'true',
                displayField: 'title'
            }
		],
		listeners: [
            {
                fn: 'onCountryChange',
                event: 'change',
                delegate: '#Country'
            }
        ]
    },
 
    onCountryChange: function(selectfield, newValue, oldValue, options) {
 
        var formpanel = selectfield.up('addressbookview');
 
        var towncityfield = formpanel.down('#TownCity');
//        alert('on change newValue='+newValue);
        var gstowncities = Ext.getStore('GSTownCities');
        gstowncities.filter('CountryID',newValue);
        gstowncities.load();
//        alert('on change gstowncities='+gstowncities.getCount());
        towncityfield.setStore(gstowncities);
        towncityfield.reset();
    }
});