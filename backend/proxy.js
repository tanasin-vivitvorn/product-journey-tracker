const express = require('express');
const request = require('request');
const url = require('url');

const app = express();
const port = process.env.PORT || 3001;

// Whitelist of allowed domains (for security)
const allowedDomains = ['google.com', 'example.com']; // Add domains you want to allow

app.get('/api/proxy', (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).send('URL parameter is required');
  }

  const parsedUrl = url.parse(targetUrl);

  // Check if the domain is in the whitelist
  if (!allowedDomains.includes(parsedUrl.hostname)) {
    return res.status(403).send('Access to this domain is not allowed');
  }

  // Set headers to disable caching
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  // Proxy the request
  request(targetUrl)
    .on('error', (err) => {
      console.error('Error fetching URL:', err);
      res.status(500).send('Error fetching the requested URL');
    })
    .pipe(res);
});

app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
