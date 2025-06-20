import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignIn() {
  const [form, setForm] = useState({
    id: '',
    password: '',
  });

  const { id, password } = form;

  const navigate = useNavigate();

  function onChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // 서버에 보낼 데이터
    const postData = {
      id,
      password,
    };

    try {
      await axios.post('http://localhost:8080/members/sign-in', postData, {
        withCredentials: true,
      });
      alert('로그인 성공!');
      navigate('/home');
    } catch (error) {
      if (error.response) {
        alert(
          '로그인 실패: ' + (error.response.data.message || '알 수 없는 오류')
        );
      } else {
        alert('서버와 통신 중 오류가 발생했습니다.');
      }
      console.error('Axios error:', error);
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Planit</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>
            아이디
            <input
              type="text"
              name="id"
              value={id}
              onChange={onChange}
              style={styles.input}
              placeholder="아이디를 입력하세요"
            />
          </label>
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>
            비밀번호
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              style={styles.input}
              placeholder="비밀번호를 입력하세요"
            />
          </label>
        </div>
        <div>
          <button type="submit" style={styles.button}>
            로그인
          </button>
        </div>
      </form>
      <div style={styles.linksContainer}>
        <Link to="/sign-up" style={styles.link}>
          회원가입
        </Link>
        <span style={styles.separator}>|</span>
        <Link to="/find-id" style={styles.link}>
          아이디 찾기
        </Link>
        <span style={styles.separator}>|</span>
        <Link to="/find-password" style={styles.link}>
          비밀번호 찾기
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px',
    maxWidth: '400px',
    margin: '50px auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  title: {
    fontSize: '40px',
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
    fontSize: '18px',
    marginBottom: '8px',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginTop: '5px',
    fontSize: '17px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    outline: 'none',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '12px 20px',
    marginTop: '10px',
    fontSize: '18px',
    backgroundColor: '#003366',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    boxSizing: 'border-box',
  },
  linksContainer: {
    marginTop: '20px',
    fontSize: '16px',
    color: '#003366',
  },
  link: {
    color: '#003366',
    textDecoration: 'none',
    margin: '0 5px',
  },
  separator: {
    margin: '0 5px',
    color: '#888',
  },
};

export default SignIn;
