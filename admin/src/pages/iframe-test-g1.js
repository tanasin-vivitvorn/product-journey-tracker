import React, { useRef, useEffect, useState } from 'react';
import Head from 'next/head';

const JwtIframeRequest = () => {
  const iframeRef = useRef(null);
  const [iframeHeight, setIframeHeight] = useState(300); // Default height

  const jwt = 'your_jwt_token_here'; // Replace with your actual JWT
  const targetUrl = 'http://localhost:3000/dashboard'; // Your React page URL

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // Function to send JWT to iframe
    const sendJwtToIframe = () => {
      iframe.contentWindow.postMessage({ type: 'jwt', token: jwt }, targetUrl);
    };

    // Set up message listener for iframe
    const handleMessage = (event) => {
      if (event.origin !== new URL(targetUrl).origin) return;

      if (event.data.type === 'iframeHeight') {
        setIframeHeight(event.data.height);
      }
    };

    window.addEventListener('message', handleMessage);

    // Send JWT when iframe loads
    iframe.onload = sendJwtToIframe;

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [jwt, targetUrl]);

  return (
    <div>
      <Head>
        <title>JWT in iframe Request</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        <h1>JWT in iframe Request Example</h1>
        <iframe
          ref={iframeRef}
          src={targetUrl}
          style={{ width: '100%', height: `${iframeHeight}px`, border: '1px solid #ccc' }}
          scrolling="no"
        />
      </main>
    </div>
  );
};

export default JwtIframeRequest;