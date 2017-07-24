// Pre-requisite jquery 1.7 or higher version

// Display message
function showMessage(id, alertBox, msg) {
	$(alertBox).text(msg);
	$(id).focus();
}

// Clears message
function clearMessage(alertBox) {
	$(alertBox).text('');
}

// Checks whether field is empty or not
function isEmptyField(id) {
	var text = $(id).val();
	
	if (text == null) {
		return true;
	}
	text = text.trim();

	// Get the length
	var len = text.length;
	// Compare length
	if (len == 0) {
		$(id).val('');
		return true;
	} else {
		return false;
	}
}

// Checks whether field is empty or not
function isEmpty(id, alertBox, msg) {

	var text = $(id).val();
	if (text == null) {
		return true;
	}
	text = text.trim();

	// Get the length
	var len = text.length;
	// Compare length
	if (len == 0) {
		$(id).val('');
		showMessage(id, alertBox, msg);
		return true;
	}

	return false;
}

// Checks whether date is is dd/mm/yyyy or not
function isDateValid(id, alertBox, msg) {
	var text = $(id).val();
	var re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
	if (text != '' && !text.match(re)) {
		showMessage(id, alertBox, msg);
		return true;
	}
	return false;
}

// Checks whether the given year falls between the specified range
function isYearValid(year, alertBox, msg, number) {
	var text = $(year).val();
	if (text != '') {
		var dateParts = text.split("/");
		
		var date = new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);
		var providedYear = date.getFullYear();
		var currentDate = new Date();
		
		if (number == 3) {
			if (providedYear != currentDate.getFullYear()
					&& providedYear != currentDate.getFullYear() - 1
					&& providedYear != currentDate.getFullYear() - 2 
					&& providedYear != currentDate.getFullYear() + 1 ) {
				showMessage(year, alertBox, msg);
				return true;
			}
		} else if (number == 4) {
			if (providedYear != currentDate.getFullYear() + 1
					&& providedYear != currentDate.getFullYear()
					&& providedYear != currentDate.getFullYear() - 1
					&& providedYear != currentDate.getFullYear() - 2 ) {
				showMessage(year, alertBox, msg);
				return true;
			}
		}
	}
	return false;
}

// Checks for all alphabets
function isAlphabets(id, alertBox, msg) {

	var pattern = /^[a-zA-Z]+$/;
	// Get the value
	var value = $(id).val();
	if (value.length != 0) {
		// Match the string
		if (pattern.test(value)) {
			return true;
		} else {
			showMessage(id, alertBox, msg);
			return false;
		}
	}
}

// Checks whether valid name or not
function isNumeric(id, alertBox, msg) {

	var pattern = /^[0-9]+$/;
	// Get the value
	var value = $(id).val();
	if (value.length == 0) {
		return true;
	}
	
	// Match the value
	if (pattern.test(value)) {
		return true;
	} else {
		showMessage(id, alertBox, msg);
		return false;
	}
}

// Checks for all alphabets and only space is allowed
function isAlphaWithSpace(id, alertBox, msg) {

	var pattern = /^[A-Za-z\s]+$/;
	// Get the value
	var value = $(id).val();
	if (value.length == 0) {
		return true;
	}
	
	// Match the value
	if (pattern.test(value)) {
		return true;
	} else {
		showMessage(id, alertBox, msg);
		return false;
	}
}

// only alphabets, space and dot allowed
function isValidName(id, alertBox, msg) {

	var pattern = /^[A-Za-z\s\.]+$/;
	// Get the value
	var value = $(id).val();
	if (value.length == 0) {
		return true;
	}

	// Match the value
	if (pattern.test(value)) {
		return true;
	} else {
		showMessage(id, alertBox, msg);
		return false;
	}
}

// Checks for alphabet and digits
function isAlphanumeric(id, alertBox, msg) {

	var pattern = /^[A-Za-z0-9]+$/;
	// Get the value
	var value = $(id).val();
	if (value.length != 0) {
		// Match the value
		if (pattern.test(value)) {
			return true;
		} else {
			showMessage(id, alertBox, msg);
			return false;
		}
	}
}

function isAlphaNumWithSpace(id, alertBox, msg) {

	var pattern = /^[A-Za-z0-9\s]+$/;
	// Get the value
	var value = $(id).val();
	
	if (value.length != 0) {
		// Match the value
		if (pattern.test(value)) {
			return true;
		} else {
			showMessage(id, alertBox, msg);
			return false;
		}
	}
}

function isValidMinLength(id, min, alertBox, msg) {
	var len = $(id).val().length;
	if (len < min) {
		showMessage(id, alertBox, msg);
		return false;
	} else {
		return true;
	}
}

function isValidMaxLength(id, max, alertBox, msg) {
	var len = $(id).val().length;

	if (len > max) {
		showMessage(id, alertBox, msg);
		return false;
	} else {
		return true;
	}
}

function isSpecialChars(id, alertBox, msg) {

	// Removed .-_from old
	var iChars = "!@#$%^&*()+=[]\\\';,/{}|\":<>?~";
	// Get the string
	var data = $(id).val();

	for (var i = 0; i < data.length; i++) {
		if (iChars.indexOf(data.charAt(i)) != -1) {
			showMessage(id, alertBox, msg);
			return false;
		}
	}

	return true;
}

function emailValidator(elem, alertBox, msg) {

	var email = $(elem).val();

	if (email.length != 0) {
		var emailExp = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
		if (email.match(emailExp)) {
			return true;
		} else {
			$(alertBox).html(msg);
			$(elem).focus();
			return false;
		}
	} else {
		return true;
	}
}

function hasWhiteSpace(id) {
	var str = $(id).val();
	return /\s/g.test(str);
}

function matchPassword(password, repassword) {

	var first = $(password).val().toLowerCase();
	var second = $(repassword).val().toLowerCase();

	if (first == second) {
		return true;
	}
	return false;
}

function isValidString(id, pattern, alertBox, msg) {

	var regexp = "";
	// First Name, Last Name, Middle Name, city, amenity name
	if (pattern == "A-Za-z\s") {
		regexp = /^[A-Za-z\s]+$/;
	}
	if (pattern == "A-Za-z") {
		regexp = /^[A-Za-z]+$/;
	}
	if (pattern == "A-Z") {
		regexp = /^[A-Z]+$/;
	}
	if (pattern == "a-z") {
		regexp = /^[a-z]+$/;
	}
	if (pattern == "A-Z\s") {
		regexp = /^[A-Z\s]+$/;
	}
	if (pattern == "a-z\s") {
		regexp = /^[a-z\s]+$/;
	}
	// Pin , mobile number
	if (pattern == "0-9") {
		regexp = /^[0-9]+$/;
	}
	// landline numbers
	if (pattern == "0-9.+-()\s") {
		regexp = /^[0-9\.\+\-\(\)\s]+$/;
	}
	// Role Name
	if (pattern == "A-Za-z-\s") {
		regexp = /^[A-Za-z\-\s]+$/;
	}
	if (pattern == "A-Za-z&.\s") {
		regexp = /^[A-Za-z&\.\s]+$/;
	}
	// Vendor Name, master service name, master configuration type
	if (pattern == "A-Za-z0-9&.\s") {
		regexp = /^[A-Za-z0-9&\.\s]+$/;
	}
	// Bank Name, master bank name
	if (pattern == "A-Za-z\s-") {
		regexp = /^[A-Za-z\s\-]+$/;
	}
	// Income receipt - Bank Name
	if (pattern == "A-Za-z0-9&.-\s") {
		regexp = /^[A-Za-z0-9&\.\-\s]+$/;
	}
	// Amenity Name , Master amenity name
	if (pattern == "A-Za-z0-9\s") {
		regexp = /^[A-Za-z0-9\s]+$/;
	}
	// Asset Name - Add Asset
	if (pattern == "A-Za-z0-9\s&.,()[]") {
		regexp = /^[A-Za-z0-9\s&\.\,\(\)\[\]]+$/;
	}
	// Investment Name - Investment Voucher, Payment Voucher - Pay to
	if (pattern == "A-Za-z0-9\s&.,()[]-/\\") {
		regexp = /^[A-Za-z0-9\s&\.\,\(\)\[\]\-\/\\]+$/;
	}
	// Bank Account Type
	if (pattern == "A-Za-z0-9\s&.,()[]\\") {
		regexp = /^[A-Za-z0-9\s&\.\,\(\)\[\]\\]+$/;
	}
	// Account Head Name - Add account Head
	if (pattern == "A-Za-z0-9\s&.,()[]-%$*") {
		regexp = /^[A-Za-z0-9\s&\.\,\(\)\[\]\-%$*]+$/;
	}

	var value = $(id).val();
	if (value.length != 0) {
		if (regexp.test(value)) {
			return true;
		} else {
			showMessage(id, alertBox, msg);
			return false;
		}
	}
}

function isValidPanNumber(elem, alertBox, msg) {
	var panNumber = $(elem).val();

	if (panNumber.length != 0) {
		var emailExp = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
		if (panNumber.match(emailExp)) {
			return true;
		} else {
			$(alertBox).html(msg);
			$(elem).focus();
			return false;
		}
	} else {
		return true;
	}
}

function isValidVehicleNumber(elem) {
	//MH 14 AB 1234, DL 14 ABC 1234 
	var newPattern = /^[A-Z]{2}\s[0-9]{2}\s[A-Z]{2,3}\s[0-9]{4}$/;
	// BBA 3451
	var oldPattern = /^[A-Z]{3}\s[0-9]{4}$/;
	// Get the value
	var vehicleNumber = $(elem).val();
	console.log(vehicleNumber);
	
	if (vehicleNumber.length != 0) {
		// Match the string
		console.log("New pattern match: " + newPattern.test(vehicleNumber) + ", old pattern match: " + oldPattern.test(vehicleNumber));
		if (newPattern.test(vehicleNumber) || oldPattern.test(vehicleNumber)) {
			return true;
		} else {
			return false;
		}
	}
}

function getFinancialYear(date) {
	//Get current month
	var curMonth = date.getMonth();
	var financialYear = "";
	//Month starts from 0 and not from 1.
	if (curMonth > 2) { //
		var nextYr1 = (date.getFullYear() + 1).toString();
		financialYear = date.getFullYear().toString() + "-" + nextYr1;
	} else {
		var nextYr2 = date.getFullYear().toString();
		financialYear = (date.getFullYear() - 1).toString() + "-" + nextYr2;
	}
	return financialYear;
 }