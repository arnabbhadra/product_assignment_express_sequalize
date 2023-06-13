const { Product, Variant } = require("./index");
const sequelize = require("./../../config/database");
describe('Product Model', () => {
    beforeAll(async () => {
        await sequelize
            .authenticate()
    });
    test('create a product',async ()=>{
        try{
            await Product.create({name:"test", description:"test description",price:10});
            expect(true).toBe(true);
        }
        catch(error){
            expect(true).toBe(false);
        }
    })
    afterAll(async ()=>{
        await sequelize.close();
    })
})