# The Comic Collector App

This app uses a Rails API and React frontend. For ease of deployment, both projects are contained in the same repository. All the React Code is in the `/client` directory during development.

## Setup

To run the app locally, install Rails and React dependencies and set up the database. This app uses Postgresql as a database.

```sh
bundle install
rails db:create db:migrate
npm install --prefix client
sudo service postgresql start
```
## Running the App locally

Click on the icon of a box split down the middle located in your terminal. This will create a Split terminal that will allow you to see the frontend and backend simultaniously. Run each command in it's own respective terminal to start the frontend and backend servers:

```sh
npm start --prefix client
```

```sh
rails s
```

## About the App
My name is Luis Dejesus Castro, I am 27 years old from New York City and I am the creator behind the Comic Collector App. I built the app during the coronavirus pandemic with the intention of connecting people during a time where connection is needed the most. I've always been a comic book collector, and I know that comic book enthusiasts are typically seen as anti-social people but you don't fully realize how social of an activity comic book collecting is until you can't go to the comic shop anymore. When you're there in person you can talk to the staff and share your thoughts on certain books which will help you find more books. This was the entire motivation behind The Comic Collector: To create a space where comic book fans can share and connect with each other about the comic books they are currently reading. This allows users the same social experience of a comic book shop and the benefits on being informed about books berfore you make a purchase without the risk of exposure to COVID-19.

## Video Demo

You can view a demo of this app [here](https://www.youtube.com/watch?v=lL3vUXV6tTc).