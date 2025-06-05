import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Settings() {
    const navigate = useNavigate();
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    function handleLogout() {
        alert('로그아웃 되었습니다.');
        // 예: localStorage.clear();
        navigate('/login');
    }

    function handleDeleteAccount() {
        const confirmed = window.confirm('정말로 회원탈퇴 하시겠습니까? 이 작업은 되돌릴 수 없습니다.');
        if (confirmed) {
            alert('회원탈퇴가 완료되었습니다.');
            navigate('/');
        }
    }

    function toggleNotifications() {
        setNotificationsEnabled(prev => !prev);
    }

    function handleFaq() {
        navigate('/faq'); // 자주 묻는 질문 페이지로 이동
    }

    function handleContactSupport() {
        navigate('/support'); // 고객센터 문의 페이지로 이동
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>환경설정</h1>

            <div style={styles.settingItem}>
                <span style={styles.label}>알림 설정</span>
                <label className="switch">
                    <input type="checkbox" checked={notificationsEnabled} onChange={toggleNotifications} />
                    <span className="slider round"></span>
                </label>
            </div>

            <div style={styles.settingItem}>
                <span style={styles.linkLabel} onClick={handleFaq}>자주 묻는 질문</span>
            </div>

            <div style={styles.settingItem}>
                <span style={styles.linkLabel} onClick={handleContactSupport}>고객센터 문의</span>
            </div>

            <div style={styles.buttonGroup}>
                <button onClick={handleLogout} style={styles.button}>로그아웃</button>
                <button onClick={handleDeleteAccount} style={styles.deleteButton}>회원탈퇴</button>
            </div>

            {/* 스위치 스타일 */}
            <style>{`
                .switch {
                    position: relative;
                    display: inline-block;
                    width: 60px;
                    height: 34px;
                }

                .switch input {
                    opacity: 0;
                    width: 0;
                    height: 0;
                }

                .slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: #ccc;
                    transition: .4s;
                    border-radius: 34px;
                }

                .slider:before {
                    position: absolute;
                    content: "";
                    height: 26px;
                    width: 26px;
                    left: 4px;
                    bottom: 4px;
                    background-color: white;
                    transition: .4s;
                    border-radius: 50%;
                }

                input:checked + .slider {
                    background-color: #2196F3;
                }

                input:checked + .slider:before {
                    transform: translateX(26px);
                }
            `}</style>
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
    settingItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px',
        padding: '0 10px',
        cursor: 'pointer',
    },
    label: {
        fontSize: '20px',
        color: '#555',
    },
    linkLabel: {
        fontSize: '20px',
        color: '#007bff',
        textDecoration: 'underline',
        cursor: 'pointer',
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        marginTop: '40px',
    },
    button: {
        padding: '14px 20px',
        fontSize: '20px',
        backgroundColor: '#003366',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
    },
    deleteButton: {
        padding: '14px 20px',
        fontSize: '20px',
        backgroundColor: '#adb5bd',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
    },
};

export default Settings;
