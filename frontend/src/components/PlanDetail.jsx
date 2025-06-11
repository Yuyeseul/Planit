import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '300px',
};

const center = {
  lat: 37.5665,
  lng: 126.9780,
};

const PlanDetail = () => {
  const [selectedDay, setSelectedDay] = useState(1);
  const days = Array.from({ length: 10 }, (_, i) => i + 1);
  const friends = ['프로필1', '프로필2', '프로필3'];

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'API_KEY', // 키 입력
  });

  return (
    <div style={styles.planDetail}>
      {/* 상단 제목 + 수정 버튼 */}
      <div style={styles.header}>
        <h2>제목</h2>
        <button style={styles.editButton}>수정</button>
      </div>

      {/* 여행 기간 및 친구 목록 */}
      <div style={styles.infoSection}>
        <div className="period">기간: 2025.06.10 ~ 2025.06.12</div>
        <div style={styles.friends}>
          친구들:
          {friends.map((friend, index) => (
            <span key={index} style={styles.friend}>
              {friend}
            </span>
          ))}
        </div>
      </div>

      {/* 날짜 탭 */}
      <div style={styles.dayTabs}>
        {days.map((day) => (
          <button
            key={day}
            style={{
              ...styles.dayTab,
              ...(selectedDay === day ? styles.dayTabActive : {}),
            }}
            onClick={() => setSelectedDay(day)}
          >
            {day}일차
          </button>
        ))}
      </div>

      {/* 본문: 지도 + 장소 검색 + 일정 설명 + 예산 */}
      <div style={styles.dayContent}>
        {/* 지도 API 자리 */}
        <div style={styles.mapSection}>
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={14}
            >
              {/* 마커, 경로 등 삽입 가능 */}
            </GoogleMap>
          ) : (
            <div>지도를 불러오는 중...</div>
          )}
        </div>

        {/* 장소 검색 */}
        <div style={styles.placeSearch}>
          <input
            style={styles.placeInput}
            type="text"
            placeholder="장소 검색"
          />
          <button>검색</button>
          <button>추가</button>
          <button>삭제</button>
        </div>

        {/* 일정 설명 글 */}
        <div className="description-section">
          <textarea
            style={styles.descriptionSectionTextarea}
            placeholder="일정 설명을 입력하세요"
          />
        </div>

        {/* 예산 표시 및 저장 버튼*/}
        <div style={styles.labelGroup}>
          <div style={styles.budget}>
            <div style={styles.name}>예산:</div>
            <input
              style={styles.budgetInput}
              type="number"
              placeholder="예산을 입력하세요"
              min="0"
            />
          </div>
          <button type="submit" style={styles.button}>
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  planDetail: {
    padding: '20px',
    fontFamily: 'Arial',
    maxWidth: '800px', // 최대 너비를 지정
    margin: '0 auto', // 가운데 정렬
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editButton: {
    padding: '5px 10px',
    fontSize: '14px',
  },
  infoSection: {
    marginTop: '10px',
  },
  friends: {
    marginTop: '5px',
  },
  friend: {
    display: 'inline-block',
    marginRight: '5px',
    backgroundColor: '#eee',
    padding: '4px 8px',
    borderRadius: '10px',
  },
  dayTabs: {
    margin: '20px 0',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  dayTab: {
    fontSize: '15px',
    padding: '8px 12px',
    border: 'none',
    backgroundColor: '#ddd',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  dayTabActive: {
    backgroundColor: '#003366',
    color: 'white',
  },
  dayContent: {
    border: '1px solid #ccc',
    padding: '15px',
    borderRadius: '8px',
  },
  mapSection: {
    height: '300px',
    backgroundColor: '#f5f5f5',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeSearch: {
    display: 'flex',
    gap: '10px',
    marginBottom: '15px',
  },
  placeInput: {
    fontSize: '16px',
    padding: '7px 10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    outline: 'none',
  },
  descriptionSectionTextarea: {
    width: '100%',
    height: '200px',
    fontSize: '16px',
    resize: 'none',
    padding: '7px 10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    marginBottom: '15px',
    outline: 'none',
  },
  budget: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginLeft: '5px',
  },
  labelGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  name: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  budgetInput: {
    width: '170px',
    padding: '7px 10px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    outline: 'none',
  },
  button: {
    padding: '10px 40px',
    fontSize: '16px',
    backgroundColor: '#003366',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    boxSizing: 'border-box',
  },
};

export default PlanDetail;
