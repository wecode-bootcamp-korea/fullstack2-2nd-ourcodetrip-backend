import prisma from '../../prisma';

const getUserById = async (userId) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
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

const getUserByEmail = async (email) => {
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

export default { getUserById, getUserByEmail, createKakaoUser };
