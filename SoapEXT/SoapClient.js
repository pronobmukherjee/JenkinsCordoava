function SOAPClientParameters()
{
	var _pl = new Array();
	this.add = function(name, value) 
	{
		_pl[name] = value; 
		return this; 
	}
	this.toXml = function(ns)
	{
		var xml = "";
		for(var p in _pl)
		{
			switch(typeof(_pl[p])) 
			{
                case "string":
                case "number":
                case "boolean":
                case "object":
                    xml += "<ns1:" + p + ">" + SOAPClientParameters._serialize(_pl[p], ns) + "</ns1:" + p + ">";
                    break;
                default:
                    break;
            }
		}
		return xml;	
	}
}
SOAPClientParameters._serialize = function(o, ns)
{
    var s = "";
    switch(typeof(o))
    {
        case "string":
            s += o.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); break;
        case "number":
        case "boolean":
            s += o.toString(); break;
        case "object":
            // Date
            if(o.constructor.toString().indexOf("function Date()") > -1)
            {
        
                var year = o.getFullYear().toString();
                var month = (o.getMonth() + 1).toString(); month = (month.length == 1) ? "0" + month : month;
                var date = o.getDate().toString(); date = (date.length == 1) ? "0" + date : date;
                var hours = o.getHours().toString(); hours = (hours.length == 1) ? "0" + hours : hours;
                var minutes = o.getMinutes().toString(); minutes = (minutes.length == 1) ? "0" + minutes : minutes;
                var seconds = o.getSeconds().toString(); seconds = (seconds.length == 1) ? "0" + seconds : seconds;
                var milliseconds = o.getMilliseconds().toString();
                var tzminutes = Math.abs(o.getTimezoneOffset());
                var tzhours = 0;
                while(tzminutes >= 60)
                {
                    tzhours++;
                    tzminutes -= 60;
                }
                tzminutes = (tzminutes.toString().length == 1) ? "0" + tzminutes.toString() : tzminutes.toString();
                tzhours = (tzhours.toString().length == 1) ? "0" + tzhours.toString() : tzhours.toString();
                var timezone = ((o.getTimezoneOffset() < 0) ? "+" : "-") + tzhours + ":" + tzminutes;
                s += year + "-" + month + "-" + date + "T" + hours + ":" + minutes + ":" + seconds + "." + milliseconds + timezone;
            }
            // Array
            else if(o.constructor.toString().indexOf("function Array()") > -1)
            {
                for(var p in o)
                {
                    if(!isNaN(p))   // linear array
                    {
                        (/function\s+(\w*)\s*\(/ig).exec(o[p].constructor.toString());
                        var type = RegExp.$1;
                        switch(type)
                        {
                            case "":
                                type = typeof(o[p]);
                            case "String":
                                type = "string"; break;
                            case "Number":
                                type = "int"; break;
                            case "Boolean":
                                type = "bool"; break;
                            case "Date":
                                type = "DateTime"; break;
                        }
                        s += "<ns2:" + type + " xmlns:ns2=\""+ns+"\">" + SOAPClientParameters._serialize(o[p], ns) + "</ns2:" + type + ">"
                    }
                    else    // associative array
                        s += "<ns2:" + p + " xmlns:ns2=\""+ns+"\">" + SOAPClientParameters._serialize(o[p], ns) + "</ns2:" + p + ">"
                }
            }
            // Object or custom function
            else
                for(var p in o)
                    s += "<ns2:" + p + " xmlns:ns2=\""+ns+"\">" + SOAPClientParameters._serialize(o[p], ns) + "</ns2:" + p + ">";
            break;
        default:
            break; // throw new Error(500, "SOAPClientParameters: type '" + typeof(o) + "' is not supported");
    }
    return s;
}


function SoapClient(url, method, parameters, async, callback, scope, arg) {
	this.url = url;
	this.method = method;
	this.parameters = parameters;
	this.async = async;
	this.callback = callback;
	this.scope = scope || this;
	this.arg = arg || null;
}

SoapClient._cacheWsdl = new Array(); //static

SoapClient.prototype.invoke = function() {
	if(this.async)
		this._loadWsdl();
	else
		return this._loadWsdl();
}

SoapClient.prototype._loadWsdl = function() {
	// load from cache?
	var wsdl = SoapClient._cacheWsdl[this.url];
	if(wsdl + "" != "" && wsdl + "" != "undefined") {
		this.wsdl = wsdl;
		return this._sendSoapRequest();
	}
	// get wsdl
	var xmlHttp = SoapClient._getXmlHttp();
	xmlHttp.open("GET", this.url + "?wsdl", this.async);
	if(this.async) {
		var that = this;
		xmlHttp.onreadystatechange = function() {
			if(xmlHttp.readyState == 4)
				that._onLoadWsdl(xmlHttp);
		}
	}
	xmlHttp.send(null);
	if (!this.async)
		return this._onLoadWsdl(xmlHttp);
}

SoapClient.prototype._onLoadWsdl = function(req) {
	var wsdl = req.responseXML;
	this.wsdl = wsdl;
	SoapClient._cacheWsdl[this.url] = wsdl;	// save a copy in cache
	return this._sendSoapRequest();
}

SoapClient.prototype._sendSoapRequest = function() {
	var wsdl = this.wsdl;
	// get namespace
	var ns = (wsdl.documentElement.attributes["targetNamespace"] + "" == "undefined") ? wsdl.documentElement.attributes.getNamedItem("targetNamespace").nodeValue : wsdl.documentElement.attributes["targetNamespace"].value;
	var ns2 = wsdl.getElementsByTagName("schema")[0].getAttribute("targetNamespace");
	// build SOAP request
	var sr = 	"<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
				"<soap:Envelope " +
				"xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" " +
				"xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" " +
				"xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">" +
				"<soap:Body>" +
				"<ns1:" + this.method + " xmlns:ns1=\"" + ns + "\">" +
				this.parameters.toXml(ns2) +
				"</ns1:" + this.method + "></soap:Body></soap:Envelope>";
	// send request
	var xmlHttp = SoapClient._getXmlHttp();
	/* not implemented */
	if (SoapClient.userName && SoapClient.password){
		xmlHttp.open("POST", url, async, SoapClient.userName, SoapClient.password);
		// Some WS implementations (i.e. BEA WebLogic Server 10.0 JAX-WS) don't support Challenge/Response HTTP BASIC, so we send authorization headers in the first request
		xmlHttp.setRequestHeader("Authorization", "Basic " + SoapClient_toBase64(SoapClientuserName + ":" + SoapClientpassword));
	}
	/* end of not implemented */
	else
		xmlHttp.open("POST", this.url, this.async);
	var soapaction = ((ns.lastIndexOf("/") != ns.length - 1) ? ns + "/" : ns) + this.method;
	xmlHttp.setRequestHeader("SOAPAction", soapaction);
	xmlHttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	if(this.async) {
		var that = this;
		xmlHttp.onreadystatechange = function() {
			if(xmlHttp.readyState == 4)
				that._onSendSoapRequest(xmlHttp);
		}
	}
	xmlHttp.send(sr);
	if (!this.async)
		return this._onSendSoapRequest(xmlHttp);
}

SoapClient.prototype._onSendSoapRequest = function(req) {
	var wsdl = this.wsdl;
	var o = null;
	var nd = SoapClient._getElementsByTagName(req.responseXML, this.method + "Response");
	if(nd.length == 0)
		nd = SoapClient._getElementsByTagName(req.responseXML, "return");	// PHP web Service?
	if(nd.length == 0)
	{
		if(req.responseXML.getElementsByTagName("faultcode").length > 0)
		{
		    if(this.async || this.callback)
		        o = new Error(500, req.responseXML.getElementsByTagName("faultstring")[0].childNodes[0].nodeValue);
			else
			    throw new Error(500, req.responseXML.getElementsByTagName("faultstring")[0].childNodes[0].nodeValue);			
		}
	}
	else
		o = this._soapresult2object(nd[0]);
	if(this.callback)
		Ext.callback(this.callback, this.scope, [this.arg, true, o]);
	if(!this.async)
		return o;
}

SoapClient.prototype._soapresult2object = function(node) {
	var wsdl = this.wsdl;
	this.wsdlTypes = this._getTypesFromWsdl(); 
    return this._node2object(node);
}
SoapClient.prototype._node2object = function(node) {
	wsdlTypes = this.wsdlTypes
	// null node
	if(node == null)
		return null;
	// text node
	if(node.nodeType == 3 || node.nodeType == 4)
		return this._extractValue(node);
	// leaf node
	if (node.childNodes.length == 1 && (node.childNodes[0].nodeType == 3 || node.childNodes[0].nodeType == 4))
		return this._node2object(node.childNodes[0]);
	var isarray = this._getTypeFromWsdl(node.nodeName.substring(node.nodeName.indexOf(":")+1)).toLowerCase().indexOf("arrayof") != -1;
	// object node
	if(!isarray)
	{
		var obj = null;
		if(node.hasChildNodes())
			obj = new Object();
		for(var i = 0; i < node.childNodes.length; i++)
		{
			var p = this._node2object(node.childNodes[i]);
			obj[node.childNodes[i].nodeName.substring(node.childNodes[i].nodeName.indexOf(":")+1)] = p;
		}
		return obj;
	}
	// list node
	else
	{
		// create node ref
		var l = new Array();
		for(var i = 0; i < node.childNodes.length; i++)
			l[l.length] = this._node2object(node.childNodes[i]);
		return l;
	}
	return null;
}
SoapClient.prototype._extractValue = function(node) {
	var wsdlTypes = this.wsdlTypes;
	var value = node.nodeValue;
	switch(this._getTypeFromWsdl(node.nodeName.substring(node.nodeName.indexOf(":")+1)).toLowerCase())
	{
		default:
		case "s:string":			
			return (value != null) ? value + "" : "";
		case "s:boolean":
			return value + "" == "true";
		case "s:int":
		case "s:long":
			return (value != null) ? parseInt(value + "", 10) : 0;
		case "s:double":
			return (value != null) ? parseFloat(value + "") : 0;
		case "s:datetime":
			if(value == null)
				return null;
			else
			{
				value = value + "";
				value = value.substring(0, (value.lastIndexOf(".") == -1 ? value.length : value.lastIndexOf(".")));
				value = value.replace(/T/gi," ");
				value = value.replace(/-/gi,"/");
				var d = new Date();
				d.setTime(Date.parse(value));										
				return d;				
			}
	}
}
SoapClient.prototype._getTypesFromWsdl = function() {
	var wsdl = this.wsdl;
	var wsdlTypes = new Array();
	// IE
	var ell = wsdl.getElementsByTagName("s:element");	
	var useNamedItem = true;
	// MOZ
	if(ell.length == 0)
	{
		ell = wsdl.getElementsByTagName("element");	     
		useNamedItem = false;
	}
	for(var i = 0; i < ell.length; i++)
	{
		if(useNamedItem)
		{
			if(ell[i].attributes.getNamedItem("name") != null && ell[i].attributes.getNamedItem("type") != null) 
				wsdlTypes[ell[i].attributes.getNamedItem("name").nodeValue] = ell[i].attributes.getNamedItem("type").nodeValue;
		}	
		else
		{
			if(ell[i].attributes["name"] != null && ell[i].attributes["type"] != null)
				wsdlTypes[ell[i].attributes["name"].value] = ell[i].attributes["type"].value;
		}
	}
	return wsdlTypes;
}
SoapClient.prototype._getTypeFromWsdl = function(elementname) {
	var wsdlTypes = this.wsdlTypes;
    var type = wsdlTypes[elementname] + "";
    return (type == "undefined") ? "" : type;
}



/* Static method */


// private: utils
SoapClient._getElementsByTagName = function(document, tagName) {
	try {
		// trying to get node omitting any namespaces (latest versions of MSXML.XMLDocument)
		return document.selectNodes(".//*[local-name()=\""+ tagName +"\"]");
	}
	catch (ex) {}
	// old XML parser support
	return document.getElementsByTagName(tagName);
}
// private: xmlhttp factory
SoapClient._getXmlHttp = function() {
	try
	{
		if(window.XMLHttpRequest) 
		{
			var req = new XMLHttpRequest();
			// some versions of Moz do not support the readyState property and the onreadystate event so we patch it!
			if(req.readyState == null) 
			{
				req.readyState = 1;
				req.addEventListener("load", 
									function() 
									{
										req.readyState = 4;
										if(typeof req.onreadystatechange == "function")
											req.onreadystatechange();
									},
									false);
			}
			return req;
		}
		if(window.ActiveXObject) 
			return new ActiveXObject(SoapClient_getXmlHttpProgID());
	}
	catch (ex) {}
	throw new Error("Your browser does not support XmlHttp objects");
}

SoapClient._getXmlHttpProgID = function()
{
	if(SOAPClient._getXmlHttpProgID.progid)
		return SOAPClient._getXmlHttpProgID.progid;
	var progids = ["Msxml2.XMLHTTP.5.0", "Msxml2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
	var o;
	for(var i = 0; i < progids.length; i++)
	{
		try
		{
			o = new ActiveXObject(progids[i]);
			return SOAPClient._getXmlHttpProgID.progid = progids[i];
		}
		catch (ex) {};
	}
	throw new Error("Could not find an installed XML parser");
}

SoapClient._toBase64 = function(input)
{
	var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var output = "";
	var chr1, chr2, chr3;
	var enc1, enc2, enc3, enc4;
	var i = 0;

	do {
		chr1 = input.charCodeAt(i++);
		chr2 = input.charCodeAt(i++);
		chr3 = input.charCodeAt(i++);

		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;

		if (isNaN(chr2)) {
			enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
			enc4 = 64;
		}

		output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) +
		keyStr.charAt(enc3) + keyStr.charAt(enc4);
	} while (i < input.length);

	return output;
}
