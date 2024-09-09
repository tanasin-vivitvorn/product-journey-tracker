import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Custom404 = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the login page after 2 seconds, or you can do it immediately
    router.replace('/auth/login');
  }, [router]);

  return null;
};

export default Custom404;
