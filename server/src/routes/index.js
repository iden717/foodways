const express = require("express");

const router = express.Router();

const {
  getUsers,
  deleteUser,
  addUser,
  getUser,
  test,
  getPartner,
} = require("../controllers/user");

const {
  getProducts,
  getProductsPartner,
  getDetailProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

const {
  getTransaction,
  getDetailTransaction,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  customerTransaction,
} = require("../controllers/transaction");

const { register, login, findUser } = require("../controllers/auth");

const { checkAuth } = require("../middlewares/auth");
const {
  checkRolePartner,
  checkRoleCustomer,
} = require("../middlewares/checkRole");

//auth
router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", checkAuth, findUser);

//for admin
router.get("/users", getUsers);
router.delete("/user/:id", deleteUser);
router.get("/user/:id", getUser);

// partner
router.get("/partners", getPartner);

//product
router.get("/products", getProducts);
router.get("/products/:id", getProductsPartner);
router.get("/product/:id", getDetailProduct);
router.post("/product", checkAuth, checkRolePartner, addProduct);
router.patch("/product/:id", checkAuth, checkRolePartner, updateProduct);
router.delete("/product/:id", checkAuth, checkRolePartner, deleteProduct);

//transaction
router.post("/transaction", checkAuth, checkRoleCustomer, addTransaction);
router.get("/transactions", checkAuth, checkRolePartner, getTransaction);
router.get(
  "/customer-transaction",
  checkAuth,
  checkRoleCustomer,
  customerTransaction
);
router.delete(
  "/transaction/:id",
  checkAuth,
  checkRolePartner,
  deleteTransaction
);
router.patch(
  "/transaction/:id",
  checkAuth,
  checkRolePartner,
  updateTransaction
);
router.get(
  "/transaction/:id",
  checkAuth,
  checkRolePartner,
  getDetailTransaction
);

module.exports = router;
