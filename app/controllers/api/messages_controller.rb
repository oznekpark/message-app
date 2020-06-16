class Api::MessagesController < ApplicationController
  def index
    group = Group.find(params[:group_id])
    last_messages_id = params[:id].to_i
     # 取得したグループでのメッセージ達から、idがlast_message_idよりも新しい(大きい)メッセージ達のみを取得
    @messges = group.messages.includes(:user).where("id > ?", last_messages_id)
  end
end