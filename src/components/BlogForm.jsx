import { useState } from "react";

const BlogForm = ({onSubmit}) => {
  const initValues = {
    author: '',
    title: '',
    url: '',
  };

  const [newBlog, setNewBlog] = useState(initValues);

  const handleUpdate = (name, value) => {
    setNewBlog({
      ...newBlog,
      [name]: value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(newBlog);
    setNewBlog({...initValues})
  }

  return (
    <>
      <h2>Create a new blog</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="author">Author</label>
          <input id="author" name="author" type="text" value={newBlog.author} onChange={(e) => handleUpdate('author', e.target.value)} required />
        </div>

        <div>
          <label htmlFor="title">Title</label>
          <input id="title" name="title" type="text" value={newBlog.title} onChange={(e) => handleUpdate('title', e.target.value)} required />
        </div>

        <div>
          <label htmlFor="url">Url</label>
          <input id="url" name="url" type="text" value={newBlog.url} onChange={(e) => handleUpdate('url', e.target.value)} required />
        </div>

        <button type="submit">Added new blog</button>
      </form>
    </>
  )
}

export default BlogForm;