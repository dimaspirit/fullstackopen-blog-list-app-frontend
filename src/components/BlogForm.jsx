const BlogForm = ({newBlog, handleUpdate, onSubmit}) => {
  return (
    <>
      <h2>Create a new blog</h2>

      <form onSubmit={onSubmit}>
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