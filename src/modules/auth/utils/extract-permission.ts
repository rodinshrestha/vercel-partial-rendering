import { ProfileUser } from '@/auth/types/user.types';

export const extractPermission = (user: ProfileUser | null) => {
  if (!user) return [];

  if (user?.organizationUser) {
    return user.organizationUser.role.permissions;
  } else {
    /**
     *  For super admin
     */
    return user.role.permissions;
  }
};
