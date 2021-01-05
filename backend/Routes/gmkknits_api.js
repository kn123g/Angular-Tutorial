const express = require("express");
const router = express.Router();

const gmkknitsController = require("../controllers/gmkknits_api");

router.post("/invoiceReplicate",gmkknitsController.invoiceUpdate);

module.exports= router;
