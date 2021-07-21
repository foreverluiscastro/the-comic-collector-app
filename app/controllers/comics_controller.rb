class ComicsController < ApplicationController
    
    # GET /comics
    def index
        if session[:user_id]
            user = User.find(session[:user_id])
            comics = user.comics
            render json: comics, include: :user
        else
            render json: { errors: [ "Not Authorized" ]}, status: :unauthorized
        end
    end

    # GET /allcomics
    def public_index
        if session[:user_id]
            comics = Comic.all
            render json: comics, include: :user
        else
            render json: { errors: [ "Not Authorized" ]}, status: :unauthorized
        end
    end

    # GET /allcomics/:id
    def public_show
        if session[:user_id]
            comic = Comic.all.find(params[:id])
            render json: comic
        else
            render json: { errors: [ "Not Authorized" ]}, status: :unauthorized
        end
    end

    # GET /marvelcomics --this controller action was part of a coding challenge
    def marvel_index
        if session[:user_id]
            comics = Comic.publisher
            render json: comics, include: :user
        else
            render json: { errors: [ "Not Authorized" ]}, status: :unauthorized
        end
    end

    # POST /comics
    def create
        if session[:user_id]
            user = User.find(session[:user_id])
            comic = user.comics.create(comic_params)
            # byebug
            if comic.valid?
                render json: comic, include: :user, status: :created
            else
                render json: { errors: [ ]}, status: :unprocessable_entity
            end
        else
            render json: { errors: [ "Not Authorized" ]}, status: :unauthorized
        end
    end

    # GET /comics/:id
    def show
        if session[:user_id]
            user = User.find(session[:user_id])
            comic = user.comics.find(params[:id])
            if comic.valid?
                render json: comic, include: :user
            else
                render json: { errors: []}, status: :unprocessable_entity
            end
        else
            render json: { errors: [ "Not Authorized" ]}, status: :unauthorized
        end
    end

    # PATCH /comics/:id/edit
    def update
        if session[:user_id]
            user = User.find_by(id: session[:user_id])
            comic = user.comics.find(params[:id])
            if comic.valid?
                comic.update(comic_params)
                render json: comic, include: :user
            else
                render json: { errors: []}, status: :unprocessable_entity
            end
        else
            render json: { errors: [ "Not Authorized" ]}, status: :unauthorized
        end
    end

    # DELETE /comics/:id
    def destroy
        if session[:user_id]
            user = User.find_by(id: session[:user_id])
            comic = user.comics.find_by(id: params[:id])
            if comic
                comic.delete
                head :no_content
            else
                render json: { errors: []}, status: :unprocessable_entity
            end
        else
            render json: { errors: [ "Not Authorized" ]}, status: :unauthorized
        end
    end


    private

    def comic_params
        params.permit(:user_id, :title, :publisher, :creators, :img_url, :price, :description)
    end
end
