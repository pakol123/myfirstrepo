var hostUrl = 'http://www.kolhsys.com/LatestCode/feedbacklens/public/api/';
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
	pluginBtn.innerHTML = '';
	//pluginBtn.target = '_blank';
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
	/*var div2 = d();
	div2.id = 'idFlPluginModalThankUDiv';
	div2.classList.add('flPluginModalContent');

	div2.innerHTML = '<table class="tableContainer" style="border: 1px solid white; border-radius: 4px; height: 522px"><tr><td style="padding:30px;10px;color:#64DD17;font-size: 18px; font-weight: 600; text-align: center" align: center>Thank you for your valuable feedback!!<br><br><button style="border: 1px solid #42A5F5; background-color:#42A5F5;color: white; padding: 5px 10px; border-radius: 4px; font-weight:400; font-size: 13px" id="idFlThankClose">Close</button></td></tr></table>';
	div1.appendChild(div2);*/

	pageBody.appendChild(div1);


	var outerCont = eId('idFlPluginModalContent');
	outerCont.innerHTML = '<div class="mfp-content" style="font-family: Segoe,Helvetica,Arial,sans-serif; font-weight:400; color: black !important">'
							+'<div id="hp-feedback-form" class="hp-feedback-modal-wrapper" role="document" tabindex="0">'
						            +'<div class="feedbwWrapper cf">'
						               +'<div class="feedbwHeadLeft"><img id="logo" alt="FeedbackLens" src="public/'+domainIfoJson.pluginconfig.properties.LOGOPATH+'" onerror="this.src=\'images/feedbackLogo.png\'" height="40px"></div>'
						               +'<div class="feedbwHeadRight"></div>'
						            +'</div>'
						            +'<div id="idFlPluginModalInitialForm">'
										+'<p id="feedbRatSentence" role="region" aria-live="text" aria-relevant="polite" style="color:black">Rate your level of satisfaction:</p>'
							            +'<div>'
							               +'<ul class="flRateElement" id="flRatingUl"></ul>'
							            +'</div>'
							            +'<p class="feedbRatSentence" id="feedbwRatSelect-label" style="color:black; padding-bottom: 6px">What category would you like to give web site feedback on?</p>'
							            +'<select aria-labelledby="feedbwRatSelect-label" class="feedbwRatSelect" id="idFlSubCategory" onchange="">'
							            +'</select>'
							            +'<br><br>'
							            +'<p id="feedbRatSentence" role="region" aria-live="text" aria-relevant="polite"></p>'
							            +'<div class="feedbwRatRowWrapper cf" role="radiogroup" aria-labelledby="feedbRatSentence">'
							               +'<div class="option-column"><label for="xsatisfLevel-option1" style="font-weight: 400">Problem </label><input id="xsatisfLevel-option1" name="flMainCat" value="1" type="radio" onchange="flSelectCat(1)"></div>'
							               +'<div class="option-column"><label for="xsatisfLevel-option2" style="font-weight: 400">Suggetion </label><input id="xsatisfLevel-option2" name="flMainCat" value="2" type="radio" onchange="flSelectCat(2)"></div>'
							               +'<div class="option-column"><label for="xsatisfLevel-option3" style="font-weight: 400">Complaint </label><input id="xsatisfLevel-option3" name="flMainCat" value="3" type="radio" onchange="flSelectCat(3)"></div>'
							               +'<div class="option-column"><label for="xsatisfLevel-option4" style="font-weight: 400">Others </label><input id="xsatisfLevel-option4" name="flMainCat" value="3" type="radio" onchange="flSelectCat(4)"></div>'
							            +'</div>'
							            +'<p class="feedbwRatParaOne" id="feedbwRatTextArea-label" style="color:black">Comments:</p>'
							            +'<div class="feedbwWrapperBottom cf">'
							               +'<div class="feedbwBottomLeft"><textarea maxlength="500" class="feedbwRatTextArea" id="idFlComments" aria-labelledby="feedbwRatTextArea-label" style="resize: vertical;"></textarea></div>'
							               +'<div class="feedbwBottomRight" style="margin-left: 20px"><span href="Javascript:void();" style="cursor:pointer; background-color: '+domainIfoJson.pluginconfig.properties.PLUGIN_COLOR+'" id="feedbwSubmit" class="feedbwbtn feedbwbtn-blue" onclick="javascript: flGoToNextForm();"><span>Next</span></span></div>'
						            	+'</div>'
					            	+'</div>'
					            	+'<div id="idFlPluginEmailDiv" style="display: none; ">'
						            	+'<table class="tableContainer">'
							            	+'<tr><td align="left">'
								            	+'<p class="feedbRatSentence" style="color:black; padding-bottom: 8px">Your Email</p>'
								            	+'<input class="feedbwRatSelect" style="width: 100%" id="idFlEmail" value="" placeholder="Optional">'
							            	+'</td></tr>'
							            	+'<tr>'
							            		+'<td style="padding: 20px 0px 0px 0px" align="right">'
							            			+'<span href="Javascript:void();" style="cursor:pointer;background-color: '+domainIfoJson.pluginconfig.properties.PLUGIN_COLOR+'" id="feedbwSubmit" class="feedbwbtn feedbwbtn-blue" onclick="javascript: flSubmitForm();"><span>Submit</span></span>'
							            		+'</td>'
							            	+'</tr>'
						            	+'</table>'
						            	+'<div>'
							               +'<div class="feedbwBottomRight" style="margin-left: 20px"></div>'
						            	+'</div>'
						            +'</div>'
						            +'<div id="idFlPluginModalThankUDiv" style="display: none; text-align: center; padding-top:5%; padding-bottom:5%"><table class="tableContainer" ><tr><td style="padding:30px;10px;color:black;font-size: 20px; font-weight: 400; text-align: center" align: center>Thank you for your valuable feedback!!<br><br><span href="Javascript:void();" style="cursor:pointer; background-color: '+domainIfoJson.pluginconfig.properties.PLUGIN_COLOR+'" class="feedbwbtn feedbwbtn-blue" id="idFlThankClose"><span>Close</span></span></td></tr></table></div>'
						            +'<button title="Close (Esc)" type="button" class="mfp-close" id="idFlPluginClose" style="color: black;">×</button>'
						         +'</div>'
								 +'<input type="hidden" id="idRate" value="">'
								 +'<input type="hidden" id="idFlCategory" value="">'
					      +'</div>';

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
		
		showThankDiv(false);
		flResetInputs();
		modal.style.display = "block";
		//window.open('/#idFlPluginModal', '');
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
	//setOptionsToCat(domainIfoJson.pluginconfig.cat);
	setOptionsToSubCat(domainIfoJson.pluginconfig.subcat);
}

function flClearCatRadioes() {
	var ele = document.getElementsByName("flMainCat");
   for(var i=0;i<ele.length;i++)
      ele[i].checked = false;
}
function flGoToNextForm() {
	if(flIsValidaeInputs()) {
		eId('idFlPluginModalInitialForm').style.display = 'none';
		eId('idFlPluginModalThankUDiv').style.display =  'none';
		eId('idFlPluginEmailDiv').style.display =  'block';
	} else {
		alert("Not Valid");
	}
}

function setRate(ev, rate) {
    flToggleRateElement(rate, false);
    eId("idRate").value = rate;
}

function flSubmitForm() {
	if(!flIsEmptyField(eId('idFlEmail'))) {
		if(!validateEmail(eId('idFlEmail').value)) {
			alert("Enter Valid Email");
			return false;
		}
	}
	
	postFeedback();
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
	flClearCatRadioes();
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
	
	var flReqUrl = hostUrl + "domain/fetchData?domainName='.concat(domainName);
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

				    	if(domainIfoJson.pluginconfig.properties.LABELTEXT && domainIfoJson.pluginconfig.properties.LABELTEXT != '' && domainIfoJson.pluginconfig.properties.LABELTEXT.length > 0)
				    		eId('idPluginBtn').innerHTML = domainIfoJson.pluginconfig.properties.LABELTEXT;
				    	else
				    		eId('idPluginBtn').innerHTML = 'Feedback';

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

function flSelectCat(catId) {
	
	eId('idFlCategory').value=catId;
}

function setOptionsToSubCat(subCategories) {
	var catElement = eId('idFlSubCategory');
	var flSubCatOpt1 = o();
		flSubCatOpt1.value = '';
		flSubCatOpt1.innerHTML = 'Choose a category';
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
	var url = hostUrl + "feedback/sendFeedBack?";
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

	if(inputFields.email.value != '' && inputFields.email.value.length > 0)
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
	eId('idFlPluginModalInitialForm').style.display = display ? 'none' : 'block';
	eId('idFlPluginModalThankUDiv').style.display =  display ? 'block' : 'none';
	eId('idFlPluginEmailDiv').style.display =  'none';
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

function L() {
	return document.createElement("A");
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
