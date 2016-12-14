# Welcome to UChat Project
UChat project is an open source web chat based on JS.
The chat is mobile friendly (tested mainly on android platform).

![](http://gifyu.com/images/ultrachat.gif)

**The chat has two main components:**
- The Server based on NodeJS with express and socketio. why?
Express - in order to handle the requests relevant to the room part (Add room and get rooms), and socketio in order the handle the pupsub between the users and the server (for example, when user sent a message). 
- The client based on React and bootstrap. Big thanks to  Pavel Komiagin, on the [design](http://bootsnipp.com/snippets/ZlkBn) of the chat.

1. The Server - based on NodeJS (using Express and SocketIO) and MySQL Database.
  * Express - in order to handle the requests relevant to the room part (Add room and get rooms)
  * SocketIO - in order the handle the pupsub between the users and the server (for example, when user sent a message). 
  * **MySQL** - to store the rooms data (only the room's name and description. all of the clients data being stored in-memory by the server).
2.  The Client based on React and Bootstrap (3.0)
  * Comes with already configured Webpack
  * Big thanks to Pavel Komiagin for the main chat [design](http://bootsnipp.com/snippets/ZlkBn) 

# How To run?

1. First clone the project on your local repo.
2. Notice that there are two main folders, **server** and **client**. Both of them have a standalone npm package and you should npm install twice (for every folder).
3. In order to run the client (windows): 
  * open the client folder ('UChat-client/')
  * type: **npm run dev** 
  * in order to build the server in production mode into dist folder (this **will not** run a server for you), type: **npm run prod**
  * open your client page on: http://localhost:8080
4. In order to run the server (windows): 
  * open the client folder ('UChat-server/')
  * type: **npm run dev** 
  * in order to build the server in production mode (this **will** run a server for you), type: **npm run prod**
  * open your server page on: http://localhost:1337
  
Note for linux: if you want to run those commands, you might need to change the scripts in the package config (the set env command).
