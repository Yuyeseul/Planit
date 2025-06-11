import profile from '../assets/profile.png';
import React, { useState } from 'react';
import FriendsList from './FriendsList';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Plan() {
  const [planList, setPlanList] = useState({
    title: '',
    startDate: '',
    endDate: '',
  });

  const { title, startDate, endDate } = planList;

  function onChange(e) {
    const { name, value } = e.target;
    setPlanList((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const mockFriends = [
    { id: 1, name: 'Alice', avatar: profile },
    { id: 2, name: 'Bob', avatar: profile },
    { id: 3, name: 'Charlie', avatar: profile },
  ];

  const [isFriendsOpen, setIsFriendsOpen] = useState(false);

  function handleInviteFriends() {
    // 친구 초대 로직을 여기에 추가하세요
    alert('친구 초대 기능은 아직 구현되지 않았습니다.');
  }

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    console.log(planList);
    navigate('/plan-detail');

    /**
     *  로그인 세션 해결 후
     */
    // // 백엔드 연동
    // axios
    //   .post('http://localhost:5000/api/plans', planList)
    //   .then((response) => {
    //     console.log('계획 생성 성공:', response.data);
    //     navigate('/plan-detail');
    //   })
    //   .catch((error) => {
    //     console.error('계획 생성 실패:', error);
    //     alert('계획 생성에 실패했습니다. 다시 시도해주세요.');
    //   });
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>새로운 계획 생성</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* 제목 */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>
            제목
            <input
              type="text"
              name="title"
              value={title}
              onChange={onChange}
              style={styles.input}
            />
          </label>
        </div>

        {/* 시작 날짜 ~ 종료 날짜 */}
        <div style={styles.dateRow}>
          <div style={styles.dateInputWrapper}>
            <label style={styles.label}>
              출발일
              <input
                type="date"
                name="startDate"
                value={startDate}
                onChange={onChange}
                style={styles.input}
              />
            </label>
          </div>

          <span style={styles.tilde}> </span>

          <div style={styles.dateInputWrapper}>
            <label style={styles.label}>
              도착일
              <input
                type="date"
                name="endDate"
                value={endDate}
                onChange={onChange}
                style={styles.input}
              />
            </label>
          </div>
        </div>

        {/* 친구 초대 */}
        <div style={{ ...styles.inputGroup, ...styles.row }}>
          <label style={styles.labelInline}>친구 초대</label>
          <button
            type="button"
            onClick={() => setIsFriendsOpen(true)}
            style={styles.inviteButton}
          >
            ➕︎
          </button>
        </div>

        {/* 친구목록 팝업 */}
        <FriendsList
          isOpen={isFriendsOpen}
          onClose={() => setIsFriendsOpen(false)}
          friends={mockFriends}
        />

        {/* 계획 생성 */}
        <div>
          <button type="submit" style={styles.button}>
            계획 생성
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
  dateRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '5px',
  },
  dateInputWrapper: {
    flex: 1,
  },
  tilde: {
    fontSize: '24px',
    margin: '0 10px',
    color: '#666',
  },
  inviteButton: {
    padding: '5px 8px',
    fontSize: '16px',
    backgroundColor: '#E6E6E6',
    color: '#000000',
    border: 'none',
    borderRadius: '999px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
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
};

export default Plan;
