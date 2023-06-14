const { Product } = require("./index");
const sequelize = require("./../../config/database");
describe('Product Model', () => {
    beforeAll(async () => {
        await sequelize
            .authenticate()
    });
    test('create a product',async ()=>{
        try{
            const product = await Product.create({name:"test", description:"test description",price:10});
            expect(product.name).toEqual("test");
            expect(product.description).toEqual("test description");
            expect(product.price).toEqual(10);
            expect(true).toBe(true);
        }
        catch(error){
            expect(true).toBe(false);
        }
    });
    test('create a product with partial data (False case)', async ()=>{
        try{
            await Product.create({name:"test", description:"test description"});
            expect(true).toBe(false);
        }
        catch(error){
            expect(true).toBe(true);
        }
    });
    afterAll(async ()=>{
        await sequelize.close();
    })
})