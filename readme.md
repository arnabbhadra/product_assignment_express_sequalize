# Express-Sequelize-API
This is a sample project
## Getting Started
You can download this repo or clone using below command. 
```
git clone https://github.com/arnabbhadra/product_assignment_express_sequalize.git
```
or from **Download Zip**
```
https://github.com/arnabbhadra/product_assignment_express_sequalize
```
### Project Setup
Once you clone or download project go into you folder

>now cope **.env.local** file to **.env** file

### Installing
```
> npm install or yarn install  (this will install all dependent libraries)
```

### Database Config Setup
Create new database (let's say i'm going to use mysql and my database name is **product**).
so in my **.env** file will set below parameters.
```
DB_HOST=localhost               # database connection host
DB_USER=root                    # database username
DB_PASS=secret@123              # database password
DB_NAME=product                 # database name
DB_DIALECT=posgres              # database dialect
DB_PORT=5432                    # database port
```
some other inportant parameters/keys in **.env** file
```
APP_HOST=localhost      # application host name
APP_PORT=3000           # application port

### Migration and Seeders run
After creating database and updating .env file run below commands
```
> npm run migrate
> npm run seed
```
### Start the server
`npm run start` to run your project 
