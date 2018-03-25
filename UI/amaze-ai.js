 // HTTP object to make REST requests
 var botName = "Chatbot"
 var user;
 var csr;

 function displayRecentOrders(arrOfOrderNames) {
   var displayProblemsToUser = '';
   displayProblemsToUser += '<div class="list-group"><div class="list-group-item list-group-item-action active"><b class="subtext"> Automatic Assistant </b>';
   displayProblemsToUser += '</br>' + "Oops, We couldent find your order...heres a list of your orders please selct one of the below:" + '</div>';
   for (var i = 0; i < arrOfOrderNames.length; i++) {
     displayProblemsToUser += '<a onclick="getResolutions()" href="#" class="list-group-item list-group-item-action">' + custData.order[i].product + '</a>';
   }
   displayProblemsToUser += "</div>";
   console.log("displayProblemsToUser", displayProblemsToUser);
   $("#chatWindowText").append(displayProblemsToUser);
   $("#userInput").val('');
 }

 function getResponce(question) {
   $("#userInput").val('');

   if(contains(question,"laptop")){
    writeMessage(botName, "We couldn't find any suggested problems with your laptop. Connecting you to an agent...");
    //Display Laptop Reviews
    return;
   }

   if(contains(question,"order")){
    writeMessage(botName, "Your recent orders were a Samsung TV, Apple Watch, Kettle and 3+ items. Do you need help with any of these?", "order");
    //Display Orders
    return;
   }

   if(contains(question,"watch")||contains(question,"apple")){
    writeMessage(botName, "Hey, what problems did you have with your order?", "watch");
    //Display Orders
    return;
   }

   if(contains(question,"tv")){
    writeMessage(botName, "Did you have a problem with your TV not turning on?", "tv");
    //Display Orders
    return;
   }

   if(contains(question,"yes")){
    writeMessage(botName, "Could not Connect to Agent. Please try again later. [Error 500]");
    //Display Orders
    return;
   }

   if(contains(question,"tv") && contains(question,"")){
    writeMessage(botName, "Could not Connect to Agent. Please try again later. [Error 500]");
    //Display Orders
    return;
   }
   
   //Conversational
   if (locationIndex == 0) {
    writeMessage(botName, "Hey <span data-hero='user.profile.firstname'/>, how can we help today?");
    locationIndex++;
  } else if (locationIndex == 1) {
    writeMessage(botName, "Ooh, can you try that again?");
    locationIndex++;
  }else if (locationIndex == 2) {
    writeMessage(botName, "Sorry, I didn't get that. Do you want to talk to a representative?");
    locationIndex++;
  }else if (locationIndex == 3) {
    writeMessage(botName, "Closing Chat.");
    $('#userInput').attr("disabled","disabled");
    locationIndex++;
  }
 };

 //Load first one
 getResponce();
