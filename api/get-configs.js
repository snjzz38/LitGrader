// api/get-configs.js
// This Vercel Serverless Function now securely provides ONLY the Groq API key
// from environment variables.

export default function handler(request, response) {
    // Read environment variable for Groq API key
    const groqApiKey = process.env.GROQ_API;

    // --- DEBUGGING LOGS (for Vercel runtime logs) ---
    console.log('--- Serverless Function Config Check (No Firebase) ---');
    console.log('GROQ_API (groqApiKey):', groqApiKey ? `[Present] ${groqApiKey.substring(0, 5)}...` : '[NOT SET]');
    console.log('----------------------------------------------------');
    // --- END DEBUGGING LOGS ---


    // Basic validation for essential keys (only Groq API key now)
    if (!groqApiKey) {
        console.error('Missing essential API key in environment variables: GROQ_API is [NOT SET]');
        response.status(500).json({ error: 'Server configuration error: Groq API key missing.' });
        return;
    }

    // Set CORS headers for security and accessibility
    response.setHeader('Access-Control-Allow-Origin', '*'); // Consider restricting this to your frontend domain in production
    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    response.status(200).json({
        groqApiKey: groqApiKey // Changed property name to groqApiKey for clarity
    });
}
