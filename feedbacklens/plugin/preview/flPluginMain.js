//var hostUrl = 'localhost/myfirstrepo/feedbacklens/public/api/';
var domainId;

function loadPlugin(domainIfoJson) {
	var containerDiv = document.getElementsByTagName('body')[0];
	// Floating button
	/*var pluginBtn = b();
	pluginBtn.id = 'idPluginBtn';
	pluginBtn.classList.add('flPluginBtn');
	pluginBtn.innerHTML = 'Feedback';
	pageBody.appendChild(pluginBtn);*/

	// Plugin parent div
	var div1 = d();
	div1.id = 'idFlPluginModal';
	div1.classList.add('flPluginModal');
	
	// Plugin container div
	var div11 =  d();
	div11.classList.add('flPluginModalContent');
	div11.id ='idFlPluginModalContent';
	// Close button
	var spanCloseBtn =  s();
	spanCloseBtn.innerHTML = '&times;';
	spanCloseBtn.id = 'idFlPluginClose';
	spanCloseBtn.classList.add('flPluginClose');

	div11.appendChild(spanCloseBtn);

	// Plugin Header
	var flHeader = h3();
	flHeader.style.textAlign = 'center';
	flHeader.innerHTML = domainIfoJson.domain.DOMAIN_URL;//'Feedback';
	div11.appendChild(flHeader);

	var div111 =  d();
	div111.classList.add('flPluginInputContainer');
	div111.id = 'idFlPluginInputContainer';

	// Rate element
	var rateElement = ul();
	rateElement.classList.add('flRateElement');
	var svgCircle = '';
    for(var i=0; i<5; i++){
        svgCircle = svgCircle.concat('<li><svg height="40" width="40"><circle cx="20" cy="20" r="15" fill="white" class="flCir rateCircles" stroke="#FFD54F" stroke-width="2"onclick="setRate(this, '+(i+1)+');" id="idCir'+i+'"/></svg></li>');
    }
    rateElement.innerHTML = svgCircle;

	div111.appendChild(rateElement);

	
	// Categories input
	var flCatInput = sl();
	flCatInput.classList.add('flPluginInput');
	flCatInput.id = 'idFlCategory';
	var flEmptyOpt = o();
	flEmptyOpt.value = '';
	flEmptyOpt.innerHTML = 'Select Category *';
	flCatInput.appendChild(flEmptyOpt);
	
	div111.appendChild(flCatInput);

	// Sub Categories input
	var flSubCatInput = sl();
	flSubCatInput.classList.add('flPluginInput');
	flSubCatInput.id = 'idFlSubCategory';
	var flSubCatEmptyOpt = o();
	flSubCatEmptyOpt.value = '';
	flSubCatEmptyOpt.innerHTML = 'Select Sub Category *';
	flSubCatInput.appendChild(flSubCatEmptyOpt);
	div111.appendChild(flSubCatInput);

	// Text area to write us
	var flTextAreaInput = ta();
	flTextAreaInput.classList.add('flPluginInput');
	flTextAreaInput.id = 'idFlComments';
	flTextAreaInput.rows = 4;
	flTextAreaInput.placeholder = 'Write Us *';
	flTextAreaInput.style.resize = 'vertical';
	div111.appendChild(flTextAreaInput);

	// Input text for email
	var flTextInputEmail = t();
	flTextInputEmail.classList.add('flPluginInput');
	flTextInputEmail.id = 'idFlEmail';
	flTextInputEmail.type = 'email';
	flTextInputEmail.placeholder = 'Email (Optional)';
	div111.appendChild(flTextInputEmail);

	// Hidden Input text for rate
	var flTextInputRate = t();
	//flTextInputRate.classList.add('flPluginInput');
	flTextInputRate.type = 'hidden';
	flTextInputRate.id = 'idRate'
	div111.appendChild(flTextInputRate);

	// Submit button
	var flSubmitBtn = t();
	flSubmitBtn.classList.add('flPluginInput', 'flSubmitButton');
	flSubmitBtn.type = 'button';
	flSubmitBtn.value = 'Submit';
	flSubmitBtn.setAttribute( "onClick", "javascript: flSubmitForm();" );
	div111.appendChild(flSubmitBtn);

	
	div11.appendChild(div111);

	// Plugin container div
	var div112 =  d();
	//div112.classList.add('flPluginModalContent');
	div112.id ='idFlPluginThnkDiv';
	div112.style.display = 'none';
	div112.innerHTML = 'Thank you for your valuable feedback';
	div11.appendChild(div112);

	
	div1.appendChild(div11);
	containerDiv.appendChild(div1);

	// Binding modal events
	var modal = eId('idFlPluginModal');
	//var btn = eId("idPluginBtn");
	var span = eId("idFlPluginClose");
		
	/*btn.onclick = function() {
		flResetInputs();
		showThankDiv(false);
		modal.style.display = "block";
	}*/
		
	span.onclick = function() {
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
    flToggleRateElement(ev, false, 'rateCircles');
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
	flToggleRateElement({}, true, 'rateCircles');
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

function flToggleRateElement(ev, isReset, className) {
	var x = document.getElementsByClassName(className);
            
    for(var i=0; i<x.length; i++){
       if(isReset){
       		x[i].classList.remove('flClsBlue');
       } else {    	
	        if(x[i].id == ev.id)
	            x[i].classList.add('flClsBlue');
	        else
	            x[i].classList.remove('flClsBlue');
       } 
                 
    }
}

function getPluginProperties(domainName) {
	var domainIfoJson = {};
	var xhr = new XMLHttpRequest();
	var domainName = domainName;//window.location.hostname;
	var flReqUrl = 'public/api/domain/fetchData?domainName='.concat(domainName);
	xhr.open("GET", flReqUrl, true);
	xhr.onload = function (e) {
	  if (xhr.readyState === 4) {
		    if (xhr.status === 200) {
		      	var domainInfoStr = xhr.responseText;
		      	if(domainInfoStr != null && domainInfoStr != '') {
			      	domainIfoJson = JSON.parse(domainInfoStr);
			      	console.log(domainIfoJson);
			      	if(domainIfoJson.pluginconfig.properties.ISACTIVE == 1) {
				    	loadPlugin(domainIfoJson);
				    	showThankDiv(false);
				    	domainId = domainIfoJson.domain.DOMAIN_ID;
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
	var catElement = eId('idFlCategory');
	for(var i=0; i<categories.length; i++) {
		var flCatOpt = o();
		flCatOpt.value = categories[i].CAT_ID;
		flCatOpt.innerHTML = categories[i].CAT_NAME;
		catElement.appendChild(flCatOpt);
	}
}

function setOptionsToSubCat(subCategories) {
	var catElement = eId('idFlSubCategory');
	for(var i=0; i<subCategories.length; i++) {
		if(subCategories[i].pivot.ISACTIVE == 1) {
			var flSubCatOpt = o();
			flSubCatOpt.value = subCategories[i].SUBCAT_ID;
			flSubCatOpt.innerHTML = subCategories[i].SUBCAT_NAME;
			catElement.appendChild(flSubCatOpt);
		}
	}
}

function postFeedback() {
	var http = new XMLHttpRequest();
	var url = "public/api/feedback/sendFeedBack?";
	var params = "";
	var inputFields = flGetAllInputElements();

	var resol=""+$(window).width()+"x"+$(window).height();
	var fulldomain = 'URL';//window.location.href;
	var os = 'Windows';
	var device = 'Mobile';
	var ip = '127.0.0.1';
	var browser = 'chrome';
	var country = 'india';

	params = params.concat('domainId='+domainId+'&'+'&');
	params = params.concat('catId='+inputFields.selectedCat.value+'&');
	params = params.concat('subcatId='+inputFields.selectedSubCat.value+'&');
	params = params.concat('url='+fulldomain+'&');
	params = params.concat('rating='+inputFields.selectedRate.value+'&');
	params = params.concat('text='+inputFields.comments.value+'&');
	params = params.concat('os='+os+'&');
	params = params.concat('resolution='+resol+'&');
	params = params.concat('device='+device+'&');
	params = params.concat('ip='+ip+'&');
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
	eId('idFlPluginInputContainer').style.display = display ? 'none' : 'block';
	eId('idFlPluginThnkDiv').style.display =  display ? 'block' : 'none';
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
