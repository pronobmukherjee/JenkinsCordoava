Ext.define('LoginApp.view.ProfileView',{
	extend: 'Ext.Container',
	alias: "widget.profileview",
	requires:[],
	config:{
		border:	10,
        layout: 'fit',
		items:[
            {
                xtype: 'navigationBar'
            },
            {
                xtype: 'formpanel',
                scrollable:'vertical',
                items:[
                    {
                        xtype:'fieldset',
                        defaults: {
                          labelAlign: 'top'
                        },
                        title: 'Your Personal Details',
                        items:[
                            {
                                xtype:'textfield',
                                name:'Name',
                                label:'Name',
                                id:'Name',
                                labelWrap: true,
                                readOnly: true
                            },
                            {
                                xtype:'textfield',
                                name:'Mobile',
                                label:'Mobile',
                                id:'Mobile',
                                labelWrap: true,
                                readOnly: true
                            },
                            {
                                xtype:'textfield',
                                name:'OfficePhone',
                                label:'Office Phone',
                                id:'OfficePhone',
                                labelWrap: true,
                                readOnly: true
                            },
                            {
                                xtype:'textfield',
                                name:'AccountName',
                                label:'Account Name',
                                id:'AccountName',
                                labelWrap: true,
                                readOnly: true
                            } 
                        ]
                    },
                    {
                        xtype:'fieldset',
                        defaults: {
                          labelAlign: 'top'
                        },
                        title: 'Confirmation Details',
                        items:[
                            {
                                xtype:'textfield',
                                name:'Email',
                                label:'Email',
                                id:'Email',
                                labelWrap: true,
                                readOnly: true
                            },
                            {
                                xtype:'textfield',
                                name:'ConfirmationEmail',
                                label:'Confirmation Email',
                                id:'ConfirmationEmail',
                                labelWrap: true,
                                readOnly: true
                            },
                            {
                                xtype:'textfield',
                                name:'InvoiceEmail',
                                label:'Invoice Email',
                                id:'InvoiceEmail',
                                labelWrap: true,
                                readOnly: true
                            },
                            {
                                xtype:'textfield',
                                name:'MeetingInvite',
                                label:'Meeting Invite',
                                id:'MeetingInvite',
                                labelWrap: true,
                                readOnly: true
                            } 
                        ]
                    },
                    {
                        xtype:'fieldset',
                        defaults: {
                          labelAlign: 'top'
                        },
                        title: 'Home Address',
                        items:[
                            {
                                xtype:'textfield',
                                name:'Building',
                                label:'Building',
                                id:'Building',
                                labelWrap: true,
                                readOnly: true
                            },
                            {
                                xtype:'textfield',
                                name:'Street',
                                label:'Street',
                                id:'Street',
                                labelWrap: true,
                                readOnly: true
                            },
                            {
                                xtype:'textfield',
                                name:'Town',
                                label:'Town',
                                id:'Town',
                                labelWrap: true,
                                readOnly: true
                            },
                            {
                                xtype:'textfield',
                                name:'County',
                                label:'County',
                                id:'County',
                                labelWrap: true,
                                readOnly: true
                            },
                            {
                                xtype:'textfield',
                                name:'Postcode',
                                label:'Postcode',
                                id:'Postcode',
                                labelWrap: true,
                                readOnly: true
                            },
                            {
                                xtype:'textfield',
                                name:'Country',
                                label:'Country',
                                id:'Country',
                                labelWrap: true,
                                readOnly: true
                            }   
                        ]
                    },
                    {
                        xtype:'fieldset',
                        defaults: {
                          labelAlign: 'top'
                        },
                        title: 'Billing Details',
                        items:[
                            {
                                xtype:'textfield',
                                name:'CreditCardNumber',
                                label:'Credit Card Number',
                                id:'CreditCardNumber',
                                labelWrap: true,
                                readOnly: true
                            },
                            {
                                xtype:'textfield',
                                name:'CreditCardRef',
                                label:'Credit Card Ref',
                                id:'CreditCardRef',
                                labelWrap: true,
                                readOnly: true
                            },
                            {
                                xtype:'textfield',
                                name:'ExpiryDate',
                                label:'Expiry Date',
                                id:'ExpiryDate',
                                labelWrap: true,
                                readOnly: true
                            },
                            {
                                xtype:'textfield',
                                name:'NameOnCard',
                                label:'Name On Card',
                                id:'NameOnCard',
                                labelWrap: true,
                                readOnly: true
                            },
                            {
                                xtype:'textfield',
                                name:'CardType',
                                label:'Card Type',
                                id:'CardType',
                                labelWrap: true,
                                readOnly: true
                            }  
                        ]
                    }
                ]
            }
		]
	}
});