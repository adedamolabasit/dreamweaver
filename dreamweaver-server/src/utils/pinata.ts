import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

// Function to download image from DALL·E temporary URL
async function downloadImage(url: string): Promise<Buffer> {
  const response = await axios.get(url, {
    responseType: 'arraybuffer',
  });
  return Buffer.from(response.data, 'binary');
}

// Function to upload image buffer to Pinata
async function uploadToPinata(imageBuffer: Buffer, fileName: string) {
  const form = new FormData();
  form.append('file', imageBuffer, fileName);

  const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', form, {
    headers: {
      ...form.getHeaders(),
      Authorization: `Bearer YOUR_PINATA_JWT`, // Use your JWT or API keys
    },
  });

  return res.data; // Contains IPFS hash and metadata
}

// Usage example
(async () => {
  const dalleImageUrl = 'https://...'; // Replace with your actual DALL·E URL
  const imageBuffer = await downloadImage(dalleImageUrl);
  const result = await uploadToPinata(imageBuffer, 'dalle-image.png');

  console.log('Uploaded to Pinata:', result);
})();
