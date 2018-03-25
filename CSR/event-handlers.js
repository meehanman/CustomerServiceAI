$.ajax({
    url: 'https://randomuser.me/api/?nat=IE',
    dataType: 'json',
    success: function(data) {
        user = data.results[0];
        user.picture.large = "https://randomuser.me/api/portraits/men/11.jpg";
        user.name.first = "Charles";
        user.name.last = "Horton";
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

$('#submitQuestion').click(function(){
    start($('#userInput').val());
    $('#userInput').val("");
});

$('#userInput').on('keypress', function (e) {
    if(e.which === 13){
    start($('#userInput').val());  
    $('#userInput').val("");
    }
});