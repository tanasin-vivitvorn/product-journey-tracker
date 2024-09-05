import '../styles/global.css';
import { Provider } from 'react-redux';
import { store } from '../store';
import '../node_modules/flowbite/dist/flowbite.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
