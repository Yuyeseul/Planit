import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FindPassword() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userId: '',
    email: '',
    verificationCode: '',
  });

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [serverCode, setServerCode] = useState('');

  const { userId, email, verificationCode } = form;

  function onChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function sendVerificationCode() {
    if (!userId || !email) {
      alert('아이디와 이메일을 입력해주세요.');
      return;
    }
    const generatedCode = '123456'; // 실제 서버에서 받아야 하는 인증번호 예시
    setServerCode(generatedCode);
    setIsCodeSent(true);
    alert(`인증번호가 ${email}로 발송되었습니다.`);
  }

  function verifyCode() {
    if (verificationCode === serverCode) {
      alert('인증 성공! 비밀번호 변경 페이지로 이동합니다.');
      navigate('/change-password', { state: { userId } });
    } else {
      alert('인증번호가 일치하지 않습니다.');
    }
  }

  function handleCancel() {
    navigate(-1);
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>비밀번호 찾기</h1>
      <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>
            아이디
            <input
              type="text"
              name="userId"
              value={userId}
              onChange={onChange}
              style={styles.input}
              placeholder="아이디를 입력하세요"
              required
            />
          </label>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>
            이메일
            <div style={styles.row}>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                style={{ ...styles.input, flex: 1 }}
                placeholder="이메일을 입력하세요"
                required
              />
              <button
                type="button"
                onClick={sendVerificationCode}
                style={styles.sendCodeButton}
              >
                인증번호 발송
              </button>
            </div>
          </label>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>
            인증번호 입력
            <div style={styles.row}>
              <input
                type="text"
                name="verificationCode"
                value={verificationCode}
                onChange={onChange}
                style={{ ...styles.input, flex: 1 }}
                placeholder="인증번호를 입력하세요"
                required
              />
              <button
                type="button"
                onClick={verifyCode}
                style={styles.verifyButton}
              >
                인증 확인
              </button>
            </div>
          </label>
        </div>

        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.button}>
            비밀번호 찾기
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
    maxWidth: '500px',
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
    alignItems: 'center',
  },
  inputGroup: {
    textAlign: 'left',
    width: '100%',
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
  row: {
    display: 'flex',
    gap: '10px',
  },
  sendCodeButton: {
    padding: '10px 16px',
    fontSize: '18px',
    backgroundColor: '#003366',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    alignSelf: 'flex-end',
    transition: 'background-color 0.3s',
  },
  verifyButton: {
    padding: '10px 16px',
    fontSize: '18px',
    backgroundColor: '#003366',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    alignSelf: 'flex-end',
    transition: 'background-color 0.3s',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '20px',
  },
  button: {
    padding: '12px 20px',
    fontSize: '18px',
    backgroundColor: '#003366',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  cancelButton: {
    padding: '12px 20px',
    fontSize: '18px',
    backgroundColor: '#aaa',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default FindPassword;
