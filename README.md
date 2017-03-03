# Dominion card-search app

## Overview

### What is this app for?
My intention is to create a new resource for players of the popular [Dominion](https://boardgamegeek.com/boardgame/36218/dominion) card game, designed by Donald X Vaccarion and published by [Rio Grande Games](http://riograndegames.com/). The site's main feature will be a searchable database of all cards in all Dominion expansions (including both editions of the base set and Intrigue, and all promos), searchable by everything you could possibly imagine - including cost, type(s) and card text. Want to know at a glance which cards cost less than 4 and refer to trashing (either your own or your opponent's cards)? Or which Prosperity cards explicitly interact with Treasure cards? Or even how many cards have "Village" in the name? You will be able to find these answers, and many more, within seconds.

I intend to allow users to click through to a full page on each card, complete with the card image and a link to the appropriate article on the [Dominion Strategy Wiki](http://wiki.dominionstrategy.com/index.php/Main_Page).

This app will serve as my submitted project for Stream 1 (Front End Development) of the [Code Institute's](https://www.codeinstitute.net/) Full Stack developer course.

## Features
Intended features include:
- The card search page mentioned above
- a collection of links to other resources, including card-picker sites, strategy articles, places to purchase the game, and to play online.
- a glossary of terms used in discussing the game, both those defined in the rules (eg. "trash", "Duration") and those used in discussing strategy (eg. "engine", "cantrip"). Perhaps to be implemented via Bootstrap tooltips.

## Tech Used

### Some of the tech used includes:
- [AngularJS](https://angularjs.org/)
    - **AngularJS** will be used to handle page routing, to enable the card search using filters, and the links to individual card pages using directives
- [Bootstrap](http://getbootstrap.com/)
    - **Bootstrap** is used for basic styling and grid layout, and for tooltips as mentioned above if I decide they are a good fit.
- [npm](https://www.npmjs.com/)
    - **npm** is used to help manage some of the dependencies in the application
- [bower](https://bower.io/)
    - **Bower** is used to manage the installation of the required libraries and frameworks


## How to run on your machine

### Getting the code up and running
1. Firstly you will need to clone this repository by running the ```git clone https://github.com/robinzigmond/Dominion-app``` command
2. After you've that you'll need to make sure that you have **npm** and **bower** installed
  1. You can get **npm** by installing Node from [here](https://nodejs.org/en/)
  2. Once you've done this you'll need to run the following command:
     `npm install -g bower # this may require sudo on Mac/Linux`
3. Once **npm** and **bower** are installed, you'll need to install all of the dependencies in *package.json* and *bower.json*
  ```
  npm install
 
  bower install
  ```
4. After those dependencies have been installed you'll need to make sure that you have **http-server** installed. You can install this by running the following: ```npm install -g http-server # this also may require sudo on Mac/Linux```
5. Once **http-server** is installed run ```http-server```
6. The project will now run on [localhost](http://127.0.0.1:8080)
