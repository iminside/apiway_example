class Base


  protected

  def auth?
    error :auth_error unless client[ :user_id ]
  end

  def current_user
    User.find client[ :user_id ]
  end


end
