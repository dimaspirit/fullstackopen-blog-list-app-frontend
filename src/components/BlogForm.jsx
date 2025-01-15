import { useState } from 'react'

const BlogForm = ({ onSubmit }) => {
  const initValues = {
    author: '',
    title: '',
    url: '',
  }

  const [newBlog, setNewBlog] = useState(initValues)

  const handleUpdate = (name, value) => {
    setNewBlog({
      ...newBlog,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    onSubmit(newBlog)
    setNewBlog({ ...initValues })
  }

  return (
    <>
      <h2>Create a new blog</h2>

      <form onSubmit={ handleSubmit }>
        <div>
          <label htmlFor="blog-form-author">Author</label>
          <input id="blog-form-author" name="blog-form-author" type="text" value={newBlog.author} onChange={(e) => handleUpdate('author', e.target.value)} required />
        </div>

        <div>
          <label htmlFor="blog-form-title">Title</label>
          <input id="blog-form-title" name="blog-form-title" type="text" value={newBlog.title} onChange={(e) => handleUpdate('title', e.target.value)} required />
        </div>

        <div>
          <label htmlFor="blog-form-url">Url</label>
          <input id="blog-form-url" name="blog-form-url" type="text" value={newBlog.url} onChange={(e) => handleUpdate('url', e.target.value)} required />
        </div>

        <button type="submit">Added new blog</button>
      </form>
    </>
  )
}

export default BlogForm