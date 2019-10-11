![Preview](https://raw.githubusercontent.com/acharist/mern-stack/master/preview.jpg)

This full stack application is build only for demonstration purposes.
Application based on MERN stack (Mongo Express React Node).

There are two directories at the root of the project: “client” and “server”.

Going to the “server”, do:
```
npm install
```

After that, go to the "client" directory:
```
npm install
```

After cloning the repository and installing all its packages, you need to add the .env file in the "server" directory.
Next, make the following changes there:
```
SECRET_KEY = secret_key
HOST = host_adress  
PORT = host_port  
DB_HOST = db_host_adress  
DB_PORT = db_host_port  
DB_COLLECTION_NAME = name_of_db_collection
```

Now you can start client and server independently.

In server directory:
```
npm run server
```

In client directory:
```
npm run client
```