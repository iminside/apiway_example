class MessagesController < ApplicationController

  include Apiway::Controller


  before_action :auth?


  action :new do

    begin
      current_user.messages.create! text: params[ :text ]
    rescue ActiveRecord::RecordInvalid => e
      error e.record.errors.full_messages
    else
      true
    end

  end


end
