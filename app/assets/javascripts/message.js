$(function(){
  
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var FormData = new FormData(this);
    var url = (this).attr('action');
    $ajax({
      url: url,
      type: 'POST',
      date: formDate,
      datetype: 'json',
      prcessDate: false,
      contentType: false
    })
  })

})