import { describe } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  let container

  const id = 'qwertyui1'
  const title = 'Title of first blog note'
  const author = 'Coolest author'
  const likesCount = 1

  const onSubmit = () => {}

  describe('<BlogForm />', () => {
    test('renders title', async () => {
      render(<BlogForm onSubmit={onSubmit} />)

      expect(screen.getByText('Create a new blog')).toBeInTheDocument()
    })


    test('form submits and send props', async () => {
      const onSubmitMockHandler = vi.fn()
      const user = userEvent.setup()

      const author = 'Wes Boss'
      const title = 'Async Javascript'
      const url = 'wesboos.com/async-js'

      const { container } = render(<BlogForm onSubmit={onSubmitMockHandler} />)

      const inputElAuthor = container.querySelector('#blog-form-author')
      const inputElTitle = container.querySelector('#blog-form-title')
      const inputElUrl = container.querySelector('#blog-form-url')
      const submitBtnEl = screen.getByText('Added new blog')

      await user.type(inputElAuthor, author)
      await user.type(inputElTitle, title)
      await user.type(inputElUrl, url)
      await user.click(submitBtnEl)

      expect(onSubmitMockHandler.mock.calls).toHaveLength(1)
      expect(onSubmitMockHandler.mock.calls[0][0].author).toBe(author)
      expect(onSubmitMockHandler.mock.calls[0][0].title).toBe(title)
      expect(onSubmitMockHandler.mock.calls[0][0].url).toBe(url)
    })

  })

  // test('at start the details are not displayed', () => {
  //   const { container } = render(<Blog blog={blog} onUpdate={onUpdate} onDelete={onDelete} />)
  //   const descriptionEl = container.querySelector('#blog-description')
  //   expect(descriptionEl).toHaveStyle('display: none')
  // })

  // test('after clicking the button, details are displayed', async () => {
  //   const { container } = render(<Blog blog={blog} onUpdate={onUpdate} onDelete={onDelete} />)

  //   const user = userEvent.setup()
  //   const buttonEl = screen.getByText('show')
  //   await user.click(buttonEl)

  //   const detailsEl = container.querySelector('#blog-description')
  //   expect(detailsEl).not.toHaveStyle('display: none')
  // })

  // test('after clicking the button, details are displayed', async () => {
  //   const { container } = render(<Blog blog={blog} onUpdate={onUpdate} onDelete={onDelete} />)

  //   const user = userEvent.setup()
  //   const buttonEl = screen.getByText('show')
  //   await user.click(buttonEl)

  //   const detailsEl = container.querySelector('#blog-description')
  //   expect(detailsEl).not.toHaveStyle('display: none')
  // })

  // test('likes button works', async () => {
  //   const user = userEvent.setup()
  //   const onUpdateMockHandler = vi.fn()

  //   render(<Blog blog={blog} onUpdate={onUpdateMockHandler} onDelete={onDelete} />)

  //   const buttonEl = screen.getByText('Like')

  //   await user.click(buttonEl)
  //   await user.click(buttonEl)

  //   expect(onUpdateMockHandler.mock.calls).toHaveLength(2)
  // })
})