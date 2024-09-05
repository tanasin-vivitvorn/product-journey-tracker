const ProductService = require('../services/ProductService');
const productAttributeService = require('../services/ProductAttributeService');
const { CreateProductDTO, EditProductDTO } = require('../dto/create-product.dto');
const SearchProductDTO = require('../dto/search-product.dto');

class ProductController {
    getProductById = async (req, res) => {
      const productId = req.params.id;
        try {
            const product = await ProductService.getProductById(productId);
            if (!product) 
                return res
                    .status(404)
                    .json({id: productId, message: 'Product not found'});
            res.json(product);
        } catch (error) {
            res
                .status(500)
                .json({id: productId, message: error.message});
        }
    }

    createProduct = async (req, res) => {
        try {
            const createProductDto = new CreateProductDTO(req.body);
            console.log(1);
            createProductDto.validate();
            console.log(2);

            const product = await ProductService.createProductWithAttributes(createProductDto);
            res.status(201).json(product);
        } catch (error) {
            res
                .status(400)
                .json({message: error.message});
        }
    }

    editProduct = async (req, res) => {
        try {
            const editProductDto = new EditProductDTO(req.body);
            editProductDto.validate();
            const product = await ProductService.editProduct(editProductDto);
            res
                .status(200)
                .json(product);
        } catch (error) {
            console.log(error);
            res
                .status(400)
                .json({message: error.message});
        }
    }

    deleteProduct = async (req, res) => {
        try {
            const productId = req.body.ProductID;
            const product = await ProductService.deleteProduct(productId);
            res
                .status(200)
                .json({message: 'Product deleted successfully', product});
        } catch (error) {
            res
                .status(500)
                .json({message: error.message});
        }
    }

    searchProducts = async (req, res) => {
        try {
            const searchProductDto = new SearchProductDTO(req.body);
            searchProductDto.validate();

            const products = await ProductService.searchProducts(
                searchProductDto.query,
                searchProductDto.pagination
            );
            res.json(products);
        } catch (error) {
            res
                .status(400)
                .json({message: error.message});
        }
    }
    
    getAllProducts = async (req, res) => {
        try {
            const products = await ProductService.getAllVisibleProducts();
            res
                .status(200)
                .json(products);
        } catch (error) {
            res
                .status(400)
                .json({error: error.message});
        }
    };

    softDeleteProduct = async (req, res) => {
        try {
            const product = await ProductService.softDeleteProduct(req.params.id);
            if (!product) {
                return res
                    .status(404)
                    .json({error: 'Product not found'});
            }
            res
                .status(200)
                .json(product);
        } catch (error) {
            res
                .status(400)
                .json({error: error.message});
        }
    };
}

module.exports = new ProductController();
