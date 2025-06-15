// api/get-configs.js
// This Vercel Serverless Function now securely provides ONLY the Google API key
// from environment variables.

export default function handler(request, response) {
    // Read environment variable for Google API key
    const googleApiKey = process.env.GOOGLE_API;

    // --- DEBUGGING LOGS (for Vercel runtime logs) ---
    console.log('--- Serverless Function Config Check ---');
    console.log('GOOGLE_API (googleApiKey):', googleApiKey ? `[Present] ${googleApiKey.substring(0, 5)}...` : '[NOT SET]');
    console.log('----------------------------------------------------');
    // --- END DEBUGGING LOGS ---


    // Basic validation for essential keys (only Google API key now)
    if (!googleApiKey) {
        console.error('Missing essential API key in environment variables: GOOGLE_API is [NOT SET]');
        response.status(500).json({ error: 'Server configuration error: Google API key missing.' });
        return;
    }

    // Set CORS headers for security and accessibility
    response.setHeader('Access-Control-Allow-Origin', '*'); // Consider restricting this to your frontend domain in production
    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    response.status(200).json({
        googleApiKey: googleApiKey // Changed property name to googleApiKey
    });
}
