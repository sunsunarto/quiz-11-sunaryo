// pages/_app.js
import 'antd/dist/reset.css'; // Ant Design v5 uses reset.css
import '../styles/globals.css'; // Your global styles
import { ConfigProvider } from 'antd';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Student Management</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#1677ff',
            borderRadius: 6,
          },
        }}
      >
        <Component {...pageProps} />
      </ConfigProvider>
    </>
  );
}
