import React from 'react';
import { useParams } from 'react-router-dom';

const placeData = {
  domestic: {
    부산: {
      name: '부산',
      description: '부산 상세 설명입니다.',
      image: '/images/busan.jpg',
    },
    제주도: {
      name: '제주도',
      description: '제주도 상세 설명입니다.',
      image: '/images/jeju.jpg',
    },
    서울: {
      name: '서울',
      description: '서울 상세 설명입니다.',
      image: '/images/seoul.jpg',
    },
    강릉: {
      name: '강릉',
      description: '강릉 상세 설명입니다.',
      image: '/images/gangneung.jpg',
    },
  },
  overseas: {
    다낭: {
      name: '다낭',
      description: '다낭 상세 설명입니다.',
      image: '/images/danang.jpg',
    },
    오사카: {
      name: '오사카',
      description: '오사카 상세 설명입니다.',
      image: '/images/osaka.jpg',
    },
    방콕: {
      name: '방콕',
      description: '방콕 상세 설명입니다.',
      image: '/images/bangkok.jpg',
    },
    파리: {
      name: '파리',
      description: '파리 상세 설명입니다.',
      image: '/images/paris.jpg',
    },
  },
};

function PlaceDetail() {
  const { type, placeName } = useParams();

  const place = placeData[type]?.[placeName];

  if (!place) {
    return <div>해당 여행지를 찾을 수 없습니다.</div>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h1>{place.name}</h1>
      <img
        src={place.image}
        alt={place.name}
        style={{ width: '300px', borderRadius: '1rem' }}
      />
      <p>{place.description}</p>
    </div>
  );
}

export default PlaceDetail;
