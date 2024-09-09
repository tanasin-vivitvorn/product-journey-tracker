import { useEffect } from 'react';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');

      const publicPaths = ['/auth/login', '/auth/forgot-password', '/auth/register'];
      const path = router.pathname;

      if (!token && !publicPaths.includes(path)) {
        router.replace('/auth/login');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
