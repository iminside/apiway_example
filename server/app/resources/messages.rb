class MessagesResource < ApplicationResource

  include Apiway::Resource

  depend_on Message, User


  access do
    auth?
  end


  data do

    Message.limit( params[ :limit ] ).order( created_at: :desc ).reverse.map do |message|
      {
        id:   message.id,
        text: message.text,
        user: message.user.name
      }
    end

  end



end
