![Preview](https://raw.githubusercontent.com/acharist/mern-stack/master/preview.jpg)

This full stack application is build only for demonstration purposes.
Application based on MERN stack (Mongo Express React Node).


At the root of the project are two directories “client” and “server”.

Going to the “server”, do:
```
npm install
```

And then:
```
npm client-install
```


After cloning the repository and installing all the packages, it is necessary in the directory
"server" add .env file.
Next, make the following changes there:
```
SECRET_KEY = secret_key
HOST = host_adress  
PORT = host_port  
DB_HOST = db_host_adress  
DB_PORT = db_host_port  
DB_COLLECTION_NAME = name_of_db_collection
```

Now you can start the dev server.
```
npm dev
```