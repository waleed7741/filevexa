import { google } from 'googleapis';
import fs from 'fs';

const key = JSON.parse(fs.readFileSync('./service_account.json'));

const jwtClient = new google.auth.JWT({
  email: key.client_email,
  key: key.private_key,
  scopes: ['https://www.googleapis.com/auth/indexing'],
});

// ALL LIVE FILEVEXA ROUTES & ENDPOINTS
const urls = [
  // Homepage & Meta/AI Bots
  'https://filevexa.pages.dev/',
  'https://filevexa.pages.dev/llms.txt',

  // Image Tools
  'https://filevexa.pages.dev/compress-image-to-kb',
  'https://filevexa.pages.dev/heic-to-jpg',
  'https://filevexa.pages.dev/webp-to-jpg',
  'https://filevexa.pages.dev/webp-to-png',
  'https://filevexa.pages.dev/heic-to-png',
  'https://filevexa.pages.dev/avif-to-jpg',
  'https://filevexa.pages.dev/convert-png-to-jpg',
  'https://filevexa.pages.dev/convert-png-to-webp',

  // PDF Tools
  'https://filevexa.pages.dev/pdf-to-png',
  'https://filevexa.pages.dev/remove-pdf-pages',
  'https://filevexa.pages.dev/extract-pdf-pages',
  'https://filevexa.pages.dev/pdf-to-text',
  'https://filevexa.pages.dev/pdf-to-markdown',
  'https://filevexa.pages.dev/compress-pdf-200kb',

  // Text Tools
  'https://filevexa.pages.dev/text-case-converter',
  'https://filevexa.pages.dev/lorem-ipsum-generator',
  'https://filevexa.pages.dev/word-counter',

  // Utilities & Calculators
  'https://filevexa.pages.dev/qr-code-generator',
  'https://filevexa.pages.dev/password-generator',
  'https://filevexa.pages.dev/age-calculator',
  'https://filevexa.pages.dev/percentage-calculator',

  // Company Pages
  'https://filevexa.pages.dev/privacy',
  'https://filevexa.pages.dev/terms',
  'https://filevexa.pages.dev/contact'
];

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