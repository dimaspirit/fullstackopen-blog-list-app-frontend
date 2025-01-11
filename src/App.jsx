import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import { login } from './services/login';

const App = () => {
  const savedNameStorage = 'loggedBlogappUser';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [blogs, setBlogs] = useState([])

  const handleLogin =  async (e) => {
    e.preventDefault();

    try {
      const user = await login({username, password});
      setUser(user);
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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(savedNameStorage);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, [])

  useEffect(() => {
    if(user) {
      blogService.getAll().then(blogs => setBlogs( blogs ))
    }
  }, [user]);

  if(user) {
    return (
      <>
        <div>
          <p>{user.username}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>

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
          {loginError && <p style={{color: 'red'}}>{loginError}</p>}

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