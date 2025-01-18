import PropTypes from 'prop-types'
import { useState } from 'react'

const Blog = ({ blog, currentUserId, onUpdate, onDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [isFullDescriptionShown, setIsFullDescriptionShown] = useState(false)
  const buttonLabel = isFullDescriptionShown ? 'hide' : 'show'

  const isCreatedByUser = blog.user?.id === currentUserId

  const handleUpdateLikes = () => {
    onUpdate(blog.id, { likes: blog.likes+1 })
  }

  return (
    <div style={blogStyle}>
      <h3>
        <p id="blog-title">{`${blog.title} by ${blog.author}`}</p>
        <button onClick={() => setIsFullDescriptionShown(!isFullDescriptionShown)}>{buttonLabel}</button>
      </h3>

      <div id="blog-description" style={{ display: isFullDescriptionShown ? 'block': 'none' }}>
        <p>{blog.url}</p>
        <p id="blog-description-likes">likes: {blog.likes} <button onClick={handleUpdateLikes}>Like</button></p>

        {isCreatedByUser && <button onClick={() => onDelete(blog.id)}>Delete</button>}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default Blog