import React from 'react';
import { useNavigate } from 'react-router-dom';

function TravelList({ type }) {
  const navigate = useNavigate();

  // 여행지 데이터
  const domesticPlaces = [
    { name: '제주도', image: '/images/jeju.jpg' },
    { name: '부산', image: '/images/busan.jpg' },
    { name: '서울', image: '/images/seoul.jpg' },
    { name: '강릉', image: '/images/gangneung.jpg' },
  ];

  const overseasPlaces = [
    { name: '파리', image: '/images/paris.jpg' },
    { name: '뉴욕', image: '/images/newyork.jpg' },
    { name: '도쿄', image: '/images/tokyo.jpg' },
    { name: '런던', image: '/images/london.jpg' },
  ];

  const places = type === 'domestic' ? domesticPlaces : overseasPlaces;

  // 여행지 클릭 핸들러
  const handlePlaceClick = (placeName) => {
    navigate(`/travel/${type}/${placeName}`);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>
        {type === 'domestic' ? '국내 여행지' : '해외 여행지'}
      </h2>
      <div style={styles.placeGrid}>
        {places.map((place) => (
          <div
            key={place.name}
            style={styles.placeCard}
            onClick={() => handlePlaceClick(place.name)}
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
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1120px',
    margin: '0 auto',
    fontFamily: 'sans-serif',
  },
  heading: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  placeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '1rem',
  },
  placeCard: {
    backgroundColor: 'white',
    borderRadius: '0.375rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    padding: '1rem',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'transform 0.2s',
  },
  imageWrapper: {
    width: '100%',
    height: '120px',
    overflow: 'hidden',
    borderRadius: '0.5rem',
    marginBottom: '0.5rem',
    backgroundColor: '#e5e7eb',
  },
  placeImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  placeName: {
    fontSize: '1rem',
    fontWeight: '500',
  },
};

export default TravelList;
