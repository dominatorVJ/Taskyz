const { Router } = require("express");
const todoController = require("../controllers/todoController");
const { requireAuth } = require("../middleware/authMiddleware");
const router = Router();

router.get("/todos", requireAuth, todoController.todos_get);
router.post("/todos", requireAuth, todoController.todos_post);
router.delete("/todos", requireAuth, todoController.todos_delete);
module.exports = router;
