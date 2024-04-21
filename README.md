# Software-Backend

Backend for the software project named Digitalize the Design Credit Process.
The backend is in Node.Js which is deployed on the AWS server of ec2 instance and the database is mongodb server. To run the server follow these steps.

## Installation
Clone the repo or download the zip file and open the root directory of the project.
## Step1: Install the necessary requirements.
### a) Check the node.js installed in your pc or not.

```bash
node --version
```

if not found the node version first install it and save the enviroment variables and again run the command.

```bash
node --version
```

## Step2: Install the project necessary requirements.
Now run to install all the dependecnies to run the server

```bash
npm i
```
Now you can confirm that all dependencies are installed or not in package.json files.
There are enviroment variables also you have to configure by yourself. Like in the app.js file there are enviroment variables used and also there are mongodb password required which you have to yours.

Finally run the command 
```bash
npm start 
```

This will start the server in the localhost  and the defined port in .env file.

You can access in the browser by http://13.201.24.145:5000/

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/linses/mit/)