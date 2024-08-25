const express = require("express");
const router = express.Router();
const {validatorCreateItem,validatorGetItem} = require("../validators/tracks")
const authMiddleware = require("../middleware/session")
const { getItems,getItem,createItem,deleteItem,updateItem } = require("../controllers/tracks");
const checkRol = require("../middleware/rol");

//TODO http://localhost/tracks GET,POST,DELETE,PUT

router.get("/", getItems);
router.get("/:id",authMiddleware, validatorGetItem,getItem);
router.post("/",
authMiddleware,
checkRol(["user","admin"]),
 validatorCreateItem,createItem);
router.put("/:id",authMiddleware, validatorGetItem,validatorCreateItem, updateItem);
router.delete("/:id",authMiddleware,validatorGetItem, deleteItem);


module.exports = router;
