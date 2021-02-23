import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const addNewBlog = jest.fn()

  const component = render(
    <BlogForm addBlog={addNewBlog} />
  )

  const title = component.container.querySelector('#title')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'test blog title' }
  })
  fireEvent.submit(form)

  expect(addNewBlog.mock.calls).toHaveLength(1)
  expect(addNewBlog.mock.calls[0][0].title).toBe('test blog title')
})