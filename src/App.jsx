import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogServices from './services/blogs'
import { login } from './services/login';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable.jsx';

const App = () => {
  const savedNameStorage = 'loggedBlogappUser';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState(null);

  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [blogs, setBlogs] = useState([])

  const handleLogin =  async (e) => {
    e.preventDefault();

    try {
      const user = await login({username, password});
      setUser(user);
      blogServices.setToken(user.token);
      window.localStorage.setItem(savedNameStorage, JSON.stringify(user));

      setUsername('');
      setPassword('');
    } catch (error) {
      setLoginError(error.response.data.error);
      setTimeout(() => setLoginError(null), 5000);
    }
  }

  const handleLogout = () => {
    setBlogs([]);
    setUser(null);
    window.localStorage.clear();
  }

  const createBlog = async (newBlog) => {
    const blog = await blogServices.create(newBlog);
    setBlogs([...blogs, blog]);
    setNotificationMessage(`Added new blog: ${blog.title} by ${blog.author}`);
    setTimeout(() => setNotificationMessage(null), 5000);
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(savedNameStorage);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogServices.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    if(user) {
      blogServices.getAll().then(blogs => setBlogs( blogs ))
    }
  }, [user]);

  if(user) {
    return (
      <>
        <div>
          <p>{user.username}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>

        <Togglable buttonLabel="new note">
          <BlogForm onSubmit={createBlog} />
        </Togglable>


        {/* <div>
          <h2>Create a new blog</h2>
          {notificationMessage && <Notification message={notificationMessage} />}
          <form onSubmit={handleCreateBlog}>
            <div>
              <label htmlFor="author">Author</label>
              <input id="author" name="author" type="text" value={newBlog.author} onChange={(e) => handleNewBlogProp('author', e.target.value)} required />
            </div>

            <div>
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" value={newBlog.title} onChange={(e) => handleNewBlogProp('title', e.target.value)} required />
            </div>

            <div>
              <label htmlFor="url">Url</label>
              <input id="url" name="url" type="text" value={newBlog.url} onChange={(e) => handleNewBlogProp('url', e.target.value)} required />
            </div>

            <button type="submit">Added new blog</button>
          </form>
        </div> */}

        <div>
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      </>
    )
  }

  if(!user) {
    return (
      <>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          {loginError && <Notification type={"error"} message={loginError} /> }

          <div>
            <label htmlFor="username">Username</label>
            <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>

          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </>
    )
  }
}

export default App