 // HTTP object to make REST requests
 var xhr = new XMLHttpRequest();
 var gotProblems = false;
 var gotResolutions = false;
 var msg = '';
 var user;
 var csr;
 var custData = {
    "_id": 234324342,
    "name": "Dean Meehan",
    "email": "d3an.meehan@hotmail.com",
    "order": [{
        "_id": 2423423,
        "product": "Sony Vio Laptop 2006",
        "description": "laptop",
        "reviews": ["", "", "", "", "", "", "", "", "", "", ""]
      },
      {
        "_id": 2423423,
        "product": "Samsumg QLED 2017 AE3000B32",
        "description": "tv cable screen stand off",
        "reviews": ["", "", "", "", "", "", "", "", "", "", ""]
      },
      {
        "_id": 2423423,
        "product": "Apple Watch 2018",
        "description": "watch battery strap",
        "reviews": ["", "", "", "", "", "", "", "", "", "", ""]
      }
    ]
  };
 var locationIndex = 0;



 $.ajax({
    url: 'https://randomuser.me/api/?nat=gb',
    dataType: 'json',
    success: function(data) {
        user = data.results[0];
        loaded();
    }
  });

  $.ajax({
    url: 'https://randomuser.me/api/?nat=IE',
    dataType: 'json',
    success: function(data) {
        csr = data.results[0];
        loaded();
    }
  });

  function update(){
    $("[data-csr='user.profile.image").attr("src",csr.picture.large);
    $("[data-csr='user.profile.name").text(csr.name.first+" "+user.name.last);
    $("[data-csr='user.profile.firstname").text(csr.name.first);
    $("[data-hero='user.profile.image").attr("src",user.picture.large);
    $("[data-hero='user.profile.name").text(user.name.first+" "+user.name.last);
    $("[data-hero='user.profile.firstname").text(user.name.first);

  }

  function loaded(){
    if(csr!=null && user!=null){
        $('#loading').hide();
        $('#main-content').show();
        update();
        return true;
    }
    return false;
  }

 function addChatBot(user, msg) {
     if(user != "You"){
        locationIndex++;
     }
 	$("#chatWindowText")
         .append('<nav aria-label="breadcrumb"><ol class="breadcrumb"><li class="breadcrumb-item active" aria-current="page"><b class="subtext">' + user + '</b></br>' + msg + '</li></ol></nav>');
         if(loaded()){
            update();
         }
 };

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function displayRecentOrders(){
    var displayProblemsToUser = '';
    displayProblemsToUser += '<div class="list-group"><div class="list-group-item list-group-item-action active"><b class="subtext"> Automatic Assistant </b>';
    displayProblemsToUser += '</br>' + "Oops, We couldent find your order...heres a list of your orders please selct one of the below:" + '</div>';
    for (var i = 0; i < custData.order.length; i++) {
        displayProblemsToUser += '<a onclick="getResolutions()" href="#" class="list-group-item list-group-item-action">' + custData.order[i].product + '</a>';
    }
    displayProblemsToUser += "</div>";
    console.log("displayProblemsToUser", displayProblemsToUser);
    $("#chatWindowText").append(displayProblemsToUser);
    $("#userInput").val('');
}

$('#submitQuestion').click(function(){
    start();
});

$('#userInput').on('keypress', function (e) {
    if(e.which === 13){
    start($('#userInput').val());  
    $('#userInput').val("");
    
    }
});

function start(aaaaaa){
    setTimeout(function(){ 
        var input = aaaaaa;
        if(input != ""){
            addChatBot("You", input);
            setTimeout(function(){
            getProblems(input)
            });
        }
    }, 500);
}

function checkRecentOrders(question){
     	//check if the user has asked for an item they bought
 	//is any of the text in the accepted custData.order
 	var validOrder = false;
 	for (var i = 0; i < custData.order.length; i++) {
 		if (question.indexOf(custData.order[i].product) !== -1) {
 			validOrder = true;
 			break;
 		}
 	}
 	if (!validOrder) {
        displayRecentOrders();
     }
}

 function getProblems(question) {
    console.info("State",locationIndex);

     if(locationIndex == 0){
        addChatBot("Chat Bot", "Hey <span data-hero='user.profile.firstname'/>, how can we help today?");
     }else if(locationIndex == 1){
        addChatBot("Chat Bot", "Hey <span data-hero='user.profile.firstname'/>, how can we help today?");
     }
     
     //Clear
 	$("#userInput").val('');
 };
 getProblems();

 function _getProblemsFromServer(){
    var request = "http://167.99.91.119:8080/getProblems";
    console.log(request);
    xhr.open('GET', request, true);
    xhr.onreadystatechange = getProblemsServerResponse;
    xhr.onerror = function () {
        serverResponse.innerHTML = "ERROR: An error occurred during the HTTP Request";
    };
    xhr.send();
 }

 ///After gotProblems
 function getResolutions() {
 	addChatBot("You", "Thanks, the top reported issues for your selected item are below, do any of them match your issue?");
 	$("#userInput")
 		.val('');
 	var request = "http://167.99.91.119:8080/getResolutions";
 	gotProblems = true;
 	console.log(request);
 	xhr.open('GET', request, true);
 	xhr.onreadystatechange = getResolutionsServerResponse;
 	xhr.onerror = function () {
 		serverResponse.innerHTML = "ERROR: An error occurred during the HTTP Request";
 	};
 	xhr.send();
 }

 function getProblemsServerResponse(e) {
 	//We should have a switch statment to handle multiple responses
 	//In the future we can use these singals to monitor performance
 	console.log("Processing Request status: ", xhr.readyState, " - ", xhr.status);
 	if (xhr.readyState === 4) {
 		if (xhr.status == 404) {
 			console.log(xhr.responseText);
 		}
 		if (xhr.status == 200) {
 			var result = JSON.parse(xhr.responseText);
 			console.log(result);
 			var displayProblemsToUser = '';
 			displayProblemsToUser += '<div class="list-group"><div class="list-group-item list-group-item-action active"><b class="subtext"> Automatic Assistant </b>';
 			displayProblemsToUser += '</br>' + "Here is a list of the most common problems, please select one:" + '</div>';
 			for (var i = 0; i < result.length; i++) {
 				console.log(result[i].term);
 				displayProblemsToUser += '<a onclick="getResolutions()" href="#" class="list-group-item list-group-item-action">' + result[i].term + '</a>';
 			}
 			displayProblemsToUser += "</div>";
 			console.log("displayProblemsToUser", displayProblemsToUser);
 			$("#chatWindowText")
 				.append(displayProblemsToUser);
 		}
 	}
 }

 function getResolutionsServerResponse(e) {
 	//We should have a switch statment to handle multiple responses
 	//In the future we can use these singals to monitor performance
 	console.log("Processing Request status: ", xhr.readyState, " - ", xhr.status);
 	if (xhr.readyState === 4) {
 		if (xhr.status == 404) {
 			console.log(xhr.responseText);
 		}
 		if (xhr.status == 200) {
 			var result = JSON.parse(xhr.responseText);
 			console.log(result);
 			var displayProblemsToUser = '';
 			displayProblemsToUser += '<div class="list-group"><div class="list-group-item list-group-item-action active"><b class="subtext"> Automatic Assistant </b>';
 			displayProblemsToUser += '</br>' + "Heres a list of the most common resolutions, please select one:" + '</div>';
 			for (var i = 0; i < result.length; i++) {
 				console.log(result[i].term);
 				displayProblemsToUser += '<a onclick="getResolutions()" href="#" class="list-group-item list-group-item-action">' + result[i].term + '</a>';
 			}
 			displayProblemsToUser += "</div>";
 			console.log("displayProblemsToUser", displayProblemsToUser);
 			$("#chatWindowText")
 				.append(displayProblemsToUser);
 		}
 	}
 }
