# Pardon My French

[pardon-my-french.herokuapp.com](https://pardon-my-french.herokuapp.com)

Pardon My French is a web application geared towards helping users learn the French language. Users must create an account in order to access the site, but upon registering, they can then create and store custom flashcards. Cards can also be saved to a deck, which help to categorize users' cards into unique subjects. After the user has finished creating their cards, they can toggle from "Creation Mode" to "Study Mode" and begin studying. Decks are listed with a count of the number of cards included in each deck, and a user can select one in order to flip through the associated cards.

### Set-up

*If you wish to contribute to this repo or run the project locally on your own development server, follow these set-up instructions...*

Fork or clone down this repo to get started:
```
$ git clone git@github.com:NessEFC/pardon_my_french.git
```

`cd` into the directory:
```
$ cd pardon_my_french
```

Then run:
```
$ bundle install
```

Be sure to also run these `rake` commands:
```
$ rake db:create
$ rake db:migrate
```

To launch the local dev server:
```
$ rails s
```
...and navigate to http://localhost:3000


### Version Information

This app was built using Ruby 2.4.1 and Rails version 5.1.1. Check to see if you have these versions installed on your machine.

### Author

Craig Ness
