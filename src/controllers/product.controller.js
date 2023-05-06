const modelTasks = require("../models/task");

module.exports = {
    async GetAllProducts(req, res) {
        try {
            const products = await modelTasks.findAll();
            return res.json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
            return console.error("Error: " + error.message);
        }
    },
    async Create(req, res) {
        try {
            const tasks = req.body;
            const createdTasks = await modelTasks.bulkCreate(tasks);
            return res.json(createdTasks);
        } catch (error) {
            console.error("Error create: " + error);
            return res.status(500).json({ message: error });
        }
    },
    async Update(res, req) {
        try {
            const prod = await modelTasks.findByPk(req.body.uuid);

            if (prod) {
                prod.name = req.body.description;
                prod.description = req.body.description;
                prod.date = req.body.date;
                prod.priority = req.body.priority;
                prod.routineFrequency = req.body.routineFrequency;
                prod.updatedAt = req.body.updatedAt;
                await prod.save;
            }
            return res.json(prod);
        } catch (error) {
            return console.error("Error update: " + error.message);
        }
    },
    async GetById(res, req) {
        try {
            const prod = await modelTasks.findByPk(req.body.uuid);
            return res.json(prod);
        } catch (error) {
            return console.error("Error update: " + error.message);
        }
    },

    async Delete(res, req) {
        try {
            const prod = await modelTasks.findByPk(req.body.uuid);
            await prod.destroy();
            return res.json(prod);
        } catch (error) {
            return console.error("Error update: " + error.message);
        }
    },
};
