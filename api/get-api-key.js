// api/get-api-key.js
// This is a Vercel Serverless Function.
// It reads the GROQ_API environment variable, which you set on Vercel,
// and securely sends it to your frontend application.

export default function handler(request, response) {
    const apiKey = process.env.GROQ_API;

    // IMPORTANT: For debugging, log the API key received by the serverless function.
    // This will appear in your Vercel deployment logs.
    console.log('API Key retrieved by serverless function:', apiKey ? 'Key is present' : 'Key is NOT present');
    if (apiKey && apiKey.length > 5) { // Log a partial key for verification, avoid logging full key
        console.log('Partial API Key:', apiKey.substring(0, 5) + '...');
    }

    if (apiKey) {
        response.setHeader('Access-Control-Allow-Origin', '*'); // Consider restricting this in production
        response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

        response.status(200).json({ apiKey: apiKey });
    } else {
        response.status(500).json({ error: 'API key not configured in Vercel environment variables.' });
    }
}
