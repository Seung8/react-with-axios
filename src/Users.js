import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // API 요청 로직
  const fetchUsers = async () => {
    try {
      // 초기화
      setUsers(null);
      setError(null);
      setLoading(true);

      // API 요청
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users/',
      );

      // 응답 데이터(response.data) users로 할당
      setUsers(response.data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  // 최초 렌더링될 때 API 요청. deps가 빈 배열이면 최초 레더링될 때에만 동작
  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러 발생</div>;
  if (!users) return null;

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={fetchUsers}>데이터 불러오기</button>
    </>
  );
}

export default Users;
