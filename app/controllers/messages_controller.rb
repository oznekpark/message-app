class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
    @latestMessage = @group.messages.order(updated_at: :desc).limit(1)
  end

  def create
    # @message = Message.new(message_params)は送信できない
    @message = @group.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.html {redirect_to group_messages_path(@group)}
        format.json
      end
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end
  end

  private
  def message_params
    params.require(:message).permit(:text, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
