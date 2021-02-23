import React from 'react'
import { useSelector } from 'react-redux'

const UserList = () => {
  const users = useSelector(state => state.users)

  return (
    <table>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Blogs created</th>
        </tr>
        {users.map(user => (
          <tr key={user.id}>
            <th>{user.name}</th>
            <th>{user.blogs.length}</th>
          </tr>))
        }
      </tbody>
    </table>
  )
}

export default UserList