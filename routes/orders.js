const { Router } = require("express");
const router = Router();

const { getOrders, getSpecificOrder, getMobbexOrderData, getShipnowData } = require("../controllers/orders");

router.get("/getorders", getOrders)
router.get("/mobbex/:id", getMobbexOrderData)
router.get("/shipnow/:id/", getShipnowData)
router.get("/:id", getSpecificOrder)

module.exports = router;
