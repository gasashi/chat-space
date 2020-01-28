$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
      `<div class="message" data-message-id=${message.id}>
        <div class="messages__info">
          <div class="messages__info__member">
            ${message.user_name}
          </div>
          <div class="messages__info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="message__text">
          <p class="lower-message__content">
            ${message.content}
          </p>
        </div>
        <img src=${message.image} >
      </div>`
      return html;
    } else {
      var html =
        `<div class="message" data-message-id=${message.id}>
          <div class="messages__info">
            <div class="messages__info__member">
              ${message.user_name}
            </div>
            <div class="messages__info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="message__text">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    }
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function(data){
        var html = buildHTML(data);
        $('.messages').append(html);  
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});    
        $('#new_message')[0].reset();
        $('.submit-btn').prop("disabled", false);
      })
      .fail(function(){
        alert("メッセージ送信に失敗しました");
        $('#new_message')[0].reset();
        $('.submit-btn').prop("disabled", false);
      });
  })
});