const { Router } = require("express");
const { createProductAndVariant, 
    getAllProducts, 
    deleteProduct, 
    updateProduct } = require("./product.service");
const {successResponse, errorResponse} = require("./../../../helper");
const { message } = require("./../../../helper/mapping");
const product = new Router();

product.post('/', async (request, response, next) => {
    try {
        const { name, description, price, variants } = request.body;
        await createProductAndVariant({ name, description, price, variants });
        return successResponse(request,response,message["PRODUCT.CREATE.SUCCESS"]);
    }
    catch (error) {
        return errorResponse(request, response, message["PRODUCT.CREATE.ERROR"], 400);
    }

});

product.get("/", async (request, response, next) => {
    try {
        const { name, description, variant_name } = request.query;
        const products = await getAllProducts({ name, description, variant_name });
        return successResponse(request,response,products);
    }
    catch (error) {
        return errorResponse(request, response, message["PRODUCT.GET.ERROR"], 400);
    }
});

product.delete("/:id", async (request, response, next) => {
    try {
        const { id } = request.params;
        await deleteProduct(id);
        return successResponse(request,response,message["PRODUCT.DELETE.SUCCESS"]);
    }
    catch (error) {
        return errorResponse(request, response, message["PRODUCT.DELETE.ERROR"], 400);
    }
});

product.put("/:id", async (request, response, next) => {
    try {
        const { id } = request.params,
            { name, description, price, variants, deleted_variants } = request.body;
        await updateProduct({ id, name, description, price, variants, deleted_variants });
        return successResponse(request,response,message["PRODUCT.UPDATE.SUCCESS"]);
    }
    catch (error) {
        return errorResponse(request, response, message["PRODUCT.UPDATE.ERROR"], 400);
    }
});
module.exports = product;