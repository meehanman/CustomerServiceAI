 //Called by the Send button
 function start(input) {
    if (input != "") {
     console.log(input, input != "",input == "");
      writeMessage("You", input);
      getResponce(input);
    }
  }

  function writeMessage(user, msg, type) {
    var delay;
    //BOT
    if (user == botName) {
      delay = 1000;
      //NOT BOT
    } else {
      delay = 0;
    }
 
    setTimeout(() => {
        if(type==undefined){
            $("#chatWindowText").append('<nav aria-label="breadcrumb"><ol class="breadcrumb"><li class="breadcrumb-item active" aria-current="page"><b class="subtext">' + user + '</b></br>' + msg + '</li></ol></nav>');
        }else if(type=="order"){
            $("#chatWindowText").append('<nav aria-label="breadcrumb"><ol class="breadcrumb"><li class="breadcrumb-item active" aria-current="page"><b class="subtext">' + user + '</b></br>' + msg + '</li></ol></nav>');
        }else if(type=="watch"){
            $("#chatWindowText").append('<nav aria-label="breadcrumb"><ol class="breadcrumb"><li class="breadcrumb-item active" aria-current="page"><b class="subtext">' + user + '</b></br>' + msg + '</li></ol></nav>'+getItemHTML(2));
        }else if(type=="tv"){
            $("#chatWindowText").append('<nav aria-label="breadcrumb"><ol class="breadcrumb"><li class="breadcrumb-item active" aria-current="page"><b class="subtext">' + user + '</b></br>' + msg + '</li></ol></nav>'+getItemHTML(1));
        }else if(type=="laptop"){
            $("#chatWindowText").append('<nav aria-label="breadcrumb"><ol class="breadcrumb"><li class="breadcrumb-item active" aria-current="page"><b class="subtext">' + user + '</b></br>' + msg + '</li></ol></nav>'+getItemHTML(0));
        }
      if (loaded()) {
        update();
      }
      scrollDivToBottom();
    }, delay);
  };

  function getItemHTML(index){
      console.log(index);
return '<div class="card" style="width: 18rem;"> <img class="card-img-top" src="'+custData.order[index].image+'" alt="Card image cap"> <div class="card-body"> <h5 class="card-title">'+custData.order[index].product+'</h5></p> </div> </div>'
  }
   //Used to update the names and images
 function update() {
    $("[data-csr='user.profile.image").attr("src", csr.picture.large);
    $("[data-csr='user.profile.name").text(csr.name.first + " " + user.name.last);
    $("[data-csr='user.profile.firstname").text(csr.name.first);
    $("[data-hero='user.profile.image").attr("src", user.picture.large);
    $("[data-hero='user.profile.name").text(user.name.first + " " + user.name.last);
    $("[data-hero='user.profile.firstname").text(user.name.first);
  }

   ///Used to work out where we are in the text
 var locationIndex = 0;
 var custData = {
   "_id": 234324342,
   "name": "Dean Meehan",
   "email": "d3an.meehan@hotmail.com",
   "order": [{
       "_id": 2423423,
       "product": "Samsung 2006 4K Laptop",
       "description": "laptop",
       "image": "https://store.storeimages.cdn-apple.com/4662/as-images.apple.com/is/image/AppleInc/aos/published/images/4/2/42/alu/42-alu-space-sport-black-s1-1up?wid=470&hei=556&fmt=png-alpha&.v=1512435115164",
       "reviews": ["", "", "", "", "", "", "", "", "", "", ""]
     },
     {
       "_id": 2423423,
       "product": "Sony QLED 2017 AE3000B32",
       "description": "tv cable screen stand off",
       "image":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5947/5947110_sd.jpg;maxHeight=1000;maxWidth=1000",
       "reviews": ["", "", "", "", "", "", "", "", "", "", ""]
     },
     {
       "_id": 2423423,
       "product": "Apple Watch 2018",
       "description": "watch battery strap",
       "image":"https://store.storeimages.cdn-apple.com/4662/as-images.apple.com/is/image/AppleInc/aos/published/images/4/2/42/alu/42-alu-space-sport-black-s1-1up?wid=470&hei=556&fmt=png-alpha&.v=1512435115164",
       "reviews": ["", "", "", "", "", "", "", "", "", "", ""]
     }
   ]
 };

 function scrollDivToBottom(){
    document.getElementById("chatWindow").scrollTop = document.getElementById("chatWindow").scrollHeight
 }

  //When the page is loaded this stops the code updating after
  function loaded() {
    $('[data-hero-page]').hide();
    if (csr != null && user != null) {
      $('#main-content').show();
      update();
      return true;
    }
    return false;
  }

  function contains(str, substring){
      if(str==undefined || str==""){
          return;
      }
      str = str.toLowerCase();
      substring = substring.toLowerCase();
      console.log(str, substring, str.indexOf(substring) !== -1);
      if(str.indexOf(substring) !== -1){
        keywords.push(substring);
      }
      return str.indexOf(substring) !== -1;
  }
