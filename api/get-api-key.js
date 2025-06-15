// api/get-configs.js
// This Vercel Serverless Function securely provides both the Gemini API key
// and Firebase client-side configuration from environment variables.

export default function handler(request, response) {
    // Read environment variables for Gemini API key
    const groqApiKey = process.env.GROQ_API;

    // Read environment variables for Firebase client-side configuration
    const firebaseConfig = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID // Optional: include if you use Analytics
    };

    // Basic validation for essential keys
    if (!groqApiKey || !firebaseConfig.apiKey || !firebaseConfig.projectId) {
        console.error('Missing essential API keys or Firebase config in environment variables.');
        response.status(500).json({ error: 'Server configuration error: Essential API keys or Firebase config missing.' });
        return;
    }

    // Set CORS headers for security and accessibility
    response.setHeader('Access-Control-Allow-Origin', '*'); // Consider restricting this to your frontend domain in production
    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    response.status(200).json({
        geminiApiKey: groqApiKey,
        firebaseConfig: firebaseConfig
    });
}
