import React from 'react'

const UserInfo = ({ userInfo }) => {
  if (!userInfo) {
    return null
  }

  return (
    <div>
      <h2>{userInfo.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {userInfo.blogs.map(blog => (
          <li key={blog.id}>
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserInfo