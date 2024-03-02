const express = require("express");
const router = express.Router();
const PostController = require("../Controllers/postController");

router.post("/create", PostController.createPost);
router.get("/getallposts", PostController.getPost);
router.put("/update/:id", PostController.updatePost);
router.delete("/delete/:id", PostController.deletePost);

module.exports = router;

// post: 데이터를 전송하여 서버에 저장하거나 처리하는 데 사용
// get: 데이터를 가져오는 데 사용된다.
// put: 전체 리소스를 업데이트하는 데 사용
// delete: 데이터를 삭제하는 데 사용
