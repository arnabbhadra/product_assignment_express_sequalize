const { Product, Variant } = require("./index");
const sequelize = require("./../../config/database");
describe('Variant Model', () => {
    let product_id;
    beforeAll(async () => {
        await sequelize
            .authenticate()
        const product = await Product.create({ name: "test", description: "test description", price: 10 });
        product_id = product.id;
    });
    test('create a variant', async () => {
        try {
            const variant = await Variant.create({
                "name": "new",
                "sku": 1,
                "additional_cost": 0,
                "stock_count": 1,
                product_id,
                "created_at": new Date(),
                "updated_at": new Date(),
            });
            expect(variant.name).toEqual("new");
            expect(variant.sku).toEqual(1);
            expect(variant.additional_cost).toEqual(0);
            expect(variant.stock_count).toEqual(1);
            expect(true).toBe(true);
        }

        catch (error) {
            console.log(error);
            expect(true).toBe(false);
        }

    });
    test("create a variant with partial data.(False case)",async ()=>{
        try{
            await Variant.create({

                "sku": 1,
                "additional_cost": 0,
                "stock_count": 1,
                product_id
            });
            expect(true).toBe(false);
        }
        catch(error){
            expect(true).toBe(true);
        }
        
    });
    afterAll(async ()=>{
        await sequelize.close();
    })
});