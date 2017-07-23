class SessionsController < ApplicationController

  def new; end

  def create
    @user = User.find_by(email: params[:session][:email])
    if @user && @user.authenticate(params[:session][:password])
      session[:user_id] = @user.id
      redirect_to root_path
      flash[:success] = "Welcome back #{@user.first_name}, let's get started!"
    else
    end
  end

end
