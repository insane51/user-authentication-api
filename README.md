# user-authentication-api

## Pre-System Requirements

Before running this application, ensure that your system meets the following requirements:

- Node.js (version 16.17.1) [https://shorturl.at/bfwAY]
- npm (version 8.15.0) [https://shorturl.at/HJPTX]
- mongo (version 6.0.6) [https://shorturl.at/syOU6]

## Clone the code to your local machine

How you can run the code in local machine:
1. Clone the repository: [https://shorturl.at/knBI9]
        method 1. Open your terminal or command prompt and navigate to the directory where you want to clone the repository. Then, run the following command: <git         clone https://github.com/insane51/user-authentication-api.git>.
        method 2: Open the link : https://github.com/insane51/user-authentication-api ,go to code(green button),then click on 'Download zip'.
        A zip file was downloaded,extract it using any zip extrater software(like winRAR).

2.Install dependencies: Navigate to the cloned repository directory and install the required 
                        dependencies.Typically, Node.js projects use a package.json file to
                        manage dependencies. Run the following command:
                        
                        npm install :This command will read the package.json file and install 
                        all the required dependencies listed in it.
                        [https://shorturl.at/iqFGX].


3.Set up a MongoDB database: Ensure that you have MongoDB installed and running on your local 
    machine.Create a MongoDB database if it's required by the project. Note down the MongoDB connection details (e.g., host, port, database name) for the next step.
    [https://shorturl.at/jpFQZ]

4.Configure the application: Check if the project requires any configuration files or 
    environment variables. Look for any configuration files (e.g., .env) or instructions on how to set up environment variables. Provide the necessary configurations, such as the MongoDB connection details, in the appropriate files or environment variables.
    [https://shorturl.at/kBI59].

5.Run the application: Once the dependencies are installed and the application is configured, 
                        you can start the Node.js server by running the following command:
                        
                        npm start

6.Access the application: After the server starts successfully, you can access the application in 
                        your web browser or make requests to the defined endpoints using tools like 
                        cURL or Postman. The application may run on a specific port, such as localhost:3000, depending on the configuration.


Now app is running at your localhost and port.

## API documentation of the application

How to open API documentation:

1.Ensure that your Node.js application is running locally and the Swagger documentation is configured correctly. Make sure you have completed the necessary setup and integration steps for Swagger in your application.

2.Open a web browser of your choice.

3.Enter the URL for the Swagger API documentation endpoint in the address bar. In this case, it would 
    be http://localhost:<port>/api-docs. Replace <port> with the port number on which your Node.js application is running locally.
    For example, if your Node.js application is running on port 3000 locally, you would enter 
    http://localhost:3000/api-docs in the browser's address bar.

4.Press Enter or Return to load the URL.

5.The Swagger API documentation page should now be displayed in your web browser. It provides a user-friendly interface to browse and interact with your API documentation. You can explore the available endpoints, their descriptions, request parameters, and example responses.

6.Use the Swagger UI to navigate through the documentation and interact with the available endpoints. You can expand the endpoints, view the request/response details, and even test the API directly from the Swagger UI interface.


## File structure of the code:


- controllers
    - userAuthController :- register,login and logout controllers will be defined
    - userController :- get user profile and update user profile controller will defined
    - validator :- To validater functions will be defined
    - verifyToken :- Token verification functions will be defined
    - verifyTokenBlockList :- Check for token is not added in block list function defined
- models
    - expiredToken :- Model define to store blocked tokens
    - user :- User model define
- routes
    - userRoutes :- Define user routes
- .env 
- .gitignore
- index.js :- Main app starting file/point
- package-lock.json
- package.json :-All dependencies will be defined
- README.md




