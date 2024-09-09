import React, { useRef, useCallback, useState } from 'react';
import Head from 'next/head';

const JwtIframeRequest = () => {
  const iframeRef = useRef(null);
  const [iframeHeight, setIframeHeight] = useState(300); // Default height

  const jwt = 'your_jwt_token_here'; // Replace with your actual JWT
  const targetUrl = 'http://localhost:3000/api/proxy?url=https://google.com'; // Replace with your API endpoint

  const loadContent = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { 
            margin: 0; 
            font-family: Arial, sans-serif; 
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }
          #content {
            flex: 1;
            display: flex;
            flex-direction: column;
          }
          .clearfix::after {
            content: "";
            display: table;
            clear: both;
          }
        </style>
      </head>
      <body>
        <div id="content" class="clearfix">Loading...</div>
        <script>
          function resizeIframe() {
            const height = Math.max(
              document.body.scrollHeight,
              document.documentElement.scrollHeight,
              document.body.offsetHeight,
              document.documentElement.offsetHeight,
              document.body.clientHeight,
              document.documentElement.clientHeight
            );
            window.parent.postMessage({ type: 'resize', height }, '*');
          }

          function setContent(data) {
            const content = document.getElementById('content');
            content.innerHTML = data;
            content.style.height = 'auto'; // Reset height
            content.style.height = content.scrollHeight + 'px'; // Set to scroll height
            resizeIframe();
          }

          fetch('${targetUrl}', {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ${jwt}'
            }
          })
          .then(response => response.text())
          .then(data => {
            setContent(data);
          })
          .catch(error => {
            setContent('Error: ' + error);
          });

          // Resize on load and whenever window is resized
          window.onload = resizeIframe;
          window.onresize = resizeIframe;

          // Use MutationObserver to detect changes in the DOM
          const observer = new MutationObserver(resizeIframe);
          observer.observe(document.body, { 
            attributes: true, 
            childList: true, 
            subtree: true 
          });
        <\/script>
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const blobUrl = URL.createObjectURL(blob);

    iframe.src = blobUrl;

    iframe.onload = () => URL.revokeObjectURL(blobUrl);
  }, [jwt, targetUrl]);

  // Handle messages from the iframe
  React.useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'resize') {
        setIframeHeight(event.data.height);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div>
      <Head>
        <title>JWT in iframe Request</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        <h1>JWT in iframe Request Example</h1>
        <button onClick={loadContent}>Load Content</button>
        <iframe
          ref={iframeRef}
          style={{ width: '100%', height: `${iframeHeight}px`, border: '1px solid #ccc' }}
        />
      </main>
    </div>
  );
};

export default JwtIframeRequest;