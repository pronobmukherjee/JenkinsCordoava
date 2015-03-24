Ext.define('LoginApp.controller.AddressBookController', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            addressBookView:'addressbookview'
        },
        control:{
            addressBookView:{
                show:'reloadViews'
            }
        }
    },
    reloadViews:function(){
        //Populate Country
        var addressBookView = this.getAddressBookView();
        var countryField = addressBookView.down('#Country');
        var store = Ext.getStore('GSCountries');
        store.load();
        countryField.setStore(store);
    }
});