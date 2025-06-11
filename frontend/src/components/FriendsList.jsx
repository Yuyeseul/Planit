import React, { useState } from 'react';

function FriendsList({ isOpen, onClose, friends = [], members = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('friends'); // 기본 탭 'friends'

  if (!isOpen) return null;

  // 검색 필터링
  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 친구추가 버튼 클릭 시
  function handleAddFriend() {
    alert('친구 추가 기능은 아직 구현되지 않았습니다.');
  }

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.popup} onClick={(e) => e.stopPropagation()}>
        <button
          style={styles.closeBtn}
          onClick={onClose}
          aria-label="Close popup"
        >
          &times;
        </button>
        <h2>친구 목록</h2>

        {/* 검색창 */}
        <input
          type="text"
          placeholder="검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />

        {/* 탭 */}
        <div style={styles.tabContainer}>
          <button
            style={{
              ...styles.tabButton,
              ...(activeTab === 'friends' ? styles.activeTab : {}),
            }}
            onClick={() => setActiveTab('friends')}
          >
            친구
          </button>
          <button
            style={{
              ...styles.tabButton,
              ...(activeTab === 'add' ? styles.activeTab : {}),
            }}
            onClick={() => setActiveTab('add')}
          >
            친구추가
          </button>
        </div>

        {/* 리스트 */}
        <ul style={styles.list}>
          {activeTab === 'friends' && filteredFriends.length === 0 && (
            <li>친구가 없습니다.</li>
          )}
          {activeTab === 'add' && filteredMembers.length === 0 && (
            <li>사용자가 없습니다.</li>
          )}
          {activeTab === 'friends' &&
            filteredFriends.map((friend) => (
              <li key={friend.id} style={styles.listItem}>
                <img
                  src={friend.avatar}
                  alt={`${friend.name}'s avatar`}
                  style={styles.avatar}
                />
                <span style={styles.username}>{friend.name}</span>
              </li>
            ))}
          {activeTab === 'add' &&
            filteredMembers.map((member) => (
              <li key={member.id} style={styles.listItem}>
                <img
                  src={member.avatar}
                  alt={`${member.name}'s avatar`}
                  style={styles.avatar}
                />
                <span style={styles.username}>{member.name}</span>
              </li>
            ))}
        </ul>

        {/* 버튼영역 */}
        <div style={styles.buttonContainer}>
          {activeTab === 'add' && (
            <button style={styles.addButton} onClick={handleAddFriend}>
              친구추가
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  popup: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    width: '320px',
    height: '500px', // 팝업 크기 고정
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    border: 'none',
    background: 'transparent',
    fontSize: '1.2rem',
    cursor: 'pointer',
  },
  searchInput: {
    width: '100%',
    padding: '0.5rem',
    marginBottom: '0.8rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  tabContainer: {
    display: 'flex',
    marginBottom: '0.8rem',
  },
  tabButton: {
    flex: 1,
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '4px 4px 0 0',
    background: '#f5f5f5',
    cursor: 'pointer',
    outline: 'none',
  },
  activeTab: {
    background: '#fff',
    fontWeight: 'bold',
    borderBottom: '2px solid #000',
  },
  listContainer: {
    flex: 1, // 리스트영역이 남은 공간을 모두 차지하도록
    overflowY: 'auto',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0.8rem',
  },
  avatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    marginRight: '1rem',
  },
  username: {
    fontSize: '1rem',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '1rem',
  },
  addButton: {
    padding: '0.5rem 1rem',
    marginRight: '0.5rem',
    background: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default FriendsList;
