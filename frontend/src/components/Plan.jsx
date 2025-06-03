import React, { useState } from 'react';

function Plan() {
  const [planList, setPlanList] = useState({
    title: '',
    date: '',
    friends: '',
  });

  const { title, date, friends } = planList;

  function onChange(e) {
    const { name, value } = e.target;
    setPlanList((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // 계획 생성 로직 추가
    console.log(planList);
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>이곳은 Plan 입니다</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
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
        <div style={styles.inputGroup}>
          <label style={styles.label}>
            기간
            <input
              type="text"
              name="date"
              value={date}
              onChange={onChange}
              style={styles.input}
            />
          </label>
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>
            친구목록
            <input
              type="text"
              name="friends"
              value={friends}
              onChange={onChange}
              style={styles.input}
            />
          </label>
        </div>
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
  button: {
    padding: '14px 20px',
    fontSize: '20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#45a049',
  },
};

export default Plan;
