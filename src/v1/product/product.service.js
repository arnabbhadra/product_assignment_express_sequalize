const { Product, Variant } = require("../../../db/models");
const { sequelize } = require("./../../../db/models");
// create a product
async function createProduct({ name, description, price, transaction }) {
    const newProduct = await Product.create(
        {
            name, description, price
        },
        {
            transaction
        }
    );
    return { id: newProduct.id };
}
// insert variants for a product 
async function createBulkVariants(variants, transaction) {
    return await Variant.bulkCreate(variants, { transaction });
}
// create new product and its variant
exports.createProductAndVariant = async function (product) {
    try {
        const { name, description, price, variants } = product;
        await sequelize.transaction(async transaction => {
            const product = await createProduct({ name, description, price, transaction });
            if (variants && Array.isArray(variants) && variants.length > 0) {
                const variantList = variants.map(variant => {
                    return {
                        name: variant.name,
                        sku: variant.sku,
                        additional_cost: variant.additional_cost,
                        stock_count: variant.additional_cost,
                        product_id: product.id
                    };
                });
                await createBulkVariants(variantList, transaction);
            }
        })
        return
    }
    catch (error) {
        
        throw error;
    }
}
// get all products with details
exports.getAllProducts = async function ({
    name,
    description,
    variant_name
}) {
    try {
        // search condition check
        let condition = ``;
        if (name) {
            condition+= `and p.name = '${name}'`;
        }
        if (description) {
            condition += `and p.description = '${description}'`;
        }
        if(variant_name){
            condition += `and v.name = '${variant_name}'`;
        }
        const selectQuery = `select p.id, p.name, p.description, p.price, v.name as variant_name, 
                            v.sku, v.additional_cost, v.stock_count, v.id as variant_id from products p left join
                            public.variants v on p.id = v.product_id where (not p.deleted) and 
                            (not v.deleted)  ${condition}`
        const [products, metaData] = await sequelize.query(selectQuery);
        return products;
    }
    catch (error) {
        
        throw (error);
    }
}

// delete a product and its variants
exports.deleteProduct = async function deleteProduct(id) {
    try {
        await sequelize.transaction(async transaction => {
            await Product.update({ deleted: true }, { where: { id }, transaction });
            await Variant.update({ deleted: true }, { where: { product_id: id }, transaction })
        });
        return;
    }
    catch (error) {
        
        throw error;
    }
}
// delete variant function
async function deleteVariants(condition, transaction) {
    return Variant.update({ deleted: true }, { where: condition, transaction })
}
// update variant function
async function updateVariant(updatedField, condition, transaction) {
    return Variant.update(updatedField, { where: condition, transaction })
}

// update product information
exports.updateProduct = async function updateProduct(product) {
    try {
        const { name, description, price, variants, id, deleted_variants } = product;
        const updatedField = {}
        if (name)
            updatedField.name = name;
        if (description)
            updatedField.description = description;
        if (price)
            updatedField.price = price;
        let newVariants = [];
        let updatedVariants = [];
        if (variants && variants.length > 0) {
            newVariants = variants.filter(variant => !variant.id);
            updatedVariants = variants.filter(variant => variant.id);
        }
        const dbRequests = []
        await sequelize.transaction(async transaction => {
            dbRequests.push(Product.update(updatedField, { where: { id }, transaction }));
            // if new variant(s) is/ are added during product update
            if (newVariants.length > 0) {
                newVariants = newVariants.map(variant => {
                    return { ...variant, product_id: id }
                })
                dbRequests.push(createBulkVariants(newVariants, transaction));
            }
            // variant information is updating
            if (updatedVariants.length > 0) {
                dbRequests.push(updatedVariants.map((variant) => {
                    updateVariant(variant, { id: variant.id, product_id: id, deleted: false }, transaction);
                }));
            }
            // if any variant(s) is(are) deleted
            if (deleted_variants && Array.isArray(deleted_variants) && deleted_variants.length>0) {
                dbRequests.push(deleteVariants({id: deleted_variants}, transaction));
            }
            // all db calls
            await Promise.all(dbRequests);
            return
        });
        return
    }
    catch (error) {  
        console.log(error);     
        throw error;
    }
}