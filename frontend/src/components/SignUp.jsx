import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: '',
    username: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    email: '',
    phone: '',
    verificationCode: '',
  });

  const {
    id,
    username,
    password,
    confirmPassword,
    nickname,
    email,
    phone,
    verificationCode,
  } = form;

  function onChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleCancel() {
    navigate(-1); // 이전 페이지로 이동
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const postData = {
      id,
      username,
      password,
      nickname,
      email,
      phone,
    };

    try {
      await axios.post('http://localhost:8080/members/sign-up', postData);

      alert('회원가입이 완료되었습니다!');
      navigate('/sign-in');
    } catch (error) {
      if (error.response) {
        alert(
          '회원가입 실패: ' + (error.response.data.message || '알 수 없는 오류')
        );
      } else {
        alert('서버와 통신 중 오류가 발생했습니다.');
      }
      console.error('Axios error:', error);
    }
  }

  function handleCheckId() {
    // 아이디 중복확인 로직 추가
    alert('아이디 중복확인');
  }

  function handleCheckNickname() {
    // 닉네임 중복확인 로직 추가
    alert('닉네임 중복확인');
  }

  function handlePhoneVerification() {
    // 전화번호 인증 로직 추가
    alert('전화번호 인증');
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>회원가입</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>
            아이디
            <div style={styles.row}>
              <input
                type="text"
                name="id"
                value={id}
                onChange={onChange}
                style={{ ...styles.input, flex: 1 }}
                placeholder="아이디를 입력하세요"
              />
              <button
                type="button"
                onClick={handleCheckId}
                style={styles.checkButton}
              >
                중복확인
              </button>
            </div>
          </label>
        </div>
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
        <div style={styles.inputGroup}>
          <label style={styles.label}>
            비밀번호 확인
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              style={styles.input}
              placeholder="비밀번호를 다시 입력하세요"
            />
          </label>
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>
            닉네임
            <div style={styles.row}>
              <input
                type="text"
                name="nickname"
                value={nickname}
                onChange={onChange}
                style={{ ...styles.input, flex: 1 }}
                placeholder="닉네임을 입력하세요"
              />
              <button
                type="button"
                onClick={handleCheckNickname}
                style={styles.checkButton}
              >
                중복확인
              </button>
            </div>
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
            />
          </label>
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>
            전화번호
            <div style={styles.row}>
              <input
                type="tel"
                name="phone"
                value={phone}
                onChange={onChange}
                style={{ ...styles.input, flex: 1 }}
                placeholder="전화번호를 입력하세요"
              />
              <button
                type="button"
                onClick={handlePhoneVerification}
                style={styles.checkButton}
              >
                인증하기
              </button>
            </div>
            {/* 인증번호 입력란 */}
            <input
              type="text"
              name="verificationCode"
              value={verificationCode}
              onChange={onChange}
              style={{ ...styles.input, marginTop: '10px' }}
              placeholder="인증번호를 입력하세요"
            />
          </label>
        </div>
        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.button}>
            회원가입
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
    color: '#333',
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
  row: {
    display: 'flex',
    gap: '10px',
  },
  checkButton: {
    padding: '12px 16px',
    fontSize: '16px',
    backgroundColor: '#003366',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
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

export default SignUp;
