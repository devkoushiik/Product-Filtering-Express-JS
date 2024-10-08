const router = require("express").Router();
const {
  getAllProducts,
  getAllProductStatic,
} = require("../controllers/products");

router.route("/products").get(getAllProducts);
router.route("/static").get(getAllProductStatic);

module.exports = router;
