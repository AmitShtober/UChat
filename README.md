# Welcome to UChat Project
UChat project is an open source web chat based on JS.
The chat is mobile friendly (tested mainly on android platform and chrome).

![](http://gifyu.com/images/ultrachat.gif)

#Features:
1. Brodcast message to all users in every room 
2. Creating rooms and move between them (rooms are the only data which presistent and stored in MySQL)
3. Real live notification when user left or entered the room
4. Recovery mechanism (If the server falls)

#Under the hood
**The chat has two main components:**

1. The Server - based on NodeJS (using Express and SocketIO) and MySQL Database.
  * Express - In order to handle the requests שssociated with rooms (Add room and get rooms)
  * SocketIO - In order the handle the pupsub between the users and the server (Sending a message). 
  * **MySQL** - To store the rooms data (only the room's name and description. all of the clients data being stored in-memory by the server).
2.  The Client based on React and Bootstrap (3.0)
  * Comes with already configured Webpack
  * Big thanks to Pavel Komiagin for the main chat [design](http://bootsnipp.com/snippets/ZlkBn) 

# How To run?

1. First clone the project to your local repo.
2. Notice that there are two main folders, **server** and **client**. Both of them have a standalone npm package and you should npm install twice (for every folder).
3. configuration files (dev and production are inside):
  * **client**: 'UChat-client/config' - contains the server address
  * **server**: 'UChat-server/config' - containts the MySQL connection string
4. In order to run the **client** (windows): 
  * open the client folder ( 'UChat-client/')
  * type: **npm run dev** 
    * in order to build the server on production mode into dist folder (this **will not** run a server for you), type: **npm run prod**
  * open your client page on: http://localhost:8080
5. In order to run the **server** (windows): 
  * open the client folder ('UChat-server/')
  * type: **npm run dev** 
    * in order to build the server in production mode (this **will** run a server for you), type: **npm run prod**
  * open your server page on: http://localhost:1337
  
Note for linux: if you want to run those commands, you might need to change the scripts in the package config (the set env command).

#What's next?
Well, this is only the alpha version (0.1). 
Before it will become stable, I'm planning to add UTests to both the server and the client.
From the feature prespective:

1. adding the option to delete or rename room
2. adding control panel for managment
3. adding logs (maybe use elasticsearch or splunk)

#Contribute
Well, I would love that. Just ask to pull request and I will review your code.
If thoses changes are core wise, please pm me first. Thank you.


  
