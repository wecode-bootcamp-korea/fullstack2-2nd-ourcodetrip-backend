export const platformData = [
  { id: 1, name: 'local' },
  { id: 2, name: 'kakao' },
];

export const usersData = [
  { id: 1, name: '테스트', email: 'test@test.com', platformId: 2 },
  {
    id: 2,
    name: '아코트',
    email: 'our@codetrip.coom',
    platformId: 2,
    isLocationAgreed: true,
    isEmailAgreed: true,
    isSmsAgreed: false,
  },
];

export const expectedData = {
  name: '테스트',
  email: 'test@test.com',
  phoneNumber: null,
  platformId: 2,
  isEmailAgreed: false,
  isSmsAgreed: false,
  updatedAt: '2021-11-02T02:58:12.802Z',
  profileImageUrl:
    'https://d2yoing0loi5gh.cloudfront.net/assets/default/user_profile_image-414acc60b27f0a258bec14c82b70dc361fc6768da9289f924f887bec1fc33849.png',
};

export const userProfileImageData = [
  {
    imageUrl:
      'https://d2yoing0loi5gh.cloudfront.net/assets/default/user_profile_image-414acc60b27f0a258bec14c82b70dc361fc6768da9289f924f887bec1fc33849.png',
    userId: 1,
  },
  {
    imageUrl:
      'https://d2yoing0loi5gh.cloudfront.net/assets/default/user_profile_image-414acc60b27f0a258bec14c82b70dc361fc6768da9289f924f887bec1fc33849.png',
    userId: 2,
  },
];

export const KAKAO_ACCESS_TOKEN = 'someKakaoAccessToken';

export const kakaoSuccessResData = {
  id: 1964855171,
  connected_at: '2021-11-01T07:11:06Z',
  properties: {
    nickname: '테스트',
    profile_image:
      'https://d2yoing0loi5gh.cloudfront.net/assets/default/user_profile_image-414acc60b27f0a258bec14c82b70dc361fc6768da9289f924f887bec1fc33849.png',
    thumbnail_image:
      'https://d2yoing0loi5gh.cloudfront.net/assets/default/user_profile_image-414acc60b27f0a258bec14c82b70dc361fc6768da9289f924f887bec1fc33849.png',
  },
  kakao_account: {
    profile_nickname_needs_agreement: false,
    profile_image_needs_agreement: false,
    profile: {
      nickname: '테스트',
      thumbnail_image_url:
        'https://d2yoing0loi5gh.cloudfront.net/assets/default/user_profile_image-414acc60b27f0a258bec14c82b70dc361fc6768da9289f924f887bec1fc33849.png',
      profile_image_url:
        'https://d2yoing0loi5gh.cloudfront.net/assets/default/user_profile_image-414acc60b27f0a258bec14c82b70dc361fc6768da9289f924f887bec1fc33849.png',
      is_default_image: false,
    },
    has_email: true,
    email_needs_agreement: false,
    is_email_valid: true,
    is_email_verified: true,
    email: 'test@test.com',
  },
};

export const kakaoFailedResData = {
  msg: 'this access token does not exist',
  code: -401,
};
