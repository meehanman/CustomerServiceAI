 // HTTP object to make REST requests
 var botName = "Chatbot"
 var user;
 var csr;
var keywords = [];
 //Example code is:
 /*
 Hey Charles, how can we help today?
 Hi, I'm having trouble with my order
Your recent orders were a Samsung TV, Apple Watch, Kettle and 3+ items. Do you need help with any of these?
Yeah, my samsung tv is broke
Did you have a problem with your TV not turning on?
yes
Could not Connect to Agent. Please try again later. [Error 500]

 
 
 ORDER MATTERS
 
 */
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

 var magicString;
 function getResponce(question) {
   $("#userInput").val('');

   if(magicString=="finished"){
    console.info(magicString);
   writeMessage(botName, "I hope that solved your issue. Do you need more help or want to speak to a person?");
    return;
  }
  
   if(contains(question,"another")){
    locationIndex = -1;
    return;
   }

   if(magicString=="tv-issues" && contains(question,"yes")){
    writeMessage(botName, "We've found some problems based on reviews. Are any of these your issue?", "tv-issue");
    //Display Laptop Reviews
    return;
  }

  if(magicString=="watch-problem"){
    writeMessage(botName, "I'm sorry to hear about that. We will contact you through to an agent soon. ");
    //Display Laptop Reviews
    return;
  }

   if(contains(question,"laptop")){
    writeMessage(botName, "We couldn't find any suggested problems with your laptop. Connecting you to an agent...");
     question = "agent";
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
    magicString = "watch-problem"
    //Display Orders
    return;
   }

   if(contains(question,"tv")){
    writeMessage(botName, "Looking at your previous orders, I can see that you've ordered a <b>Sony QLED 2017 AE3000B32</b>. Is this the product your having issues with?", "tv");
    magicString="tv-issues";
    //Display Orders
    return;
   }

   if(contains(question,"yes")){
    writeMessage(botName, "Could not Connect to Agent. Please try again later. [Error 500]");
    //Display Orders
    return;
   }

   if(contains(question,"agent")){
    writeMessage(botName, "Could not Connect to Agent. Please try again later. [Error 500]");
    //Display Orders
    return;
   }
   
   //Conversational
   if (locationIndex == -1) {
    writeMessage(botName, "So how can I assist you...");
    locationIndex = 1;
    locationIndex++;
  } else if (locationIndex == 0) {
    writeMessage(botName, "Hey <span data-hero='user.profile.firstname'/>, how can we help today?");
    locationIndex++;
  } else if (locationIndex == 1) {
    writeMessage(botName, "Hey there.");
    locationIndex++;
  }else if (locationIndex == 2) {
    writeMessage(botName, "Ooh, can you try that again?");
    locationIndex++;
  }else if (locationIndex == 3) {
    writeMessage(botName, "Sorry, I didn't get that. Do you want to talk to a representative?");
    locationIndex++;
  }else if (locationIndex == 4) {
    writeMessage(botName, "Closing Chat.");
    $('#userInput').attr("disabled","disabled");
    locationIndex++;
  }
 };

 $('body').on('click', '[hero-res="lang"]', function(){
  magicString="finished";
  start("We're sorry about that. Here's some instructions on how to change the language. <a href='http://www.verizon.com/support/smallbusiness/tv/fiostv/guide/tv+programming/questionsone/123684.htm'>TV Guide - Language Change.</a>");
});

 //Load first one
 getResponce();
