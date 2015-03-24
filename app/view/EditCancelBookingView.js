Ext.define('LoginApp.view.EditCancelBookingView',{
	extend: 'Ext.Container',
	alias: "widget.editcancelbookingview",
	requires:[],
	config:{
//        layout: {
//            type: 'vbox'
//        },
//        items:[
//            {
//                xtype: 'navigationBar'
//            },
//            {
//                xtype:'label',
//                html: 'Reservation listing for account :',
//			    style: 'color:#000000;margin:10px 10px;'	
//            }
//		]
//        {
//    xtype: 'container',
    fullscreen: true,
    scrollable: {
        direction: 'vertical'
    },
    title: 'Ticket',
    itemId: 'infoTab',
    layout: 'fit',
    items: [
        {
                xtype: 'navigationBar'
        },
        {
        xtype: 'formpanel',
        itemId: 'leadHeader',
        scrollable: 'vertical',
        items: [{
            xtype: 'fieldset',
            defaults: {
                          labelAlign: 'top'
                        },
            itemId: 'fieldSet',
            store: 'MyTicketStore',
            title: 'Ticket Details',
            items: [{
                xtype: 'textfield',
                itemId: 'handleField',
                label: 'Handle',
                labelWrap: true,
                name: 'handle',
                readOnly: true,
                hidden: true
            }, {
                xtype: 'textfield',
                itemId: 'refNumField',
                label: 'Reference No.',
                labelWrap: true,
                name: 'ref_num',
                readOnly: true
            }, {
                xtype: 'textfield',
                itemId: 'firstNameField',
                label: 'First Name',
                labelWrap: true,
                readOnly: true,
                name: 'firstName'
            }, {
                xtype: 'textfield',
                itemId: 'lastNameField',
                label: 'Last Name',
                labelWrap: true,
                readOnly: true,
                name: 'lastName'
            }, {
                xtype: 'textfield',
                itemId: 'categoryOfTicket',
                label: 'Category',
                labelWrap: true,
                readOnly: true,
                name: 'category'
            }, {
                xtype: 'selectfield',
                label: 'Priority',
                labelWrap: true,
                itemId: 'priorityOfTicket',
                displayField: 'text',
                valueField: 'value',
                name: 'priority',
                readOnly: true,
                listeners: {
                    initialize: function() {
                        this.setValue('priority');
                    }
                },
                options: [ // use store
                    {
                        text: 'None',
                        value: ''
                    }, {
                        text: 'P1',
                        value: 'P1'
                    }, {
                        text: 'P2',
                        value: 'P2'
                    }, {
                        text: 'P3',
                        value: 'P3'
                    }, {
                        text: 'P4',
                        value: 'P4'
                    },
                ]
            }, {
                xtype: 'textfield',
                itemId: 'userId',
                label: 'User ID',
                labelWrap: true,
                readOnly: true,
                name: 'userId'
            }, {
                xtype: 'textfield',
                itemId: 'summaryOfTicket',
                label: 'Summary',
                labelWrap: true,
                readOnly: true,
                name: 'summary'
            }, {
                xtype: 'textfield',
                itemId: 'descriptionOfTicket',
                label: 'Description',
                labelWrap: true,
                readOnly: true,
                name: 'description'
            }, {
                xtype: 'checkboxfield',
                itemId: 'internalLogforTicket',
                label: 'Internal',
                labelWidth: '80%',
                labelWrap: true,
                checked: false,
                name: 'internalLog'
            }, {
                xtype: 'textfield',
                itemId: 'commentsField',
                label: 'Comments',
                labelWrap: true,
                required: true,
                placeHolder: 'Enter the comments here',
                name: 'comments'
            }, {
                xtype: 'numberfield',
                itemId: 'timeSpentField',
                label: 'Time Spent',
                labelWrap: true,
                required: true,
                placeHolder: 'Enter time in Minutes',
                name: 'timespent'
            }, {
                xtype: 'textfield',
                itemId: 'assetOfTicket',
                label: 'Asset',
                labelWrap: true,
                readOnly: true,
                name: 'assetSerialNumber'
            }]
        }, {
            xtype: 'container',
            layout: {
                pack: 'center',
                type: 'hbox'
            },
            items: [{
                xtype: 'button',
                id: 'updateTicketBtn',
                ui: 'action',
//                text: i10n.translate("updateBtn", "infoTab")
            }]
        }, ]
    }]
//}
	}
});