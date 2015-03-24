Ext.define('LoginApp.view.LoginView',{
	extend: 'Ext.form.Panel',
	alias: "widget.loginview",
	requires:['Ext.form.FieldSet','Ext.form.Password','Ext.Label','Ext.Img','Ext.util.DelayedTask'],
	config:{
		title:'Login',
		border:	10,
		items:[
			{
				xtype:'image',
				src:'resources/images/logo.gif',
				style:'width:100%;height:50px;margin:20px 0px 30px 0px;'			
			},
			{
				xtype: 'label',
			    html: 'Login failed. Please enter the correct credentials.',
			    itemId: 'signInFailedLabel',
			    hidden: true,
			    hideAnimation: 'fadeOut',
			    showAnimation: 'fadeIn',
			    style: 'color:#990000;margin:10px 10px;'	
			},
			{
			    xtype: 'fieldset',
			    style: 'margin:60px 10px 10px 10px;',
			    items: [
			        {
			            xtype: 'textfield',
			            placeHolder: 'Username',
			            itemId: 'userNameTextField',
			            name: 'userNameTextField',
			            required: true
			        },
			        {
			            xtype: 'passwordfield',
			            placeHolder: 'Password',
			            itemId: 'passwordTextField',
			            name: 'passwordTextField',
			            required: true
			        }
			    ]
			},
			{
				xtype: 'button',
			    itemId: 'logInButton',
                name:'login_btn',
			    ui: 'action',
			    padding: '10px',
			    style:'width:50%;margin:auto;',
			    text: 'Login'
			},
			{
				layout: {
					type: 'hbox',
					pack:'center'
				},
				items: [
				{
					xtype: 'button',
			    	itemId: 'forgotButton',
                    name:'forgot_btn',
			   		ui: 'action',
			    	style:'width:42%;margin:8px;font-size:14px;',
			    	text: 'Forgot Password?'
				}, 
				{
					xtype: 'button',
				    itemId: 'resetButton',
                    name:'reset_btn',
				    ui: 'action',
				    style:'width:42%;margin:8px;font-size:14px;',
				    text: 'Reset Password?'
				}]
			}
		],
		listeners: [{
		    delegate: '#logInButton',
		    event: 'tap',
		    fn: 'onLogInButtonTap'
		}]
	},
	onLogInButtonTap: function () {

	    var me = this;

	    var usernameField = me.down('#userNameTextField'),
	        passwordField = me.down('#passwordTextField'),
	        label = me.down('#signInFailedLabel');

	    label.hide();

	    var username = usernameField.getValue(),
	        password = passwordField.getValue();

	    // Using a delayed task in order to give the hide animation above
	    // time to finish before executing the next steps.
	    var task = Ext.create('Ext.util.DelayedTask', function () {

	        label.setHtml('');

	        me.fireEvent('signInCommand', me, username, password);

	        usernameField.setValue('');
	        passwordField.setValue('');
	    });

	    task.delay(1);
	},
    showSignInFailedMessage: function (message) {
        var label = this.down('#signInFailedLabel');
        label.setHtml(message);
        label.show();
    }

});