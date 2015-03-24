/**
 * @aside guide forms
 *
 * This is a specialized field which shows a {@linkLoginApp.ux.picker.DateTime} when tapped. If it has a predefined value,
 * or a value is selected in the {@linkLoginApp.ux.picker.DateTime}, it will be displayed like a normal {@link Ext.field.Text}
 * (but not selectable/changable).
 *
 *     Ext.create('Ext.ux.field.DateTimePicker', {
 *         label: 'Birthday',
 *         value: new Date()
 *     });
 *
 * {@link Ext.ux.field.DateTimePicker} fields are very simple to implement, and have no required configurations.
 *
 * ## Examples
 *
 * It can be very useful to set a default {@link #value} configuration on {@link Ext.ux.field.DateTimePicker} fields. In
 * this example, we set the {@link #value} to be the current date. You can also use the {@link #setValue} method to
 * update the value at any time.
 *
 *     @example miniphone preview
 *     Ext.create('Ext.form.Panel', {
 *         fullscreen: true,
 *         items: [
 *             {
 *                 xtype: 'fieldset',
 *                 items: [
 *                     {
 *                         xtype: 'datetimepickerfield',
 *                         label: 'Birthday',
 *                         name: 'birthday',
 *                         value: new Date()
 *                     }
 *                 ]
 *             },
 *             {
 *                 xtype: 'toolbar',
 *                 docked: 'bottom',
 *                 items: [
 *                     { xtype: 'spacer' },
 *                     {
 *                         text: 'setValue',
 *                         handler: function() {
 *                             var datetimepickerfield = Ext.ComponentQuery.query('datetimepickerfield')[0];
 *
 *                             var randomNumber = function(from, to) {
 *                                 return Math.floor(Math.random() * (to - from + 1) + from);
 *                             };
 *
 *                             datetimepickerfield.setValue({
 *                                 month: randomNumber(0, 11),
 *                                 day  : randomNumber(0, 28),
 *                                 year : randomNumber(1980, 2011)
 *                             });
 *                         }
 *                     },
 *                     { xtype: 'spacer' }
 *                 ]
 *             }
 *         ]
 *     });
 *
 * When you need to retrieve the date from the {@link Ext.ux.field.DateTimePicker}, you can either use the {@link #getValue} or
 * {@link #getFormattedValue} methods:
 *
 *     @example preview
 *     Ext.create('Ext.form.Panel', {
 *         fullscreen: true,
 *         items: [
 *             {
 *                 xtype: 'fieldset',
 *                 items: [
 *                     {
 *                         xtype: 'datetimepickerfield',
 *                         label: 'Birthday',
 *                         name: 'birthday',
 *                         value: new Date()
 *                     }
 *                 ]
 *             },
 *             {
 *                 xtype: 'toolbar',
 *                 docked: 'bottom',
 *                 items: [
 *                     {
 *                         text: 'getValue',
 *                         handler: function() {
 *                             var datetimepickerfield = Ext.ComponentQuery.query('datetimepickerfield')[0];
 *                             Ext.Msg.alert(null, datetimepickerfield.getValue());
 *                         }
 *                     },
 *                     { xtype: 'spacer' },
 *                     {
 *                         text: 'getFormattedValue',
 *                         handler: function() {
 *                             var datetimepickerfield = Ext.ComponentQuery.query('datetimepickerfield')[0];
 *                             Ext.Msg.alert(null, datetimepickerfield.getFormattedValue());
 *                         }
 *                     }
 *                 ]
 *             }
 *         ]
 *     });
 *
 *
 */

Ext.define('LoginApp.ux.field.DateTimePicker', {
    extend: 'Ext.field.Text',
    alternateClassName: 'Ext.form.DateTimePicker',
    xtype: 'datetimepickerfield',
    requires: [
        'LoginApp.ux.picker.DateTime',
        'Ext.DateExtras'
    ],

    /**
 11     * @event change
 12     * Fires when a date is selected
 13     * @param {Ext.field.DatePicker} this
 14     * @param {Date} newDate The new date
 15     * @param {Date} oldDate The old date
 16     */
  
      config: {
          ui: 'select',
  
          /**
 22         * @cfg {Object/ux.TimePicker} picker
 23         * An object that is used when creating the internal {@link ux.TimePicker} component or a direct instance of {@link ux.TimePicker}.
 24         * @accessor
 25         */
          picker: true,
  
          /**
 29         * @cfg {Boolean}
 30         * @hide
 31         * @accessor
 32         */
          clearIcon: false,
  
          /**
 36         * @cfg {Object/Date} value
 37         * Default value for the field and the internal {@link ux.TimePicker} component. Accepts an object of 'year',
 38         * 'month' and 'day' values, all of which should be numbers, or a {@link Date}.
 39         *
 40         * Example: {year: 1989, day: 1, month: 5} = 1st May 1989 or new Date()
 41         * @accessor
 42         */
  
  
          /**
 46         * @cfg {Boolean} destroyPickerOnHide
 47         * Completed choose to hide or destroy the controls, the default destruction
 48         * @accessor
 49         */
          destroyPickerOnHide: false,
  
          /**
 53         * @cfg {String} The dateFormat default time format
 54         * Accept any valid time format. Please refer to {@link Ext.Date}.
 55         */
          dateFormat: 'Y-m-d H:i',
  
          /**
 59         * @cfg {Object}
 60         * @hide

          */
          component: {
              useMask: true
          }
      },
  
      initialize: function () {
          var me = this,
              component = me.getComponent();
  
          me.callParent();
  
          component.on({
              scope: me,
              masktap: 'onMaskTap'
          });
  
  
          component.doMaskTap = Ext.emptyFn;
  
          if (Ext.browser.is.AndroidStock2) {
              component.input.dom.disabled = true;
          }
      },
  
      syncEmptyCls: Ext.emptyFn,
  
      applyValue: function (value) {
          if (!Ext.isDate(value) && !Ext.isObject(value)) {
              return null;
          }
  
          if (Ext.isObject(value)) {
              return new Date(value.year, value.month - 1, value.day, value.hour, value.minute);
          }
  
          return value;
      },
  
     updateValue: function (newValue, oldValue) {
         var me = this,
             picker = me._picker;
 
         if (picker && picker.isPicker) {
             picker.setValue(newValue);
         }
 
         // Ext.Date.format expects a Date
         if (newValue !== null) {
             me.getComponent().setValue(Ext.Date.format(newValue, me.getDateFormat() || Ext.util.Format.defaultDateFormat));
         } else {
             me.getComponent().setValue('');
         }
 
         if (newValue !== oldValue) {
             me.fireEvent('change', me, newValue, oldValue);
         }
     },
 
     /**
121     * Updates the date format in the field.
122     * @private
123     */
     updateDateFormat: function (newDateFormat, oldDateFormat) {
         var value = this.getValue();
         if (newDateFormat != oldDateFormat && Ext.isDate(value)) {
             this.getComponent().setValue(Ext.Date.format(value, newDateFormat || Ext.util.Format.defaultDateFormat));
         }
     },
 
     /**
132     * Returns the {@link Date} value of this field.
133     * If you wanted a formated date
134     * @return {Date} The date selected
135     */
     getValue: function () {
         if (this._picker && this._picker instanceof LoginApp.ux.picker.DateTime) {
             return this._picker.getValue();
         }
         return this._value;
     },
 
     /**
     * Returns the value of the field formatted using the specified format. If it is not specified, it will default to
     * {@link #dateFormat} and then {@link Ext.util.Format#defaultDateFormat}.
     * @param {String} format The format to be returned.
     * @return {String} The formatted date.
     */
     getFormattedValue: function (format) {
         var value = this.getValue();
         return (Ext.isDate(value)) ? Ext.Date.format(value, format || this.getDateFormat() || Ext.util.Format.defaultDateFormat) : value;
     },
 
     applyPicker: function (picker, pickerInstance) {
         if (pickerInstance && pickerInstance.isPicker) {
             picker = pickerInstance.setConfig(picker);
         }
 
         return picker;
     },
 
     getPicker: function () {
         var picker = this._picker,
             value = this.getValue();
 
         if (picker && !picker.isPicker) {
             picker = Ext.factory(picker, LoginApp.ux.picker.DateTime);
             if (value != null) {
                 picker.setValue(value);
             }
         }
 
         picker.on({
             scope: this,
             change: 'onPickerChange',
             hide: 'onPickerHide'
         });
 
         this._picker = picker;
 
         return picker;
     },
 
     /**
     * @private
     * Listener to the tap event of the mask element. Shows the internal DatePicker component when the button has been tapped.
     */
     onMaskTap: function () {
         if (this.getDisabled()) {
             return false;
         }
 
         this.onFocus();
 
         return false;
     },
 
     /**
     * Called when the picker changes its value.
     * @param {ux.TimePicker} picker The date picker.
     * @param {Object} value The new value from the date picker.
     * @private
     */
     onPickerChange: function (picker, value) {
         var me = this,
             oldValue = me.getValue();
 
         me.setValue(value);
         me.fireEvent('select', me, value);
         me.onChange(me, value, oldValue);
     },
 
     /**
     * Override this or change event will be fired twice. change event is fired in updateValue
     * for this field. TOUCH-2861
     */
     onChange: Ext.emptyFn,
 
     /**
     * Destroys the picker when it is hidden, if
     * {@link Ext.field.DatePicker#destroyPickerOnHide destroyPickerOnHide} is set to `true`.
     * @private
     */
     onPickerHide: function () {
         var me = this,
             picker = me.getPicker();
 
         if (me.getDestroyPickerOnHide() && picker) {
             picker.destroy();
             me._picker = me.getInitialConfig().picker || true;
         }
     },
 
     reset: function () {
         this.setValue(this.originalValue);
     },
 
     onFocus: function (e) {
         var component = this.getComponent();
         this.fireEvent('focus', this, e);
 
         if (Ext.os.is.Android4) {
             component.input.dom.focus();
         }
         component.input.dom.blur();
 
         if (this.getReadOnly()) {
             return false;
         }
 
         this.isFocused = true;
 
         this.getPicker().show();
     },
 
     // @private
     destroy: function () {
         var picker = this._picker;
 
         if (picker && picker.isPicker) {
             picker.destroy();
         }
 
         this.callParent(arguments);
     }
     //<deprecated product=touch since=2.0>
 }, function () {
     this.override({
         getValue: function (format) {
             if (format) {
                 //<debug warn>
                 Ext.Logger.deprecate("format argument of the getValue method is deprecated, please use getFormattedValue instead", this);
                 //</debug>
                 return this.getFormattedValue(format);
             }
             return this.callOverridden();
         }
     });
 
     /**
     * @method getDatePicker
     * @inheritdoc Ext.field.DatePicker#getPicker
     * @deprecated 2.0.0 Please use #getPicker instead
     */
     Ext.deprecateMethod(this, 'getDatePicker', 'getPicker');
     //</deprecated>
 });
