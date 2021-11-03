import prisma from '../../prisma';

const getUserProfileById = async (userId) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phoneNumber: true,
      platformId: true,
      isEmailAgreed: true,
      isSmsAgreed: true,
      updatedAt: true,
      userProfileImage: {
        select: {
          imageUrl: true,
        },
      },
    },
  });
};

const getUserProfileByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phoneNumber: true,
      platformId: true,
      isEmailAgreed: true,
      isSmsAgreed: true,
      updatedAt: true,
      userProfileImage: {
        select: {
          imageUrl: true,
        },
      },
    },
  });
};

const updateUserProfile = async (userId, updateData) => {
  const { name, isEmailAgreed, isSmsAgreed } = updateData;
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
      isEmailAgreed,
      isSmsAgreed,
    },
  });
};

const createKakaoUser = async (user) => {
  const { email, name, profileImageUrl: imageUrl } = user;
  const platformData = await prisma.platform.findUnique({
    where: {
      name: 'kakao',
    },
    select: {
      id: true,
    },
  });

  const { id: platformId } = platformData;
  if (!platformId) throw new Error('kakao platform data is not inserted');

  return await prisma.user.create({
    data: {
      email,
      name,
      platformId,
      isEmailAgreed: true,
      userProfileImage: {
        create: {
          imageUrl,
        },
      },
    },
  });
};

const setKakaoLink = async (email, kakaoPlatformId) => {
  return await prisma.user.update({
    where: {
      email,
    },
    data: {
      platformId: kakaoPlatformId,
    },
  });
};

const unsetKakaoLink = async (email, localPlatformId) => {
  return await prisma.user.update({
    where: {
      email,
    },
    data: {
      platformId: localPlatformId,
    },
  });
};

const getWishlistByUserId = async (userId) => {
  return await prisma.wishlist.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      productId: true,
    },
  });
};

const addWishlist = async (userId, productId) => {
  await prisma.wishlist.create({
    data: {
      productId,
      userId,
    },
  });
};

const removeWishlist = async (wishlistId) => {
  await prisma.wishlist.delete({
    where: {
      id: wishlistId,
    },
  });
};

const getPlatformIdByName = async (platformName) => {
  await prisma.platform.findUnique({
    where: {
      name: platformName,
    },
    select: {
      platformId: true,
    },
  });
};

export default {
  getUserProfileById,
  getUserProfileByEmail,
  updateUserProfile,
  createKakaoUser,
  setKakaoLink,
  unsetKakaoLink,
  getWishlistByUserId,
  addWishlist,
  removeWishlist,
  getPlatformIdByName,
};
