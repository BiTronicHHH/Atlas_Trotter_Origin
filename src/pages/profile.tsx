import { getUserProfileLink } from '@/api/user';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { auth } from '@/lib/firebase';
import { ROUTE_LOGIN } from '@/res/routes';
import router from 'next/router';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const ProfileDefaultPage = () => {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    async function fetchLink() {
      const profileLink = await getUserProfileLink();
      if (profileLink) router.push(`/${profileLink}`);
      else router.push(ROUTE_LOGIN);
    }
    fetchLink();
  }, [loading, user]);

  return <LoadingScreen />;
};

export default ProfileDefaultPage;
