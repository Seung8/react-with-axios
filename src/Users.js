import React, { useEffect, useReducer } from 'react';
import axios from 'axios';

// Loading, Success, Error 상태 관리
function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null,
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: null,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function Users() {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });

  // API 요청 로직
  const fetchUsers = async () => {
    dispatch({ type: 'LOADING' });

    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users/',
      );

      dispatch({ type: 'SUCCESS', data: response.data });
    } catch (e) {
      dispatch({ type: 'ERROR', error: e });
    }
  };

  // 최초 렌더링될 때 API 요청. deps가 빈 배열이면 최초 레더링될 때에만 동작
  useEffect(() => {
    fetchUsers();
  }, []);

  const { loading, data: users, error } = state;

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러 발생</div>;
  if (!users) return null;

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}({user.email})
          </li>
        ))}
      </ul>
      <button onClick={fetchUsers}>재요청</button>
    </>
  );
}

export default Users;
