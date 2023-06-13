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


### Installing
```
> npm install (this will install all dependent libraries)
```

### Database Config Setup
Create new database (let's say we going to use postgres and database name is **product**).
so in the **.env** file will set below parameters.
```
DB_HOST=localhost               # database connection host
DB_USER=root                    # database username
DB_PASS=secret@123              # database password
DB_NAME=product                 # database name
DB_DIALECT=postgres              # database dialect
DB_PORT=5432                    # database port
```
some other inportant parameters/keys in **.env** file
```
APP_HOST=localhost      # application host name
APP_PORT=3000           # application port
```
### Migration and Seeders run

After creating database and updating .env file run below commands
```
> npm run migrate
> npm run seed
```
### Start the server
`npm run start` to run your project 

### Run test cases
`npm run test` to run test cases

### Project Architecture Decision.
In this requirement, product details and its different variants need to be stored, fetched updated and deleted.
**Product** has three major properties ***name***, ***description*** and ***price***.
**Variant** has ***name***, ***SKU***, ***additional cost*** and ***stock count***.
A product can be of multiple variants and from that we can derive that
product is in **One-to-Many** relationship with variants.
