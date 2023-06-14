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
One can find the table structure in the migration folder.
## APIs
### Create a product
Api to create a product and its variant(s)(variant is optional. one can add variants later using update api).
```
> POST : http:http://localhost:3000/api/v1/product  
> Payload: name, description, price, variants (optional)
> Payload Example :
{
    "name": "product",
    "description": "des",
    "price": 12,
    "variants": [
        {
            "name": "variant.name",
            "sku": 1,
            "additional_cost": 0,
            "stock_count": 1
        },
        {
            "name": "variant2",
            "sku": 14,
            "additional_cost": 1,
            "stock_count": 100
        }
    ]
}
> Response:
{
    "code": 200,
    "data": "Product is created successfully.",
    "success": true
}

```
### Get products
API to get list of products and other details
```
> GET : http://localhost:3000/api/v1/product
> Query Params: name (optional), description(optional), variant_name(optional)
> Response:
{
    "code": 200,
    "data": [
        {
            "id": 12,
            "name": "m",
            "description": "d",
            "price": 12,
            "variant_name": "new variante",
            "sku": 1,
            "additional_cost": 0,
            "stock_count": 1,
            "variant_id": 4
        }
    ],
    "success": true
}
```
### Delete a product
API to delete a product
```
> DELETE : http://localhost:3000/api/v1/product/:id
> PARAM : id
> RESPONSE:
{
    "code": 200,
    "data": "Product is deleted successfully.",
    "success": true
}
```
### Update a Product and variant(s)
API to update product details, delete variants, add new variants as well as update variants
Note: if one wants to delete variant(s) of a particular product, add variant id in
***deleted_variants*** list. If one wants to add a new variant, put the object (with out id field) in ***variants*** list and to update variant, keep variant with id in ***variants*** list.

```
> PUT : http://localhost:3000/api/v1/product/:id
> PARAM : id
> PAYLOAD : name (optional) description(optional), price(optional), deleted_variants(optional), variants(optional)
>PAYLOAD EXAMPLE:
{
    "name": "m",
    "description": "d",
    "price": 12,
    "deleted_variants": [
        2
    ],
    "variants": [
        {
            "name": "new variante",
            "sku": 1,
            "additional_cost": 0,
            "stock_count": 1
        },
        {
            "id": 2,
            "name": "update Variant",
            "sku": 14,
            "additional_cost": 12,
            "stock_count": 13
        }
    ]
}
> RESPONSE
{
    "code": 200,
    "data": "Product is updated successfully.",
    "success": true    
}
```