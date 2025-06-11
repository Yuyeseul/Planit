import profile from '../assets/profile.png';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FriendsList from './FriendsList';

function MyPage() {
  const [user] = useState({
    name: 'user',
    profileImage: profile,
  });

  const mockFriends = [
    { id: 1, name: 'Alice', avatar: profile },
    { id: 2, name: 'Bob', avatar: profile },
    { id: 3, name: 'Charlie', avatar: profile },
  ];

  const [isFriendsOpen, setIsFriendsOpen] = useState(false);

  const navigate = useNavigate();

  function handleEditProfile() {
    navigate('/edit-profile');
  }

  return (
    <div style={styles.container}>
      <div style={styles.userInfo}>
        <img
          src={user.profileImage}
          alt={`${user.name} 의 프로필 이미지`}
          style={styles.profileImage}
        />
        <div style={styles.details}>
          <h3>{user.name}</h3>
          <button onClick={handleEditProfile} style={styles.editBtn}>
            프로필 편집
          </button>
        </div>
        <div style={styles.friendsSection}>
          <p style={styles.friendsCount}>친구 n</p>
          <button
            style={styles.addFriendBtn}
            onClick={() => setIsFriendsOpen(true)} // 목록 버튼 클릭시 팝업 열기
          >
            목록
          </button>
        </div>
      </div>

      <div style={styles.contentGrid}>
        <div style={styles.card}></div>
        <div style={styles.card}></div>
        <div style={styles.card}></div>
      </div>

      {/* 친구목록 팝업 */}
      <FriendsList
        isOpen={isFriendsOpen}
        onClose={() => setIsFriendsOpen(false)}
        friends={mockFriends}
      />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '30px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '50px',
    borderBottom: '1px solid #ddd',
  },
  profileImage: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
    margin: '30px 30px 30px 50px',
  },
  details: {
    width: '150px',
    height: '150px',
    margin: '30px',
    textAlign: 'left',
    fontSize: '20px',
  },
  editBtn: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#aaa',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
  },
  friendsSection: {
    width: '150px',
    height: '150px',
    margin: '30px',
    fontSize: '20px',
  },
  friendsCount: {
    textAlign: 'left',
    fontSize: '18px',
  },
  addFriendBtn: {
    margin: '20px 20px 20px 0',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#003366',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
  },
  card: {
    backgroundColor: '#f0f0f0',
    height: '350px',
    borderRadius: '10px',
  },
};

export default MyPage;
