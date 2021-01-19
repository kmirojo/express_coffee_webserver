const Category = require("../models/category");

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({})
            .sort("description")
            .populate("user", "name email")
            .select("-__v");

        res.json({
            ok: true,
            categories,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error,
        });
        console.log("Get Error: ", error);
    }
};

const getCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findById(id);

        res.json({
            ok: true,
            category,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error,
        });
        console.log("Get Error: ", error);
    }
};

const createCategory = async (req, res) => {
    const { body } = req;

    const category = new Category({
        description: body.description,
        user: req.user._id,
    });

    try {
        const savedCategory = await category.save();

        res.json({
            ok: true,
            category: savedCategory,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error,
        });
        console.log("Post Error: ", error);
    }
};

const updateCategory = async (req, res) => {
    const { id } = req.params;
    const {
        body: { description },
    } = req;

    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { description },
            { new: true, runValidators: true }
        );

        res.json({
            ok: true,
            category: updatedCategory,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error,
        });
        console.log("Put Error: ", error);
    }
};

const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCategory = await Category.findByIdAndRemove(id);

        res.json({
            ok: true,
            message: `Deleted Category: ${deletedCategory.description}`,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error,
        });
        console.log("Delete Error: ", error);
    }
};

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
};
