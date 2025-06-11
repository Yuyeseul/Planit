import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function FindId() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    email: '',
  });

  const { username, email } = form;

  function onChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // 아이디 찾기 처리 (서버 요청)
    try {
      await axios.post('http://localhost:8080/members/find-id', {
        username,
        email,
      });
      // 성공 시 서버가 아이디를 반환한다고 가정하면, 아래처럼 할 수 있지만
      // 그냥 response 없이 성공만 처리하려면 다음처럼 작성할 수 있습니다:
      // alert('아이디 찾기 요청이 성공적으로 처리되었습니다.');
      // navigate('/sign-in');

      // 만약 아이디를 서버에서 받아서 보여주려면 이렇게:
      const response = await axios.post(
        'http://localhost:8080/members/find-id',
        {
          username,
          email,
        }
      );
      alert(`아이디는: ${response.data} 입니다.`);
      navigate('/sign-in');
    } catch (error) {
      if (error.response) {
        alert(
          '아이디 찾기 실패: ' +
            (error.response.data.message || '알 수 없는 오류')
        );
      } else {
        alert('서버와 통신 중 오류가 발생했습니다.');
      }
      console.error('Axios error:', error);
    }
  }

  function handleCancel() {
    navigate(-1); // 이전 페이지로 이동
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>아이디 찾기</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>
            이름
            <input
              type="text"
              name="username"
              value={username}
              onChange={onChange}
              style={styles.input}
              placeholder="이름을 입력하세요"
              required
            />
          </label>
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>
            이메일
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              style={styles.input}
              placeholder="이메일을 입력하세요"
              required
            />
          </label>
        </div>
        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.button}>
            아이디 찾기
          </button>
          <button
            type="button"
            onClick={handleCancel}
            style={styles.cancelButton}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px',
    maxWidth: '600px',
    margin: '50px auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  title: {
    fontSize: '32px',
    marginBottom: '30px',
    color: '#003366',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    textAlign: 'left',
  },
  label: {
    display: 'block',
    fontSize: '20px',
    marginBottom: '8px',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '18px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    outline: 'none',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '20px',
  },
  button: {
    padding: '14px 20px',
    fontSize: '20px',
    backgroundColor: '#003366',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  cancelButton: {
    padding: '14px 20px',
    fontSize: '20px',
    backgroundColor: '#aaa',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default FindId;
