import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import  travel from '../assets/travel.png';
import 'react-calendar/dist/Calendar.css';

function Home() {
  const [value, setValue] = useState(new Date());

  const places = {
    국내: [
      { name: '제주도', image: travel },
      { name: '부산', image: travel },
      { name: '서울', image: travel },
      { name: '강릉', image: travel },
    ],
    해외: [
      { name: '다낭', image: travel },
      { name: '오사카', image: travel },
      { name: '방콕', image: travel },
      { name: '파리', image: travel },
    ],
  };

  const navigate = useNavigate();

  function handlePlaceClick(type, placeName) {
    navigate(`/travel/${type}/${placeName}`);
  }

  function handleMoreClick(type) {
    if (type === 'domestic') navigate('/travel/domestic');
    else if (type === 'overseas') navigate('/travel/overseas');
  }

  return (
    <div style={styles.container}>
      <main style={styles.main}>
        <section style={styles.section}>
          <button onClick={() => navigate('/plan')} style={styles.planButton}>
            + 여행 계획 생성
          </button>
          <div style={styles.travelGrid}>
            {/* 국내 여행 카드 */}
            <div style={styles.travelCard}>
              <h2 style={styles.heading}>
                국내 여행 추천
                <button
                  style={styles.moreButton}
                  onClick={() => handleMoreClick('domestic')}
                >
                  + 더보기
                </button>
              </h2>
              <div style={styles.placeGrid}>
                {places.국내.map((place) => (
                  <div
                    key={place.name}
                    style={styles.placeItem}
                    onClick={() => handlePlaceClick('domestic', place.name)}
                  >
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

            {/* 해외 여행 카드 */}
            <div style={styles.travelCard}>
              <h2 style={styles.heading}>
                해외 여행 추천
                <button
                  style={styles.moreButton}
                  onClick={() => handleMoreClick('overseas')}
                >
                  + 더보기
                </button>
              </h2>
              <div style={styles.placeGrid}>
                {places.해외.map((place) => (
                  <div
                    key={place.name}
                    style={styles.placeItem}
                    onClick={() => handlePlaceClick('overseas', place.name)}
                  >
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
            <h2 style={styles.heading}>Calendar</h2>
            <div style={styles.calendarWrapper}>
              <Calendar onChange={setValue} value={value} />
            </div>
          </div>

          {/* Checklist */}
          <div>
            <h2 style={styles.heading}>Checklist</h2>
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
    backgroundColor: '#ffffff',
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
    backgroundColor: '#ddd',
    padding: '12px 20px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    marginBottom: '15px',
    fontSize: '15px',
    width: '14rem',
    cursor: 'pointer',
    border: 'none',
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
    accentColor: '#3b82f6',
  },
  moreButton: {
    marginLeft: '1rem',
    background: 'none',
    border: 'none',
    color: '#3b82f6',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  placeItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
  },
};

export default Home;
