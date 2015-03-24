Ext.define('LoginApp.controller.NewBookingController', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            newBookingView:'newbookingview',
            addressPanelView: 'panel[name="AddressPanel"]',
//            radioField:'radiofield',
            addStopBtn : 'button[name="additionalStops_btn"]',
            getQuoteBtn : 'button[name="getQuote_btn"]',
            segmentedButton: 'segmentedbutton'
        },
        control:{
            newbookingview:{
                initialize:'reloadViews'
            },
//            radioField:{
//                check:'addAddressPanels'
//            },
            addStopBtn : {
                tap : 'addAddionalStop'
            },	
            getQuoteBtn : {
                tap: 'getQuotation'
            },
            segmentedButton : {
                toggle : 'segAddAdressPanels'
            }
        }
    },
    
    reloadViews:function(){
        //Populate Country
        var newbookingview = this.getNewBookingView();
        var vehicleTypeField = newbookingview.down('#VehicleType');
        var store = Ext.getStore('VehicleTypeByBrand');
        store.load();
        vehicleTypeField.setStore(store);
        //debug check
//        console.log('direction='+newbookingview.getScrollable().getScroller().getDirection());
//        newbookingview.getScrollable().getScroller().setDisabled(false);
//        console.log('disabled='+newbookingview.getScrollable().getScroller().getDisabled());
//        console.log('lock='+newbookingview.getScrollable().getScroller().getDirectionLock());
        var maxcount = 2;
        for(var i=0; i < maxcount ; i++)
        {
            //On init Transfer is selected always
            var Address = 'Address '+(i+1);
            this.getAddressPanelView().add({
                xtype: 'panel',
                layout: {
                    type: 'vbox'
                },
                items:[
                    {
                        xtype: 'label',
                        html: Address,
                        style: 'color:#000000;margin:10px 10px;'	
                    },
                    {
                        xtype:'addressview'
                    }
                ]
            });
        }
    },
    
//    addAddressPanels:function(){
//        //Add address panels based on ride type
//        var radiofield = Ext.ComponentQuery.query('radiofield[name=RideType]');
//        console.log("Device Name = " + Ext.os.name);
//        console.log('Selected Type', radiofield[0].getGroupValue());
//        //Additional stops are for Transfer type else its hidden
//        var btn = this.getAddStopBtn();
//        if(radiofield[0].getGroupValue() === LoginApp.constants.Constants.Transfer)
//        {
//           btn.show();
//        }
//        else{
//             btn.hide();
//        }
//        //Additional stops are for Transfer type else its hidden
//        var maxcount = 1;
//        if(radiofield[0].getGroupValue() === LoginApp.constants.Constants.Transfer || radiofield[0].getGroupValue() === LoginApp.constants.Constants.WaitReturn)
//        {
//            maxcount =2;
//        }
//        //first clear panel
//        this.getAddressPanelView().removeAll();
//        for(var i=0; i < maxcount ; i++)
//        {
//            //On init Transfer is selected always
//            var Address = 'Address '+(i+1);
//            this.getAddressPanelView().add({
//                xtype: 'panel',
//                layout: {
//                    type: 'vbox'
//                },
//                items:[
//                    {
//                        xtype: 'label',
//                        html: Address,
//                        style: 'color:#000000;margin:10px 10px;'	
//                    },
//                    {
//                        xtype:'addressview'
//                    }
//                ]
//            });
//        }
//    },
    
    addAddionalStop:function(){
        var currentAddressCount = this.getAddressPanelView().getItems().length;
        console.log('count='+currentAddressCount);
        //upto 3 addtional stops allowed
        if(currentAddressCount < 5)
        {
            var Address = 'Address '+(currentAddressCount+1);
            console.log('Adding='+Address);
            this.getAddressPanelView().add({
                xtype: 'panel',
                layout: {
                    type: 'vbox'
                },
                items:[
                    {
                        xtype: 'label',
                        html: Address,
                        style: 'color:#000000;margin:10px 10px;'	
                    },
                    {
                        xtype:'addressview'
                    }
                ]
            });
        }
        //check after adding if its equal to 5 then disable the add button
        currentAddressCount = this.getAddressPanelView().getItems().length;
        if(currentAddressCount == 5)
        {
            var btn = this.getAddStopBtn();
            btn.disable();
        }
    },

    getQuotation:function(){
    },
    
    segAddAdressPanels:function(segmentedbutton, button, isPressed, eOpts){
        //Add address panels based on ride type
        console.log("button Name = " + button.getText()+' pressed = '+isPressed);
        console.log("Device Name = " + Ext.os.name);
        //Additional stops are for Transfer type else its hidden
        var btn = this.getAddStopBtn();
        if(button.getText() === LoginApp.constants.Constants.Transfer && isPressed)
        {
           btn.show();
        }
        else{
             btn.hide();
        }
        //Additional stops are for Transfer type else its hidden
        var maxcount = 1;
        if((button.getText() === LoginApp.constants.Constants.Transfer && isPressed) || (button.getText() === LoginApp.constants.Constants.WaitReturn && isPressed))
        {
            maxcount =2;
        }
        //first clear panel
        this.getAddressPanelView().removeAll();
        for(var i=0; i < maxcount ; i++)
        {
            //On init Transfer is selected always
            var Address = 'Address '+(i+1);
            this.getAddressPanelView().add({
                xtype: 'panel',
                layout: {
                    type: 'vbox'
                },
                items:[
                    {
                        xtype: 'label',
                        html: Address,
                        style: 'color:#000000;margin:10px 10px;'	
                    },
                    {
                        xtype:'addressview'
                    }
                ]
            });
        }
    }
});