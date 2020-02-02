$(function(){ 
  var buildHTML = function(message) {
    if (message.content && message.image) {
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
    } else if(message.content) {
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
    } else if(message.image) {
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
          <img src=${message.image} >
        </div>`
    };
    return html;
  };
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    last_message_id = $('.message:last').data("message-id");
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
      })
      .fail(function(){
        alert("メッセージ送信に失敗しました");
      })
      .always(function(){
        $('#new_message')[0].reset();
        $('.submit-btn').prop("disabled", false);
      });
  })
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert("自動更新に失敗しました");
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});