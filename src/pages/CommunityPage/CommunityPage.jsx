import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';

const CommunityBoard = () => {
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false); 
  const [newPost, setNewPost] = useState({ id: '', title: '', content: '' });
  const [isCreatingPost, setIsCreatingPost] = useState(false); 
  const userEmail = useSelector((state) => state.user.userInfo.email);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  useEffect(() => {
    handlePostsget();
  }, []);

  const handlePostsget = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/posts/getallposts');
      setPosts(response.data);
    } catch (error) {
      if(error.response) {
        setErrorMessage(error.response.data);
      } else {
        console.error(error);  
      }
    }
  };

  const handleCreatePostButtonClick = () => {
    setIsCreatingPost(true);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/posts/create', newPost);
      const responseData = response.data;
      alert(responseData.message);
      handlePostsget(); 
      setNewPost({ id: '', title: '', content: '' }); 
      setIsCreatingPost(false); 
    } catch (error) {
      if (error.response) {
          setErrorMessage(error.response.data);
      } else {
        console.error(error);
      }
    }
  };

  const handlePostUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/posts/update/${newPost.id}`, newPost);
      const responseData = response.data;
      console.log(responseData.message);
      handlePostsget();
      setNewPost({ id: '', title: '', content: '' });
    } catch (error) {

      console.error(error);
      if (error.response) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage('Error updating post: An error occurred');
      }
    }
  };
  

  const handlePostDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:3000/api/posts/delete/${postId}`);
      handlePostsget();
    } catch (error) {
      console.error(error);
      if (error.response) {
          setErrorMessage(error.response.data);
      } else {
          setErrorMessage('Error deleting post: An error occurred');
      }
    }
  };

  return (
    <Container>
      <h1>Community Board</h1>
      <p>Welcome, {userEmail}</p>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {isCreatingPost ? (
      <PostForm onSubmit={handlePostSubmit}>
        <Input
          type="text"
          name="title"
          value={newPost.title}
          onChange={handleInputChange}
          placeholder="Title"
          required
        />
        <Textarea
          name="content"
          value={newPost.content}
          onChange={handleInputChange}
          placeholder="Content"
          required
        />
        <Button type="submit">Create Post</Button>
      </PostForm>
      ) : (
      <div>
        <Button onClick={handleCreatePostButtonClick}>Create Post</Button>
        <PostList>
          {posts.map((post) => (
            <Post key={post.id}>
              <div style={{width: '60rem'}}>
              <h2 style={{ fontSize: '0.95rem', userSelect: 'none' }}>{post.title}</h2>
              <p style={{ fontSize: '0.75rem', userSelect: 'none' }}>{post.content}</p>
              </div>
              {isEditing ? (
                <EditForm>
                  <Input
                    type="text"
                    name="title"
                    value={newPost.title}
                    onChange={handleInputChange}
                    placeholder="Title"
                    required
                  />
                  <Textarea
                    name="content"
                    value={newPost.content}
                    onChange={handleInputChange}
                    placeholder="Content"
                    required
                  />
                  <Button onClick={handlePostUpdate}>Save</Button> 
                  <Button onClick={() => setIsEditing(false)}>Cancel</Button> 
                </EditForm>
              ) : (
                <div>
                  <Button onClick={() => {setNewPost(post); setIsEditing(true);}}>Edit</Button> 
                  <Button onClick={() => handlePostDelete(post.id)}>Delete</Button>
                </div>
              )}
            </Post>
          ))}
        </PostList>
      </div>
      )}
    </Container>
  );
}

export default CommunityBoard;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  user-select: none;
  padding: 20px;
  margin-top: 5rem;
`;

const PostForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 5rem;
`;

const Button = styled.button`
  padding: 10px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #333;
  }
`;

const PostList = styled.div`
  display: grid;
  grid-gap: 20px;
`;

const Post = styled.div`
  width: 10rem;
  margin-top: 1rem;

  h2 {
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 20px;
  }

  Button {
    margin-right: 10px;
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;

const EditForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
