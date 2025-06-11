import React from 'react';
import { Link } from 'react-router-dom';
import mypageIcon from '../assets/mypage.png';
import setting from '../assets/settings.png';

function Header() {
  return (
    <div className="header">
      <header style={styles.header}>
        <Link to="/" style={styles.logo}>
          Planit
        </Link>

        <Link to="/mypage" style={styles.mypage}>
          <img
            src={mypageIcon}
            alt="마이페이지 아이콘"
            style={{ width: '36px', height: '36px', objectFit: 'contain' }}
          />
        </Link>
        <Link to="/settings" style={styles.setting}>
          <img
            src={setting}
            alt="설정 아이콘"
            style={{ width: '36px', height: '36px', objectFit: 'contain' }}
          />
        </Link>
      </header>
    </div>
  );
}

const styles = {
  header: {
    position: 'relative',
    backgroundColor: '#003366',
    padding: '10px 20px',
    borderBottom: '1px solid #ddd',
    height: '50px',
  },
  logo: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '40px',
    color: '#ffffff',
    textDecoration: 'none',
  },
  mypage: {
    position: 'absolute',
    right: '85px',
    top: '53%',
    transform: 'translateY(-50%)',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '0',
    display: 'inline-block',
  },
  setting: {
    position: 'absolute',
    right: '30px',
    top: '53%',
    transform: 'translateY(-50%)',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '0',
    display: 'inline-block',
  },
};

export default Header;
