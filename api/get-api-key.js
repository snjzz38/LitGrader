// api/get-api-key.js
// This is a Vercel Serverless Function.
// It reads the GROQ_API environment variable, which you set on Vercel,
// and securely sends it to your frontend application.

export default function handler(request, response) {
    // Check if the environment variable is set.
    // In a production environment, Vercel will inject process.env.GROQ_API
    // based on the environment variable you configure in your Vercel project settings.
    const apiKey = process.env.GROQ_API;

    if (apiKey) {
        // Send the API key back to the client.
        // It's important to set appropriate CORS headers if your frontend is on a different domain.
        // For simplicity with Vercel hosting same-origin, this might not be strictly necessary,
        // but it's good practice for API endpoints.
        response.setHeader('Access-Control-Allow-Origin', '*'); // Adjust this for production to your specific frontend domain
        response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

        response.status(200).json({ apiKey: apiKey });
    } else {
        // Handle case where API key is not set.
        response.status(500).json({ error: 'API key not configured.' });
    }
}
