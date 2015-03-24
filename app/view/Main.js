Ext.define('LoginApp.view.Main', {
    extend: 'Ext.Container',
    xtype: 'main',
    config: {
    	layout: 'fit',

    	// shadow for the left edge
        style: 'box-shadow: rgba(0, 0, 0, 0.8) 0 0.2em 0.6em;',

        /* 
         * This is the main view used to switch view or add view 
         * when selecting from sidebar menu 
         */
        items: [{
            xtype: 'container',
            layout: 'fit',
            cls: 'main-display-view'
        }]
    }
});
