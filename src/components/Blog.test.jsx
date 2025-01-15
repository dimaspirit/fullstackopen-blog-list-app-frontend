import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { describe } from 'vitest'

const getFullTitle = (title, author) => `${title} by ${author}`

describe('<Blog />', () => {
  let container

  const id = 'qwertyui1'
  const title = 'Title of first blog note'
  const author = 'Coolest author'

  const blog = {
    id,
    title,
    author,
    url: 'https://someurls.com',
    likes: 1,
    user: {
      blogs: [id]
    },
  }

  const onUpdate = () => {}
  const onDelete = () => {}

  beforeEach(() => {
    container = render(<Blog blog={blog} onUpdate={onUpdate} onDelete={onDelete} />).container
  })

  test('renders title', async () => {
    const element = screen.getByText(getFullTitle(title, author))
    expect(element).toBeDefined()
  })

  test('at start the details are not displayed', () => {
    const descriptionEl = container.querySelector('#blog-description')
    expect(descriptionEl).toHaveStyle('display: none')
  })
})