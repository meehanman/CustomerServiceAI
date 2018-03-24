 // HTTP object to make REST requests
 var xhr = new XMLHttpRequest();
 var gotProblems = false;
 var gotResolutions = false;
 var msg = '';
 var user;


 $.ajax({
    url: 'https://randomuser.me/api/',
    dataType: 'json',
    success: function(data) {
        var user = data.results[0];
        console.log(user.picture.thumbnail);
        $("[data-hero='user.profile.image").attr("src",user.picture.large);
        $("[data-hero='user.profile.name").text(user.name.first+" "+user.name.last);
        $("[data-hero='user.profile.firstname").text(user.name.first);
        $('#loading').hide();
        $('#main-content').show();
    }
  });



 function addChatBot(user, msg) {
   $("#chatWindowText").append('<nav aria-label="breadcrumb"><ol class="breadcrumb"><li class="breadcrumb-item active" aria-current="page"><b class="subtext">' + user + '</b></br>' + msg + '</li></ol></nav>');
 };

 //append initial comment
 addChatBot("Chat Bot", "Hey <span data-hero='user.profile.firstname' />, before we connect you to a live agent lets see if I can help! Can you give me a brief description of your problem?");


 function getProblems() {
   var text = $("#userInput").val();
   var userOrders = ["TV", "KETTLE", "WATCH"];
   //check if the user has asked for an item they bought
   //is any of the text in the accepted userOrders
   var validOrder = false;
   for (var i = 0; i < userOrders.length; i++) {
     if (text.indexOf(userOrders[i]) !== -1) {
       validOrder = true;
       break;
     }
   }
   if (!validOrder) {
     var displayProblemsToUser = '';
     displayProblemsToUser += '<div class="list-group"><div class="list-group-item list-group-item-action active"><b class="subtext"> Automatic Assistant </b>';
     displayProblemsToUser += '</br>' + "Oops, We couldent find your order...heres a list of your previously ordered items:" + '</div>';
     for (var i = 0; i < userOrders.length; i++) {
       console.log(userOrders[i].term);
       displayProblemsToUser += '<a onclick="getResolutions()" href="#" class="list-group-item list-group-item-action">' + userOrders[i] + '</a>';
     }
     displayProblemsToUser += "</div>";
     console.log("displayProblemsToUser", displayProblemsToUser);
     $("#chatWindowText").append(displayProblemsToUser);
     $("#userInput").val('');
     return null;
   }

   $("#chatWindowText").append('<nav aria-label="breadcrumb"><ol class="breadcrumb"><li class="breadcrumb-item active" aria-current="page"><b class="subtext">You</b></br>' + text + '</li></ol></nav>');
   $("#userInput").val('');
   var request = "http://167.99.91.119:8080/getProblems";
   console.log(request);
   xhr.open('GET', request, true);
   xhr.onreadystatechange = serverResponse;
   xhr.onerror = function() {
     serverResponse.innerHTML = "ERROR: An error occurred during the HTTP Request";
   };
   xhr.send();
   $("button").attr('disabled', 'disabled');
 }


 ///After gotProblems
 function getResolutions() {
   msg = "Hey %user%, heres your resolutions ";
   var text = $("#userInput").val();
   $("#chatWindowText").append('<nav aria-label="breadcrumb"><ol class="breadcrumb"><li class="breadcrumb-item active" aria-current="page"><b class="subtext">You</b></br>' + text + '</li></ol></nav>');
   $("#userInput").val('');
   var request = "http://167.99.91.119:8080/getResolutions";
   gotProblems = true;
   console.log(request);
   xhr.open('GET', request, true);
   xhr.onreadystatechange = serverResponse;
   xhr.onerror = function() {
     serverResponse.innerHTML = "ERROR: An error occurred during the HTTP Request";
   };
   xhr.send();
 }

 function serverResponse(e) {
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
       displayProblemsToUser += '</br>' + msg + '</div>';
       for (var i = 0; i < result.length; i++) {
         console.log(result[i].term);
         displayProblemsToUser += '<a onclick="getResolutions()" href="#" class="list-group-item list-group-item-action">' + result[i].term + '</a>';
       }
       displayProblemsToUser += "</div>";
       console.log("displayProblemsToUser", displayProblemsToUser);
       $("#chatWindowText").append(displayProblemsToUser);
     }
   }
 }