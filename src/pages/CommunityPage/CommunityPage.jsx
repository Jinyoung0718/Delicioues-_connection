import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const CommunityBoard = () => {
  const [posts, setPosts] = useState([]);
  const [showPostForm, setShowPostForm] = useState(false); 
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const userEmail = useSelector((state) => state.user.userInfo.email);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    const newPost = { title: newPostTitle, content: newPostContent };
    setPosts([...posts, newPost]);
    setNewPostTitle('');
    setNewPostContent('');
    setShowPostForm(false); 
  };

  return (
    <Container>
      <h1>The culinary community</h1>
      <p>Welcome! {userEmail}</p>
      {showPostForm ? (
        <PostForm onSubmit={handlePostSubmit}>
          <Input
            type="text"
            placeholder="제목"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            required
          />
          <Textarea
            placeholder="내용"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            required
          />
          <Button type="submit">POST</Button>
        </PostForm>
      ) : (
        <Button onClick={() => setShowPostForm(true)}>write</Button>
      )}
      <PostList>
        {posts.map((post, index) => (
          <Post key={index}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </Post>
        ))}
      </PostList>
    </Container>
  );
};

export default CommunityBoard;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  margin-top: 5rem;
`;

const PostForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

const PostList = styled.div`
  display: grid;
  grid-gap: 20px;
`;

const Post = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 5px;

  h2 {
    margin-bottom: 10px;
  }
`;
