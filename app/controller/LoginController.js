Ext.define('LoginApp.controller.LoginController', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            loginView: 'loginview',
            mainView: 'mainview',
            forgotBtn : 'button[name="forgot_btn"]',
            resetBtn : 'button[name="reset_btn"]'
        },
        control: {
            forgotBtn : {
                tap : 'forgot'
            },	
            resetBtn : {
                tap: 'reset'
            },
            loginView: {
                signInCommand: 'onSignInCommand'
            }
        }
    },

    // Session token

    sessionToken: null,

    // Transitions
    getSlideLeftTransition: function () {
        return { type: 'slide', direction: 'left' };
    },

    getSlideRightTransition: function () {
        return { type: 'slide', direction: 'right' };
    },

    onSignInCommand: function (view, username, password) {

        console.log('Username: ' + username + '\n' + 'Password: ' + password);

        var me = this,
            loginView = me.getLoginView();

        if (username.length === 0 || password.length === 0) {

            loginView.showSignInFailedMessage('Please enter your username and password.');
            return;
        }

        loginView.setMasked({
            xtype: 'loadmask',
            message: 'Signing In...'
        });

        Ext.data.JsonP.request({
            url: 'http://demo5532567.mockable.io/login',
            callbackKey:'callback',
            method:'POST',
            params: {
                user: username,
                pwd: password,
            },
            success: function (result,request) {

                var loginResponse = result;

                if (loginResponse) {
                    // The server will send a token that can be used throughout the app to confirm that the user is authenticated.
                    me.sessionToken = loginResponse.sessionToken;
                    console.log('success1='+result.dummy);
                    var parsed = Ext.encode(result);
                     console.log("parsed"+parsed);
                    me.signInSuccess();     //Just simulating success.
                } else {
                    me.signInFailure(loginResponse.message);
                }
            },
            failure: function (response) {
                me.sessionToken = null;
                me.signInFailure('Login failed. Please try again later.');
            },
            callback: function(result) {
                console.log('success callback ='+result);
                var parsed = Ext.decode(result);
                     console.log("parsed"+parsed);
             }
        });
    },

    signInSuccess: function () {
        console.log('After Signed in.');
        var loginView = this.getLoginView();
        mainView = this.getMainView();
        loginView.setMasked(false);

        Ext.Viewport.animateActiveItem(mainView, this.getSlideLeftTransition());
    },

    singInFailure: function (message) {
        var loginView = this.getLoginView();
        loginView.showSignInFailedMessage(message);
        loginView.setMasked(false);
    },
    
    forgot: function () {
        alert('Forgot Password');
    },
    
    reset: function () {
        alert('Reset Password');
    }
});