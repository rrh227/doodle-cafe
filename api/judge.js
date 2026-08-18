const { rateLimit } = require('express-rate-limit');

const judgeLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: 'Too many requests. Please wait a moment.' },
});

async function handler(req, res) {
  const { image, prompt } = req.body;

  if (!image || !prompt) {
    return res.status(400).json({ error: 'Missing required fields: image, prompt' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey === 'your-key-here') {
    return res.status(500).json({ error: 'OpenAI API key not configured' });
  }

  // Placeholder — actual OpenAI integration is in story 04
  res.json({
    relevance: 3,
    creativity: 3,
    effort: 3,
    overall: 3,
    feedback: 'Judging not yet implemented — placeholder score.',
  });
}

// Export for both local Express (server.js) and Vercel serverless
module.exports = handler;
module.exports.judgeLimiter = judgeLimiter;
