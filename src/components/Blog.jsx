const Blog = ({ blog }) => (
  <div>
    {blog.title} by <b>{blog.author}</b>
  </div>
)

export default Blog