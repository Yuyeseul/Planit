import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import profile from '../assets/profile.png';

function EditProfile() {
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState(null); // 파일
  const [previewImage, setPreviewImage] = useState(null); // 미리보기용 URL

  const [form, setForm] = useState({
    id: 'user123', // 수정 불가
    name: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    email: '',
    phone: '',
    verificationCode: '',
  });

  const {
    id,
    name,
    password,
    confirmPassword,
    nickname,
    email,
    phone,
    verificationCode,
  } = form;

  useEffect(() => {
    // 서버에서 사용자 정보 불러오기 (임시로 하드코딩)
    const fetchedData = {
      id: 'user123',
      name: '홍길동',
      nickname: '길동이',
      email: 'hong@example.com',
      phone: '010-1234-5678',
    };
    setForm((prev) => ({ ...prev, ...fetchedData }));
  }, []);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file)); // 미리보기용 URL 설정
    }
  }

  function handleCancel() {
    navigate(-1); // 이전 페이지로 이동
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('profileImage', profileImage);
    formData.append('name', form.name);

    // 회원정보 수정 로직 추가
    console.log('수정된 정보:', form);
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
      <h1 style={styles.title}>회원정보 수정</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.profileContainer}>
          <img
            src={previewImage || profile} // 기본 이미지
            alt="프로필"
            style={styles.profileImage}
          />
          <label style={styles.imageUploadLabel}>
            이미지 변경
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </label>
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>
            아이디
            <input
              type="text"
              name="id"
              value={id}
              disabled
              style={{ ...styles.input, backgroundColor: '#eee' }}
            />
          </label>
        </div>
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
            />
          </label>
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>
            새 비밀번호
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              style={styles.input}
              placeholder="변경할 비밀번호를 입력하세요"
            />
          </label>
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>
            새 비밀번호 확인
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
            정보 저장
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
  checkButton: {
    padding: '12px 16px',
    fontSize: '16px',
    marginTop: '5px',
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
  profileContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '30px',
  },
  profileImage: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #ccc',
    marginBottom: '12px',
  },
  imageUploadLabel: {
    display: 'inline-block',
    padding: '8px 14px',
    backgroundColor: '#003366',
    color: '#fff',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default EditProfile;
