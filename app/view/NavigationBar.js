Ext.define('LoginApp.view.NavigationBar', {
	extend: 'Ext.Toolbar',
	xtype: 'navigationBar',
	config: {
//		cls: 'nav-bar',
		docked: 'top',
		minHeight: 44,
		items:[
                {
                    name:'logout_btn',
                    iconCls : 'delete',
                    itemId:'logoutButton',
                    docked:'right',
                    ui : 'action'
                },
                {
                    docked : 'left',
                    name : 'nav_btn',
                    iconCls : 'list',
                    ui : 'plain'
                }
            ]
    }
});