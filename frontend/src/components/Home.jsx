import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';

function Home() {
  const [value, setValue] = useState(new Date());

  const places = {
    국내: [
      { name: '제주도', image: '/images/jeju.jpg' },
      { name: '부산', image: '/images/busan.jpg' },
      { name: '서울', image: '/images/seoul.jpg' },
      { name: '강릉', image: '/images/gangneung.jpg' },
    ],
    해외: [
      { name: '다낭', image: '/images/danang.jpg' },
      { name: '오사카', image: '/images/osaka.jpg' },
      { name: '방콕', image: '/images/bangkok.jpg' },
      { name: '파리', image: '/images/paris.jpg' },
    ],
  };

  const navigate = useNavigate();

  function handleClick() {
    navigate('/plan');
  }

  return (
    <div style={styles.container}>
      {/* 메인 영역 */}
      <main style={styles.main}>
        {/* 여행 계획 생성 및 추천 */}
        <section style={styles.section}>
          <button onClick={handleClick} style={styles.planButton}>
            + 여행 계획 생성
          </button>
          <div style={styles.travelGrid}>
            {/* 국내 여행 */}
            <div style={styles.travelCard}>
              <h2 style={styles.heading}>국내 여행</h2>
              <div style={styles.placeGrid}>
                {places.국내.map((place) => (
                  <div key={place.name} style={styles.placeItem}>
                    <div style={styles.imageWrapper}>
                      <img
                        src={place.image}
                        alt={place.name}
                        style={styles.placeImage}
                      />
                    </div>
                    <span style={styles.placeName}>{place.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 해외 여행 */}
            <div style={styles.travelCard}>
              <h2 style={styles.heading}>해외 여행</h2>
              <div style={styles.placeGrid}>
                {places.해외.map((place) => (
                  <div key={place.name} style={styles.placeItem}>
                    <div style={styles.imageWrapper}>
                      <img
                        src={place.image}
                        alt={place.name}
                        style={styles.placeImage}
                      />
                    </div>
                    <span style={styles.placeName}>{place.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 캘린더 + 체크리스트 */}
        <aside style={styles.aside}>
          {/* Calendar */}
          <div>
            <h2 style={styles.heading}>📅 Calendar</h2>
            <div style={styles.calendarWrapper}>
              <Calendar onChange={setValue} value={value} />
            </div>
          </div>

          {/* Checklist */}
          <div>
            <h2 style={styles.heading}>✔️ Checklist</h2>
            <ul style={styles.checklist}>
              {['여권 준비', '숙소 예약', '여행자 보험 가입'].map(
                (item, idx) => (
                  <li key={idx} style={styles.checkItem}>
                    <input type="checkbox" style={styles.checkbox} />
                    <span>{item}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#ffffff', // Tailwind bg-custom-blue
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'sans-serif',
  },
  main: {
    padding: '1.5rem',
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '1.5rem',
    width: '100%',
    maxWidth: '1120px',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
  },
  planButton: {
    backgroundColor: 'white',
    color: 'black',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    marginBottom: '1rem',
    width: '14rem',
    cursor: 'pointer',
  },
  travelGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  travelCard: {
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '0.375rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  heading: {
    fontWeight: 'bold',
    marginBottom: '1rem',
    fontSize: '1.125rem',
  },
  placeGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  placeItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  imageWrapper: {
    width: '6rem',
    height: '6rem',
    borderRadius: '9999px',
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  placeImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  placeName: {
    marginTop: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  aside: {
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '0.375rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  calendarWrapper: {
    borderRadius: '0.75rem',
    overflow: 'hidden',
    backgroundColor: 'white',
    padding: '0.5rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  checklist: {
    listStyle: 'none',
    paddingLeft: '0.25rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  checkItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  checkbox: {
    width: '1rem',
    height: '1rem',
    accentColor: '#3b82f6', // Tailwind text-blue-500
  },
};

export default Home;
