$(function(){

  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    return html
  }

  function appendErrMsgToHTML(){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">ユーザーが見つかりません</p>
                </div>`
    return html
  }

  function addUser(name, id){
    var html =  `
                <div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>
                `
    return html
  }
  function addMember(userId){
    let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
  }
  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      dataType: "json",
      data: { keyword: input }
    })
    .done(function(users){
      $("#user-search-result").empty();
      if(users.length !== 0){
        users.forEach(function(user){
          var html = appendUser(user);
          $("#user-search-result").append(html);
        })
      } else {
        var html = appendErrMsgToHTML();
        $("#user-search-result").append(html);
      }
    })
    .fail(function(){
      alert("ユーザー検索に失敗しました");
    });
  });

  $(document).on("click", ".user-search-add",function(){
    // $(".chat-group-user").remove();
    const userId = $(".user-search-add").attr("data-user-id");
    const userName = $(".user-search-add").attr("data-user-name");
    $(".user-search-add").parent().remove();
    var html = addUser(userName, userId);
    $(".js-add-user").append(html);
    addMember(userId);
  });
  $(document).on("click", ".chat-group-user__btn--remove", function(){
    $(".chat-group-user__btn--remove").parent().remove();
  });
});

// $(document).onすることで常に最新のHTMLの情報を取得することができます。
// 今回だとappendさせて作成したHTMLから最新情報を取得する際に使用