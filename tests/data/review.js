export const platformData = [
  { id: 1, name: 'local' },
  { id: 2, name: 'kakao' },
];

export const userData = [
  {
    id: 1,
    name: '테스트',
    email: 'test@test.com',
    phoneNumber: '010-1234-5178',
    platformId: 2,
  },
  {
    id: 2,
    name: '아코트',
    email: 'our@codetrip.com',
    phoneNumber: '010-1231-5178',
    platformId: 2,
  },
  {
    id: 3,
    name: '위코드',
    email: 'we@code.com',
    phoneNumber: '010-1234-5168',
    platformId: 2,
  },
  {
    id: 4,
    name: '디지털노마드',
    email: 'digital@nomad.com',
    phoneNumber: '010-1134-5178',
    platformId: 2,
  },
  {
    id: 5,
    name: '백엔드',
    email: 'back@end.com',
    phoneNumber: '010-1234-5078',
    platformId: 2,
  },
  {
    id: 6,
    name: '프론트',
    email: 'front@end.com',
    phoneNumber: '010-1204-5178',
    platformId: 2,
  },
];

export const productTypeData = [
  { id: 1, name: '투어' },
  { id: 2, name: '티켓' },
];

export const productData = [
  { id: 1, name: '이거시투어다', productTypeId: 1 },
  { id: 2, name: '이거시티켓이다', productTypeId: 2 },
];

export const paymentTypeData = [
  { id: 1, name: '신용/체크카드' },
  { id: 2, name: '실시간계좌이체' },
  { id: 3, name: '토스' },
  { id: 4, name: '네이버페이' },
  { id: 5, name: '페이코' },
];

export const reservationData = [
  { id: 1, productId: 1, userId: 1, price: 20000, paymentTypeId: 1 },
  { id: 2, productId: 1, userId: 2, price: 25000, paymentTypeId: 2 },
  { id: 3, productId: 1, userId: 3, price: 45000, paymentTypeId: 3 },
  { id: 4, productId: 1, userId: 4, price: 100000, paymentTypeId: 1 },
  { id: 5, productId: 1, userId: 5, price: 50000, paymentTypeId: 2 },
  { id: 6, productId: 1, userId: 6, price: 30000, paymentTypeId: 3 },
  { id: 7, productId: 1, userId: 1, price: 40000, paymentTypeId: 1 },
];

export const reviewData = [
  {
    id: 1,
    reservationId: 1,
    rating: 5,
    content: '저렴하고 편안하게 다녀와서 좋았어요!',
    createdAt: new Date(2021, 11, 3),
  },
  {
    id: 2,
    reservationId: 2,
    rating: 4,
    content: '일단 가본 아쿠아리움중 볼거리가 많았습니다',
    createdAt: new Date(2021, 11, 3),
  },
  {
    id: 3,
    reservationId: 3,
    rating: 3,
    content:
      '쿠폰 이용해서 오랜만에 즐거운 시간 보냈어요\\n12시쯤 입장하니 붐비지 않았어요\\n아이들은 엄청 좋아하네요~~',
    createdAt: new Date(2021, 11, 3),
  },
  {
    id: 4,
    reservationId: 4,
    rating: 2,
    content: '리뷰 예시 테스트',
    createdAt: new Date(2021, 11, 3),
  },
  {
    id: 5,
    reservationId: 5,
    rating: 5,
    content: '테스트 중입니다 아아아',
    createdAt: new Date(2021, 11, 3),
  },
  {
    id: 6,
    reservationId: 6,
    rating: 3,
    content: '제발 오류 뜨지 말아주세요ㅠ',
    createdAt: new Date(2021, 11, 3),
  },
  {
    id: 7,
    reservationId: 7,
    rating: 1,
    content: '으호힝',
    createdAt: new Date(2021, 11, 3),
  },
];

export const reviewImageData = [
  {
    id: 1,
    imageUrl:
      'https://d2yoing0loi5gh.cloudfront.net/assets/default/user_profile_image-414acc60b27f0a258bec14c82b70dc361fc6768da9289f924f887bec1fc33849.png',
    reviewId: 1,
  },
  {
    id: 2,
    imageUrl:
      'https://d2yoing0loi5gh.cloudfront.net/assets/default/user_profile_image-414acc60b27f0a258bec14c82b70dc361fc6768da9289f924f887bec1fc33850.png',
    reviewId: 2,
  },
  {
    id: 3,
    imageUrl:
      'https://d2yoing0loi5gh.cloudfront.net/assets/default/user_profile_image-414acc60b27f0a258bec14c82b70dc361fc6768da9289f924f887bec1fc33851.png',
    reviewId: 3,
  },
  {
    id: 4,
    imageUrl:
      'https://d2yoing0loi5gh.cloudfront.net/assets/default/user_profile_image-414acc60b27f0a258bec14c82b70dc361fc6768da9289f924f887bec1fc33852.png',
    reviewId: 4,
  },
  {
    id: 5,
    imageUrl:
      'https://d2yoing0loi5gh.cloudfront.net/assets/default/user_profile_image-414acc60b27f0a258bec14c82b70dc361fc6768da9289f924f887bec1fc33853.png',
    reviewId: 5,
  },
  {
    id: 6,
    imageUrl:
      'https://d2yoing0loi5gh.cloudfront.net/assets/default/user_profile_image-414acc60b27f0a258bec14c82b70dc361fc6768da9289f924f887bec1fc33854.png',
    reviewId: 6,
  },
];

export const initialReviewData = {
  message: 'success',
  data: {
    overview: {
      totalReviews: 7,
      ratingAvg: 3.3,
      totalReviewsForEachRating: [2, 1, 2, 1, 1],
      totalReviewImages: 6,
    },
    reviewImages: [
      'https://d2yoing0loi5gh.cloudfront.net/assets/default/user_profile_image-414acc60b27f0a258bec14c82b70dc361fc6768da9289f924f887bec1fc33849.png',
      'https://d2yoing0loi5gh.cloudfront.net/assets/default/user_profile_image-414acc60b27f0a258bec14c82b70dc361fc6768da9289f924f887bec1fc33850.png',
      'https://d2yoing0loi5gh.cloudfront.net/assets/default/user_profile_image-414acc60b27f0a258bec14c82b70dc361fc6768da9289f924f887bec1fc33851.png',
      'https://d2yoing0loi5gh.cloudfront.net/assets/default/user_profile_image-414acc60b27f0a258bec14c82b70dc361fc6768da9289f924f887bec1fc33852.png',
      'https://d2yoing0loi5gh.cloudfront.net/assets/default/user_profile_image-414acc60b27f0a258bec14c82b70dc361fc6768da9289f924f887bec1fc33853.png',
      'https://d2yoing0loi5gh.cloudfront.net/assets/default/user_profile_image-414acc60b27f0a258bec14c82b70dc361fc6768da9289f924f887bec1fc33854.png',
    ],
    threads: [
      {
        id: 1,
        createdAt: '2021-12-02T15:00:00.000Z',
        rating: 5,
        content: '저렴하고 편안하게 다녀와서 좋았어요!',
        reviewImageUrls: [
          'https://d2yoing0loi5gh.cloudfront.net/assets/default/user_profile_image-414acc60b27f0a258bec14c82b70dc361fc6768da9289f924f887bec1fc33849.png',
        ],
      },
      {
        id: 2,
        createdAt: '2021-12-02T15:00:00.000Z',
        rating: 4,
        content: '일단 가본 아쿠아리움중 볼거리가 많았습니다',
        reviewImageUrls: [
          'https://d2yoing0loi5gh.cloudfront.net/assets/default/user_profile_image-414acc60b27f0a258bec14c82b70dc361fc6768da9289f924f887bec1fc33850.png',
        ],
      },
      {
        id: 3,
        createdAt: '2021-12-02T15:00:00.000Z',
        rating: 3,
        content:
          '쿠폰 이용해서 오랜만에 즐거운 시간 보냈어요\\n12시쯤 입장하니 붐비지 않았어요\\n아이들은 엄청 좋아하네요~~',
        reviewImageUrls: [
          'https://d2yoing0loi5gh.cloudfront.net/assets/default/user_profile_image-414acc60b27f0a258bec14c82b70dc361fc6768da9289f924f887bec1fc33851.png',
        ],
      },
    ],
  },
};

export const additionalReivewData = {
  message: 'success',
  data: {
    threads: [
      {
        id: 4,
        createdAt: '2021-12-02T15:00:00.000Z',
        rating: 2,
        content: '리뷰 예시 테스트',
        reviewImageUrls: [
          'https://d2yoing0loi5gh.cloudfront.net/assets/default/user_profile_image-414acc60b27f0a258bec14c82b70dc361fc6768da9289f924f887bec1fc33852.png',
        ],
      },
      {
        id: 5,
        createdAt: '2021-12-02T15:00:00.000Z',
        rating: 5,
        content: '테스트 중입니다 아아아',
        reviewImageUrls: [
          'https://d2yoing0loi5gh.cloudfront.net/assets/default/user_profile_image-414acc60b27f0a258bec14c82b70dc361fc6768da9289f924f887bec1fc33853.png',
        ],
      },
      {
        id: 6,
        createdAt: '2021-12-02T15:00:00.000Z',
        rating: 3,
        content: '제발 오류 뜨지 말아주세요ㅠ',
        reviewImageUrls: [
          'https://d2yoing0loi5gh.cloudfront.net/assets/default/user_profile_image-414acc60b27f0a258bec14c82b70dc361fc6768da9289f924f887bec1fc33854.png',
        ],
      },
    ],
  },
};
