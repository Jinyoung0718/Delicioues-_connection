const mysql = require("mysql2");
const dbInfo = require("../mysqlConfig.json");

const connection = mysql.createConnection(dbInfo);

connection.connect();

exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    // // 비구조화 할당: 쿼리 실행 결과를 받아오는데 사용되는 배열의 첫 번째 요소에 중괄호로 감싼다
    const [result] = await connection
      .promise()
      .execute("INSERT INTO posts (title, content) VALUES (?, ?)", [
        title,
        content,
      ]);
    res.status(201).json({ message: "Post created", postId: result.insertId });
    //  클라이언트에게 새로운 게시물의 id를 반환해야 하기 때문에 json을 사용
  } catch (error) {
    res.status(500).send("Error creating post");
  }
};

exports.getPost = async (req, res) => {
  try {
    const [rows] = await connection.promise().query("SELECT * FROM posts");
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching posts");
  }
};

exports.updatePost = async (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;
  try {
    const [result] = await connection
      .promise()
      .execute("UPDATE posts SET title = ?, content = ? WHERE id = ?", [
        title,
        content,
        postId,
      ]);
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Post not found" });
    }
    res.status(200).send("Post updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating post");
  }
};

exports.deletePost = async (req, res) => {
  const postId = req.params.id;
  // 라우팅된 URL의 파라미터 /delete/:id <- 포스트의 ID를 나타낸다.
  try {
    const [result] = await connection
      .promise()
      .execute("DELETE FROM posts WHERE id = ?", [postId]);
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Post not found" });
      // 클라이언트가 요청한 자원을 찾을 수 없을 때 반환되는 상태 코드
    }
    res.status(200).send("Post deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting post");
  }
};
