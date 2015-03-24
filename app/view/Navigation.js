Ext.define('LoginApp.view.Navigation', {
    extend: 'Ext.List',
    xtype: 'navigation',
    requires : ['Ext.data.Store'],
    config: {
        cls : 'nav-list',
        data: [
          {menuitem: 'New Bookings'},
          {menuitem: 'Edit/Cancel Bookings'},
          {menuitem: 'Ride Share'},
          {menuitem: 'Address Book'},
          {menuitem: 'Profile'}
        ],
        itemTpl: '{menuitem}'
    }
});