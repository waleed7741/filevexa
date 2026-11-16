import { google } from 'googleapis';
import fs from 'fs';
import { TOOLS_SEO_DATA } from './src/config/toolsSEOData.js';

const key = JSON.parse(fs.readFileSync('./service_account.json'));

const jwtClient = new google.auth.JWT({
  email: key.client_email,
  key: key.private_key,
  scopes: ['https://www.googleapis.com/auth/indexing'],
});

const staticRoutes = [
  '/',
  '/privacy',
  '/terms',
  '/contact',
  '/image-tools',
  '/pdf-tools',
  '/daily-utilities',
  '/text-tools',
  '/calculators',
];
const urls = [...new Set([
  ...staticRoutes,
  ...Object.keys(TOOLS_SEO_DATA).map((slug) => `/${slug}`),
])].map((route) => `https://filevexa.pages.dev${route}`);

async function publishURLs() {
  await jwtClient.authorize();
  const indexing = google.indexing({ version: 'v3', auth: jwtClient });

  for (const url of urls) {
    try {
      const res = await indexing.urlNotifications.publish({
        requestBody: {
          url: url,
          type: 'URL_UPDATED',
        },
      });
      console.log(`✅ Indexing Ping Sent: ${url} (Status: ${res.status})`);
    } catch (err) {
      console.error(`❌ Failed: ${url}`, err.message);
    }
  }
}

publishURLs();