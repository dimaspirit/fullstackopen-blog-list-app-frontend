import { useState } from "react"

const Blog = ({ blog, onUpdate }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [isFullDescriptionShown, setIsFullDescriptionShown] = useState(false);
  const buttonLabel = isFullDescriptionShown ? 'hide' : 'show';

  const handleUpdateLikes = () => {
    onUpdate(blog.id, { likes: blog.likes+1 });
  }

  return (
    <div style={blogStyle}>
      <h3>
        {blog.title}
        <button onClick={() => setIsFullDescriptionShown(!isFullDescriptionShown)}>{buttonLabel}</button>
      </h3>

      <div style={{display: isFullDescriptionShown ? 'block': 'none'}}>
        <p>{blog.url}</p>
        <p>likes: {blog.likes} <button onClick={handleUpdateLikes}>Like</button></p>
        <p>{blog.author}</p>
      </div> 
    </div>

  )
};

export default Blog;