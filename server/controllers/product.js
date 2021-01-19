const Product = require("../models/product");

const getProducts = async (req, res) => {
    // ↓ Route GET Paramas ↓
    // GET param must be ?from=x
    const fromQueryIndex = Number(req.query.from) || 0;
    // GET param must be ?limit=Y
    const queryLimit = Number(req.query.limit) || 0;

    try {
        const products = await Product.find({ available: true })
            .skip(fromQueryIndex)
            .limit(queryLimit)
            .populate("user", "name email")
            .populate("category", "description");

        res.json({
            ok: true,
            products,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error,
        });
        console.log("Get Error: ", error);
    }
};

const getProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);

        res.json({
            ok: true,
            product,
        });
    } catch (error) {
        if (error.kind === "ObjectId") {
            res.status(401).json({
                ok: false,
                error: "Wrong Product ID",
            });
            console.log("Get Error: ", error);
        } else {
            res.status(500).json({
                ok: false,
                error,
            });
            console.log("Get Error: ", error);
        }
    }
};

const createProduct = async (req, res) => {
    const {
        body: { name, unitPrice, description, available, category },
        user: { _id },
    } = req;

    const product = new Product({
        user: _id,
        name,
        unitPrice,
        description,
        available,
        category,
    });

    try {
        const savedProduct = await product.save();
        res.json({
            ok: true,
            product: savedProduct,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error,
        });
        console.log("Post Error: ", error);
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const dbProduct = await Product.findById(id);

        const {
            name = dbProduct.name,
            unitPrice = dbProduct.unitPrice,
            description = dbProduct.description,
            available = dbProduct.available,
            category = dbProduct.category,
        } = req.body;

        dbProduct.name = name;
        dbProduct.unitPrice = unitPrice;
        dbProduct.description = description;
        dbProduct.available = available;
        dbProduct.category = category;

        const product = await dbProduct.save();

        res.json({
            ok: true,
            id,
            product,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error,
        });
        console.log("Put Error: ", error);
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);

        product.available = false;

        await product.save();

        res.json({
            ok: true,
            product,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error,
        });
        console.log("Delete Error: ", error);
    }
};

const searchProduct = async (req, res) => {
    const { input } = req.params;
    const regex = new RegExp(input, "i"); // "i" -> Mayus/Minus insensibility

    try {
        const products = await Product.find({
            name: regex,
            available: true,
        }).populate("category", "name");

        res.json({
            ok: true,
            products,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error,
        });
        console.log("Get Error: ", error);
    }
};

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProduct,
};
