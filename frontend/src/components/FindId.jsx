import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FindId() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
  });

  const { name, email } = form;

  function onChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // 아이디 찾기 처리
    console.log('이름:', name, '이메일:', email);
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
              name="name"
              value={name}
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
