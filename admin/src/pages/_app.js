import Head from 'next/head';
import Script from 'next/script';

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import '../styles/globals.css'; // Global styles for the entire application
import '../styles/auth.css'; // Styles specific to the AuthLayout

import Layout from '../components/Layout';
import AuthLayout from '../components/AuthLayout';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const authPages = ['/auth/login', '/auth/forgot-password', '/auth/register'];

  useEffect(() => {
    // Dynamically import Bootstrap's JS and jQuery only on the client side
    Promise.all([
      import('bootstrap/dist/js/bootstrap.bundle.min'),
      import('jquery')
    ]).then(([bootstrap, $]) => {
      window.jQuery = window.$ = $;
    });
  }, []);

  return (
    <Provider store={store}>
      <Head>
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" 
        crossOrigin="anonymous" 
        referrerPolicy="no-referrer" 
      />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
    integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"></link>
      </Head>
      <Script
        src="https://code.jquery.com/jquery-1.12.4.min.js"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/js/bootstrap.min.js"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      />
      {authPages.includes(router.pathname) ? (
        <AuthLayout title="ADMIN">
          <Component {...pageProps} />
        </AuthLayout>
      ) : (
        <Layout>
          <Component {...pageProps} />
          <ToastContainer position="top-right" autoClose={5000} />
        </Layout>
      )}
    </Provider>
  );
}

export default MyApp;

