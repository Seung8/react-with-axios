import React from 'react';
import axios from 'axios';
import useAsync from './useAsync';

async function getUsers() {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users/',
  );
  return response.data;
}

function Users() {
  const [state, refetch] = useAsync(getUsers, [], true);
  const { loading, data: users, error } = state;

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러 발생</div>;
  if (!users) return <button onClick={refetch}>요청</button>;

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}({user.email})
          </li>
        ))}
      </ul>
      <button onClick={refetch}>재요청</button>
    </>
  );
}

export default Users;
