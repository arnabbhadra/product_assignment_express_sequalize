const supertest = require("supertest");
const app = require("./../../../app");
const sequelize = require("./../../../config/database");
const App = supertest(app);
describe('API end points test cases',()=>{
    beforeAll(async ()=>{
        await sequelize.authenticate()
    });
    test('CREATE /api/v1/product',async ()=>{
        const payload = {
            "name": "test",
            "description": "test d",
            "price": 12,
            "variants": [
                {
                    "name": "variant",
                    "sku": 2,
                    "additional_cost": 0,
                    "stock_count": 5
                },
                {
                    "name": "variant2",
                    "sku": 15,
                    "additional_cost": 1,
                    "stock_count": 10
                }
            ]
        };
        let response = await App.post('/api/v1/product').send(payload); 
        expect(response.type).toEqual('application/json');
        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        let jsonResponse = JSON.parse(response.text);
        expect(jsonResponse.success).toEqual(true);
        
        expect(jsonResponse.data).toEqual("Product is created successfully.");
        expect(response.status).not.toEqual(201);
        const payloadTwo = {
            "name": "test two",
            "description": "test two description",
            "price": 12,
            "variants": [
                {
                    "name": "variant two",
                    "sku": 5,
                    "additional_cost": 7,
                    "stock_count": 6
                },
                {
                    "name": "variant2",
                    "sku": 15,
                    "additional_cost": 1,
                    "stock_count": 11
                }
            ]
        };
        response = await App.post('/api/v1/product').send(payload); 
        expect(response.type).toEqual('application/json');
        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        jsonResponse = JSON.parse(response.text);
        expect(jsonResponse.success).toEqual(true);
        
        expect(jsonResponse.data).toEqual("Product is created successfully.");
        expect(response.status).not.toEqual(201);
    });
    let id;
    test("GET /api/v1/product",async ()=>{
        
        try{
            let response = await App.get("/api/v1/product");
            expect(response.status).toEqual(200);
            let jsonResponse = JSON.parse(response.text);
            expect(jsonResponse.data.length).toBeGreaterThan(0);
            id = jsonResponse.data[0].id;
            expect(jsonResponse.success).toEqual(true);
            expect(response.status).not.toEqual(201);
            // search with condition
            response = await App.get("/api/v1/product").query({name: "test"});
            expect(response.status).toEqual(200);
            jsonResponse = JSON.parse(response.text);
            expect(jsonResponse.data.length).toBeGreaterThan(0);
            let products = jsonResponse.data;
            expect(products[0].name).toEqual("test");

            response = await App.get("/api/v1/product").query({description: "test d"});
            expect(response.status).toEqual(200);
            jsonResponse = JSON.parse(response.text);
            expect(jsonResponse.data.length).toBeGreaterThan(0);
            products = jsonResponse.data;
            expect(products[0].description).toEqual("test d");

            response = await App.get("/api/v1/product").query({variant_name: "variant"});
            expect(response.status).toEqual(200);
            jsonResponse = JSON.parse(response.text);
            expect(jsonResponse.data.length).toBeGreaterThan(0);
            products = jsonResponse.data;
            expect(products[0].variant_name).toEqual("variant");

        }
        catch(error){
            
            expect(true).toBe(false);
        }
    });
    
    test("PUT /api/v1/product/:id", async ()=>{
        try{
            const payload = { 
                "name": "updated",
            "description": "des",
            "price": 12}
            let response = await App.put(`/api/v1/product/${id}`).send(payload);            
            let jsonResponse = JSON.parse(response.text);
            
            expect(response.status).toEqual(200);
            expect(jsonResponse.data).toEqual("Product is updated successfully.");
        }
        catch(error){
            
            expect(true).toBe(false);
        }
    });
    test("DELETE /api/v1/product/:id", async()=>{
        try{
            let response = await App.delete(`/api/v1/product/${id}`);
            let jsonResponse = JSON.parse(response.text);
            
            expect(response.status).toEqual(200);
            expect(jsonResponse.data).toEqual("Product is deleted successfully.");
        }
        catch(error){
            expect(true).toBe(false);
        }
    })
    afterAll(async ()=>{
        await sequelize.close();
    })
});