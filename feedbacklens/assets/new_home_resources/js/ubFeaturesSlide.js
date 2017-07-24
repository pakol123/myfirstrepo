var featureHeadings = [
						{
							 feature : "Stay Connected",
							 subFeatures : [
							           {subFeatureIcon: "<i class='fa fa-comment-o fa-2x'></i>", subFeatureName: "Forums & Chat", subFeatureDesc: ""},
							           {subFeatureIcon: "<i class='fa fa-envelope-o fa-2x'></i>", subFeatureName: "UMail", subFeatureDesc: ""}, 
									   {subFeatureIcon: "<i class='fa fa-paper-plane-o fa-2x'></i>", subFeatureName: "SMS & EMail Alert", subFeatureDesc: ""},
									   
									   {subFeatureIcon: "<i class='fa fa-bell-o fa-2x'></i>", subFeatureName: "App notification", subFeatureDesc: ""},
									   {subFeatureIcon: "<i class='fa fa-inr fa-2x'></i>", subFeatureName: "Online Bill Payment", subFeatureDesc: ""},
									   {subFeatureIcon: "<i class='fa fa-question-circle fa-2x'></i>", subFeatureName: "Helpdesk", subFeatureDesc: ""},

									   {subFeatureIcon: "<i class='fa fa-history fa-2x'></i>", subFeatureName: "Transaction History", subFeatureDesc: ""},
									   {subFeatureIcon: "<i class='fa fa-star-o fa-2x'></i>", subFeatureName: "Amenity Booking", subFeatureDesc: ""},
									   {subFeatureIcon: "<i class='fa fa-thumbs-up fa-2x'></i><i class='fa fa-thumbs-down fa-2x' style='-moz-transform: scale(-1, 1); -webkit-transform: scale(-1, 1); -o-transform: scale(-1, 1); -ms-transform: scale(-1, 1); transform: scale(-1, 1);'></i>", subFeatureName: "Polls", subFeatureDesc: ""},
							]
						},
						{
							feature : "Management is Fun",   
							subFeatures : [
									  {subFeatureIcon: "<i class='fa fa-users fa-2x'></i>", subFeatureName: "Meetings", subFeatureDesc: ""}, 
									  {subFeatureIcon: "<i class='fa fa-pie-chart fa-2x'></i>", subFeatureName: "Collection Statistics", subFeatureDesc: ""},
									  {subFeatureIcon: "<i class='fa fa-truck fa-2x'></i>", subFeatureName: "Move-In Move-out", subFeatureDesc: ""},

									  {subFeatureIcon: "<i class='fa fa-wrench fa-2x'></i>", subFeatureName: "Projects", subFeatureDesc: ""},
									  {subFeatureIcon: "<i class='fa fa-check fa-2x'></i>", subFeatureName: "Approval based system", subFeatureDesc: ""},
									  {subFeatureIcon: "<i class='fa fa-expeditedssl fa-2x'></i>", subFeatureName: "Configurable Access Right", subFeatureDesc: ""},

									  {subFeatureIcon: "<i class='fa fa-file-text-o fa-2x'></i>", subFeatureName: "Compliance Registers", subFeatureDesc: ""},
									  {subFeatureIcon: "<i class='fa fa-car fa-2x'></i>", subFeatureName: "Vechile & Parking Management", subFeatureDesc: ""},
									  {subFeatureIcon: "<i class='fa fa-address-card-o fa-2x'></i>", subFeatureName: "Domestic Help Registry", subFeatureDesc: ""}
							]
						},
						{
							feature : "Accounting in a jiffy",
							 subFeatures : [
									{subFeatureIcon: "<i class='fa fa-indent fa-2x'></i>", subFeatureName: "Automatic updates to Ledgers", subFeatureDesc: ""}, 
									{subFeatureIcon: "<i class='fa fa-columns fa-2x'></i>", subFeatureName: "Real time Automated P&L statement", subFeatureDesc: ""},
									{subFeatureIcon: "<i class='fa fa-balance-scale fa-2x'></i>", subFeatureName: "24 x 7 Up-to-date Balance Sheet", subFeatureDesc: ""},

									{subFeatureIcon: "<i class='fa fa-exchange fa-2x'></i>", subFeatureName: "Automated Reconcilliation with Bank", subFeatureDesc: ""},
									{subFeatureIcon: "<i class='fa fa-check-square-o fa-2x'></i>", subFeatureName: "Cheque Reconcilliation", subFeatureDesc: ""},
									{subFeatureIcon: "<i class='fa fa-cubes fa-2x'></i>", subFeatureName: "Asset & Investment Registers", subFeatureDesc: ""},

									{subFeatureIcon: "<i class='fa fa-file-text fa-2x'></i>", subFeatureName: "TDS Reports", subFeatureDesc: ""},
									{subFeatureIcon: "<i class='fa fa-list-ul fa-2x'></i>", subFeatureName: "Trial Balance", subFeatureDesc: ""},
									{subFeatureIcon: "<i class='fa fa-file-o fa-2x'></i>", subFeatureName: "Day Book", subFeatureDesc: ""}
							 ]
						}
					];

$(document).ready(function(){
	var dynamicFeaturesList = "";
	
	for(var j=0; j<featureHeadings.length; j++){
		
		dynamicFeaturesList = dynamicFeaturesList.concat("<li class='ubSliderLI'>");
		dynamicFeaturesList = dynamicFeaturesList.concat("<span class='ubFeatureHeading' align='center'>");
		dynamicFeaturesList = dynamicFeaturesList.concat(featureHeadings[j].feature);
		dynamicFeaturesList = dynamicFeaturesList.concat("<span></span>");
		dynamicFeaturesList = dynamicFeaturesList.concat("</span>");
		
		dynamicFeaturesList = dynamicFeaturesList.concat("<ul class='ubFeaturesUL'>");
		var k;
		for(k=0; k<featureHeadings[j].subFeatures.length; k++){
				
			dynamicFeaturesList = dynamicFeaturesList.concat("<li class='ubFeaturesLI'>");
			dynamicFeaturesList = dynamicFeaturesList.concat("<div class='ubFeaturesIcon'>");
			dynamicFeaturesList = dynamicFeaturesList.concat(featureHeadings[j].subFeatures[k].subFeatureIcon);
			dynamicFeaturesList = dynamicFeaturesList.concat("</div>");
			dynamicFeaturesList = dynamicFeaturesList.concat("<div class='ubFeaturesInfo' align='left'>");
			dynamicFeaturesList = dynamicFeaturesList.concat("<h5>" + featureHeadings[j].subFeatures[k].subFeatureName + "</h5>");
			dynamicFeaturesList = dynamicFeaturesList.concat("<p>");
			dynamicFeaturesList = dynamicFeaturesList.concat(featureHeadings[j].subFeatures[k].subFeatureDesc);
			dynamicFeaturesList = dynamicFeaturesList.concat("</p>");
			dynamicFeaturesList = dynamicFeaturesList.concat("</div>");
			dynamicFeaturesList = dynamicFeaturesList.concat("</li>");
			
			if((k+1) % 3 == 0) {
				dynamicFeaturesList = dynamicFeaturesList.concat("</ul>");
				if(k != featureHeadings[j].subFeatures.length-1)
					dynamicFeaturesList = dynamicFeaturesList.concat("<ul class='ubFeaturesUL'>");
			}
		}
		
		if((k % 3 != 0) && (j == (featureHeadings.length - 1))) {
			dynamicFeaturesList = dynamicFeaturesList.concat("</ul>");
		}
		dynamicFeaturesList = dynamicFeaturesList.concat("</li>");
	}	
	$("#idFeaturesUL").append(dynamicFeaturesList);
});