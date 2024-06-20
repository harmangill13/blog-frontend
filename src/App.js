import './App.css';
// import components
import AllPosts from './pages/AllPosts'
import Form from './pages/Form'
import SinglePost from './pages/SinglePost';
// import hooks
import { useState, useEffect } from 'react'
// import components from React Router
import { Route, Routes } from 'react-router-dom'


// OUR API URL
const apiURL = 'https://blog-app3-b071a1d9acec.herokuapp.com'
// 'https://blog-app3-b071a1d9acec.herokuapp.com/'

function App() {
  // setup state for our Posts
  const [posts, setPosts] = useState([])
  
  //functions
  const getBlogs = async () => {
    const response = await fetch(apiURL + '/blogs/')
    const data = await response.json()
    console.log(data)
    setPosts(data)
  }

  const handleFormSubmission = async (data, type) => {
    if(type === 'new') { 
      const response = await fetch(`${apiURL}/blogs/`, {
        method: 'post', 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      getBlogs()
    } else {
      const response = await fetch(`${apiURL}/blogs/${data.id}/`, {
        method: 'put',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      getBlogs()
    }
  }

  const deleteBlog = async (id) => {
    const response = await fetch(`${apiURL}/blogs/${id}/`,
    {
      method: 'delete'
    })
    getBlogs()
  }


  //useEffect
  useEffect(() => {
    getBlogs()
  }, [])

  return (
    <div className="App">
      <h1>My Blogs</h1>
      <Routes>
        <Route
          exact 
          path ="/"
          element={<AllPosts posts={posts} deleteBlog={deleteBlog} />}
        />
        <Route
          exact 
          path ="/post/:id"
          element={<SinglePost posts={posts} />}
        />
        
        <Route
          exact 
          path ="new"
          element={<Form posts={posts} handleSubmit={handleFormSubmission} buttonLabel='Add Blog' formType='new' />}
        />

        <Route
          exact 
          path ="edit/:id"
          element={<Form posts={posts} handleSubmit={handleFormSubmission} buttonLabel='Edit Blog' formType='edit' />}
        />

      </Routes>
    </div>
  );
}

export default App;
