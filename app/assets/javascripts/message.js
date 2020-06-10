$(function(){
  function buildHTML(message){
    if (message.image.url) {
      var html = 
        `<div class="chat-main__messages__message" data-message-id=${message.id}>
          <div class="chat-main__messages__message__upper-info">
            <div class="chat-main__messages__message__upper-info__talker">
              ${message.user_name}
            </div>
            <div class="chat-main__messages__message__upper-info__data">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__messages__message__lower-info">
            <p class="chat-main__messages__message__lower-info__text">
              ${message.text}
            </p>
            <img src ="${message.image.url}" class="chat-main__messages__message__lower-info__image">
          </div>
        </div>`
      return html;
    } else {
      var html = 
        `<div class="chat-main__messages__message" data-message-id=${message.id}>
          <div class="chat-main__messages__message__upper-info">
            <div class="chat-main__messages__message__upper-info__talker">
              ${message.user_name}
            </div>
            <div class="chat-main__messages__message__upper-info__data">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__messages__message__lower-info">
            <p class="chat-main__messages__message__lower-info__text">
              ${message.text}
            </p>
          </div>
        </div>`
      return html;
    };
  }
  $("#new_message").on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      type: "POST",
      url: url,
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      console.log(message);
      $(".chat-main__messages").append(html);
      $("#new_message")[0].reset();
      // $("#message_text").val("");でもOKだけど$("#message_image").val("");の二つ書く必要があるから一度に消せるresetの方が楽
      $(".chat-main__messages").animate({scrollTop: $(".chat-main__messages")[0].scrollHeight})
    })
    .fail(function(){
      alert("入力してください");
    })
    .always(function(){
      $(".chat-main__form__form-parents__send-btn").prop("disabled", false);
    })
  });
});