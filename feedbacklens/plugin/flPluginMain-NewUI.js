var hostUrl = 'localhost/myfirstrepo/feedbacklens/public/api/';
var domainId;
var myIp = '';
var opSys  = '';
var browser = '';

window.onload = function() {

	$.get("http://ipinfo.io", function(response) {
    	myIp = response.ip;
	}, "jsonp");

	opSys = navigator.platform;
	browser = navigator.appCodeName;
	getPluginProperties('');
}

function loadPlugin(domainIfoJson) {
	
	var pageBody = document.getElementsByTagName('body')[0];
	// Floating button
	var pluginBtn = b();
	pluginBtn.id = 'idPluginBtn';
	pluginBtn.classList.add('flPluginBtn');
	pluginBtn.innerHTML = 'Feedback';
	pageBody.appendChild(pluginBtn);

	// Plugin parent div
	var div1 = d();
	div1.id = 'idFlPluginModal';
	div1.classList.add('flPluginModal');

	// Plugin container div
	var div11 =  d();

	div11.classList.add('flPluginModalContent');
	div11.id ='idFlPluginModalContent';
	
	// Hidden Input text for rate
	
	div1.appendChild(div11);

	// Plugin parent div
	var div2 = d();
	div2.id = 'idFlPluginModalThankUDiv';
	div2.classList.add('flPluginModalContent');

	div2.innerHTML = '<table class="tableContainer" style="border: 1px solid white; border-radius: 4px"><tr><td style="padding:30px;10px;color:#64DD17;font-size: 18px; font-weight: 600; text-align: center" align: center>Thank you for your valuable feedback!!<br><br><button style="border: 1px solid #42A5F5; background-color:#42A5F5;color: white; padding: 5px 10px; border-radius: 4px; font-weight:400; font-size: 13px" id="idFlThankClose">Close</button></td></tr></table>';
	div1.appendChild(div2);

	pageBody.appendChild(div1);


	var outerCont = eId('idFlPluginModalContent');
	outerCont.innerHTML = '<table class="tableContainer"><tr class="headingTR grad"><td class="flHeading" colspan="4">Feedback <span id="idFlPluginClose" class="flCloseBtn">X</span></td></tr><tr><td class="flRateElementTd" colspan="4" align="center"><ul class="flRateElement" id="flRatingUl"></ul></td></tr><tr class="catSection" id="trCats"></tr><tr><td colspan="4" style="padding: 20px 30px"><table class="flInputTable"><tr><td align="center" class="flInputTd"><select class="flPluginInput flSubCategory" id="idFlSubCategory" ></select></td></tr><tr><td class="flInputTd" align="center"><textarea class="flPluginInput" id="idFlComments" rows="5" placeholder="Comments*" maxlength="1000" style="resize: vertical;"></textarea></td></tr><tr><td align="center" class="flInputTd"><input class="flPluginInput flComments" id="idFlEmail" type="email" placeholder="Email (Optional)" maxlength="100"></td></tr></table></td></tr><tr><td class="flInputTd flBtnTd" align="center" colspan="4"><input class="flPluginInput flSubmitButton" type="button" value="Submit" onclick="javascript: flSubmitForm();"style="padding: 8px 5px"></td></tr></table><table class="tableContainer" style="display:none" id="idFlPluginThnkTr"><tr ><td style="padding:30px 15px; color: #64DD17; text-align: center; display: none" colspan="4">Thank you for your valuable feedback!!</td></tr></table>';
	var rateEmailUl = eId('flRatingUl');
	var svgCircle = '';
    for(var i=0; i<5; i++){
        svgCircle = svgCircle.concat('<li><svg height="40" width="40"> <polygon fill="#FFF" points="20,4.061834335327148 24.217514038085938,16.195087432861328 37.06020736694336,16.456802368164062 26.824085235595703,24.217281341552734 30.54378890991211,36.51227951049805 20,29.17526626586914 9.45621109008789,36.51227951049805 13.175914764404297,24.217281341552734 2.939790725708008,16.456802368164062 15.782485961914062,16.195087432861328 20,4.061834335327148 24.217514038085938,16.195087432861328" stroke="#FFD54F" stroke-width="2" stroke-linejoin="round" onclick="setRate(this, '+(i+1)+');" id="idCir'+i+'" class="flCir rateCircles" /></svg></li>');
    }
    rateEmailUl.innerHTML = svgCircle;

    /* Rate hidden input */
    var flTextInputRate = t();
	//flTextInputRate.classList.add('flPluginInput');
	flTextInputRate.type = 'hidden';
	flTextInputRate.id = 'idRate';

	outerCont.appendChild(flTextInputRate);

	/* cat hidden input */
	var flTextHiidenCatIn = t();
	//flTextInputRate.classList.add('flPluginInput');
	flTextHiidenCatIn.type = 'hidden';
	flTextHiidenCatIn.id = 'idFlCategory';

	outerCont.appendChild(flTextHiidenCatIn);


	

	// Binding modal events
	var modal = eId('idFlPluginModal');
	var btn = eId("idPluginBtn");
	var span = eId("idFlPluginClose");
	var thankSpan = eId("idFlThankClose");
		
	btn.onclick = function() {
		
		modal.style.display = "block";
		showThankDiv(false);
		flResetInputs();
	}
		
	span.onclick = function() {
		modal.style.display = "none";
	}

	thankSpan.onclick = function() {
		modal.style.display = "none";
	}
		
	window.onclick = function(event) {
		if (event.target == modal) {
		    modal.style.display = "none";
		}
	}

	// Set Categories and subcategories
	setOptionsToCat(domainIfoJson.pluginconfig.cat);
	setOptionsToSubCat(domainIfoJson.pluginconfig.subcat);
}

function setRate(ev, rate) {
    flToggleRateElement(rate, false);
    eId("idRate").value = rate;
}

function flSubmitForm() {
	if(flIsValidaeInputs()) {
		alert("All Valid");
		postFeedback();
	} else {
		alert("Not Valid");
	}
}

function flGetAllInputElements() {
	var inputValues = {
		selectedRate : eId('idRate'),
		selectedCat : eId('idFlCategory'),
		selectedSubCat : eId('idFlSubCategory'),
		email : eId('idFlEmail'),
		comments : eId('idFlComments')
	}

	return inputValues;
}

function flResetInputs() {

	var inputFields = flGetAllInputElements();

	inputFields.selectedRate.value = '',
	inputFields.selectedCat.value = '',
	inputFields.selectedSubCat.value = '',
	inputFields.email.value = '',
	inputFields.comments.value = '';

    // Second parameter of following function is for check if to reset rate elements or set one selected
	flToggleRateElement(0, true);
	flSelectCat({}, true, 0);
}


function flIsValidaeInputs() {
	var inputFields = flGetAllInputElements();

	if(flIsEmptyField(inputFields.selectedRate)) {
		return false;
	}

	if(flIsEmptyField(inputFields.selectedCat)) {
		return false;
	}

	if(flIsEmptyField(inputFields.selectedSubCat)) {
		return false;
	}

	if(!flIsEmptyField(inputFields.email)) {
		if(!validateEmail(inputFields.email.value))
			return false;
	}

	if(flIsEmptyField(inputFields.comments)) {
		return false;
	}

	return true;

}

function validateEmail(mail)   
{  
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))  
	    return true;
	else
	    return false;
} 

function flIsEmptyField(element) {
	if(element.value == '' || element.value.length == 0)
		return true;
	else
		return false;
}

function flToggleRateElement(rate, isReset) {
	var x = document.getElementsByClassName("rateCircles");
            
    if(isReset){
       		for(var i=0; i<x.length; i++){
       			x[i].classList.remove('flClsBlue');
       		}
       } else {    	
	       for(var i=0; i<x.length; i++) {
	       		if(i < rate)
	            	x[i].classList.add('flClsBlue');
	            else
	            	x[i].classList.remove('flClsBlue');
	       }
       }
}


function getPluginProperties(domainNameParam) {
	var domainIfoJson = {};
	var xhr = new XMLHttpRequest();
	var domainName = '';
	
	if(domainNameParam != '' && domainNameParam.length > 0){
		domainName = domainNameParam;
	} else {
		domainName = window.location.hostname;
		domainName = domainName.replace("www.", "");
	}
	
	var flReqUrl = 'public/api/domain/fetchData?domainName='.concat(domainName);
	xhr.open("GET", flReqUrl, true);
	xhr.onload = function (e) {
	  if (xhr.readyState === 4) {
		    if (xhr.status === 200) {
		      	var domainInfoStr = xhr.responseText;
		      	if(domainInfoStr != null && domainInfoStr != '') {
			      	domainIfoJson = JSON.parse(domainInfoStr);
			      	//console.log(domainIfoJson);
			      	if(domainIfoJson.pluginconfig.properties.ISACTIVE == 1) {
				    	loadPlugin(domainIfoJson);
				    	domainId = domainIfoJson.domain.DOMAIN_ID;
				    	//alert(JSON.stringify(domainIfoJson));   
				    	if(domainIfoJson.pluginconfig.properties.ALIGNMENT.toLowerCase() == 'left')
    						eId('idPluginBtn').classList.add('flPluginBtnPropLeft');
    					else if(domainIfoJson.pluginconfig.properties.ALIGNMENT.toLowerCase() == 'right')
    						eId('idPluginBtn').classList.add('flPluginBtnPropRight');
    					else if(domainIfoJson.pluginconfig.properties.ALIGNMENT.toLowerCase() == 'center')
    						eId('idPluginBtn').classList.add('flPluginBtnPropBottomCenter');

    					eId('idPluginBtn').style.backgroundColor = domainIfoJson.pluginconfig.properties.PLUGIN_COLOR;
	
				  	}
			  	}
		    } else {
		      	console.log(xhr.statusText);
		    }
	  }
	};
	xhr.onerror = function (e) {
	  console.error(xhr.statusText);
	};
	xhr.send(null);

	return domainIfoJson;
}

function setOptionsToCat(categories) {
	var catElement = eId('trCats');
	var catTds = '';
	for(var i=0; i<categories.length; i++) {
		catTds= catTds.concat("<td onclick='flSelectCat(this,false," + categories[i].CAT_ID + ")' id='catTd" + categories[i].CAT_ID + "' class='flCatTd' width='25%'>" + categories[i].CAT_NAME + "</td>");
	}
	catElement.innerHTML = catTds;
}

function flSelectCat(ev, isReset, catId) {
		var x = document.getElementsByClassName("flCatTd");
	            
	    if(isReset){
	       		for(var i=0; i<x.length; i++){
	       			x[i].classList.remove('flSelectedCatSection');
	       		}
	       } else {    	
		       for(var i=0; i<x.length; i++) {
		       		if(ev.id == x[i].id) {
		            	x[i].classList.add('flSelectedCatSection');
		            	eId('idFlCategory').value=catId;
		       		}
		            else {
		            	x[i].classList.remove('flSelectedCatSection');
		            }
		       }
	       }


}

function setOptionsToSubCat(subCategories) {
	var catElement = eId('idFlSubCategory');
	var flSubCatOpt1 = o();
		flSubCatOpt1.value = '';
		flSubCatOpt1.innerHTML = 'Select Sub Category';
		catElement.appendChild(flSubCatOpt1);
	for(var i=0; i<subCategories.length; i++) {
		var flSubCatOpt = o();
		flSubCatOpt.value = subCategories[i].SUBCAT_ID;
		flSubCatOpt.innerHTML = subCategories[i].SUBCAT_NAME;
		catElement.appendChild(flSubCatOpt);
	}
}

function postFeedback() {
	var http = new XMLHttpRequest();
	var url = "public/api/feedback/sendFeedBack?";
	var params = "";
	var inputFields = flGetAllInputElements();

	var resol=""+$(window).width()+"x"+$(window).height();
	var fulldomain = 'Default';//window.location.href;
	var device = 'default';
	var country = 'default';

	params = params.concat('domainId='+domainId+'&'+'&');
	params = params.concat('catId='+inputFields.selectedCat.value+'&');
	params = params.concat('subcatId='+inputFields.selectedSubCat.value+'&');    
	params = params.concat('url='+fulldomain+'&');
	params = params.concat('rating='+inputFields.selectedRate.value+'&');
	params = params.concat('text='+inputFields.comments.value+'&');
	params = params.concat('os='+opSys+'&');
	params = params.concat('resolution='+resol+'&');
	params = params.concat('device='+device+'&');
	params = params.concat('ip='+myIp+'&');
	params = params.concat('browser='+browser+'&');
	params = params.concat('country='+country+'&');
	params = params.concat('email='+inputFields.email.value);

	http.open("POST", url, true);

	//Send the proper header information along with the request
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	http.onreadystatechange = function() {//Call a function when the state changes.
	    if(http.readyState == 4 && http.status == 200) {
	        //fade(eId('idFlPluginModal'));
	        showThankDiv(true);
	    }
	}
	http.send(params);
}

function showThankDiv(display) {
	eId('idFlPluginModalContent').style.display = display ? 'none' : 'block';
	eId('idFlPluginModalThankUDiv').style.display =  display ? 'block' : 'none';
}

function b() {
	return document.createElement("BUTTON");
}

function d() {
	return document.createElement("DIV");
}

function s() {
	return document.createElement("SPAN");
}

function sl() {
	return document.createElement("SELECT");
}

function o() {
	return document.createElement("OPTION");
}

function h3() {
	return document.createElement("H3");
}

function ul() {
	return document.createElement("UL");
}

function ta() {
	return document.createElement("TEXTAREA");
}

function t() {
	return document.createElement("INPUT");
}

function eId(eId) {
	return document.getElementById(eId);
}

function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}
