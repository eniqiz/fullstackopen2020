import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('test blog component', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'blog to test',
      author: 'tester',
      url: 'example.com',
      likes: 10,
      user: {
        username: 'example',
        name: 'Example'
      }
    }

    component = render(
      <Blog blog={blog} />
    )
  })

  test('renders blog title and author', () => {
    expect(component.container).toHaveTextContent('blog to test')
    expect(component.container).toHaveTextContent('tester')
  })

  test('not renders url by default', () => {
    expect(component.container.querySelector('.blog-detail')).toHaveStyle(
      'display: none'
    )
  })

  test('renders url and likes after click show button', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('example.com')
    expect(component.container).toHaveTextContent('10')
  })
})

test('click like button', () => {
  const blog = {
    title: 'blog to test',
    author: 'tester',
    url: 'example.com',
    likes: 10,
    user: {
      username: 'example',
      name: 'Example'
    }
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} likeBlog={mockHandler}/>
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  const buttonLike = component.getByText('like')
  fireEvent.click(buttonLike)
  fireEvent.click(buttonLike)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

