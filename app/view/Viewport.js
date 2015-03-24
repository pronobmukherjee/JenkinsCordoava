Ext.define('LoginApp.view.Viewport', {
				extend: 'Ext.Container',
				xtype: 'app_viewport',
                alias:'widget.mainview',
				requires: [
				],
				config: {
								fullscreen: true,
								layout: 'fit',
								items : [{
												xtype : 'main',
												cls: 'slide',
												
												// Needed to fit the whole content
												width: '100%',
                                                height: '100%'
								}, {
												xtype : 'navigation',
												width : 250
								}]
				}
});
