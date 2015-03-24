Ext.define('LoginApp.controller.HomePageController', {
    extend: 'Ext.app.Controller',
    config:{
        refs:{
                        main : 'main',
                        loginView: 'loginview',
                        navigation : 'navigation',
                        mainDisplayView: 'main container',
                        navBtn : 'button[name="nav_btn"]',
                       logoutBtn : 'button[name="logout_btn"]'
        },

        control : {
            main: {
                initialize: 'onMainContainerViewInit'
            },
            navBtn : {
                            tap : 'toggleNav'
            },	
            logoutBtn : {
                            tap: 'onSignOffCommand'
            },
            navigation : {
                itemtap : function(list, index, target, record){
                        this.toggleNav();
                        if (this.selectedIndex !== index) {
                        this.selectedIndex = index;
                        var mainDisplayView = this.getMainDisplayView();

                        mainDisplayView.removeAt(0);
                        if(record.get('menuitem') === LoginApp.constants.Constants.NewBookings)
                        {
                            mainDisplayView.add({
                                xtype: 'navigationview',
                                navigationBar: null,

                                items: [{
                                    xtype: 'newbookingview'
                                }]
                            });
                        }
                        else
                        if(record.get('menuitem') === LoginApp.constants.Constants.AddressBook)
                        {
                            mainDisplayView.add({
                            xtype: 'navigationview',
                            navigationBar: null,

                                items: [{
                                    xtype: 'AddressView'
                                }]
                             });
                        }
                        else
                        if(record.get('menuitem') === LoginApp.constants.Constants.RideShare)
                        {
                            mainDisplayView.add({
                            xtype: 'navigationview',
                            navigationBar: null,

                                items: [{
                                    xtype: 'rideshareview'
                                }]
                             });
                        }
                        else
                        if(record.get('menuitem') === LoginApp.constants.Constants.Profile)
                        {
                            mainDisplayView.add({
                            xtype: 'navigationview',
                            navigationBar: null,

                                items: [{
                                    xtype: 'profileview'
                                }]
                             });
                        }
                        else
                        if(record.get('menuitem') === LoginApp.constants.Constants.EditCancel)
                        {
                            mainDisplayView.add({
                            xtype: 'navigationview',
                            navigationBar: null,

                                items: [{
                                    xtype: 'editcancelbookingview'
                                }]
                             });
                        }
                    }
                }
            }
        }
    },
				// Transitions
    getSlideLeftTransition: function () {
        return { type: 'slide', direction: 'left' };
    },

    getSlideRightTransition: function () {
        return { type: 'slide', direction: 'right' };
    },
    /**
     * Toggle the slide navogation view
     */
    toggleNav : function(){
                    var me = this,
                    mainEl = me.getMain().element;

                    if (mainEl.hasCls('out')) {
                                    mainEl.removeCls('out').addCls('in'); 
                                    me.getMain().setMasked(false);
                    } else {
                                    mainEl.removeCls('in').addCls('out');  
                                    me.getMain().setMasked(true);
                    }
    },
    onMainContainerViewInit: function() {
//        alert('here');
        // We will setup the defaul view here
        var navigation = this.getNavigation(),
            record = navigation.getAt(0);
        navigation.select(0);

        // You can just add panel view if there's no need to use navigation view
        this.getMainDisplayView().add({
            xtype: 'navigationview',
            navigationBar: null,

            items: [{
                xtype: 'newbookingview'
            }]
        });
    },
    onSignOffCommand: function () {
//        alert('onSignOffCommand');
    var me = this;

    Ext.data.JsonP.request({
        url: 'http://demo5532567.mockable.io/login',
        callbackKey:'callback',
        params: {
            sessionToken: me.sessionToken
        },
        success: function (response) {

            // TODO: You need to handle this condition.
        },
        failure: function (response) {

            // TODO: You need to handle this condition.
        },
        callback: function(result) {
//                alert('success');
         }
    });

        Ext.Viewport.animateActiveItem(this.getLoginView(), this.getSlideRightTransition());
    }
});    