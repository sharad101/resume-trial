


const { parseResume } = require('../utils/parseResume');
const { Configuration, OpenAI } = require('openai');
//import { Configuration, OpenAIApi } from 'openai';
const fs = require('fs');
require('dotenv').config();


// const client = new OpenAI({
//     apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
//   });
// const configuration =  Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// });
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

const handleResumeUpload = async (req, res) => {
    try {
        // Parse the uploaded resume
        const resumeText = await parseResume(req.file.path);
        const userRequirements = req.body.requirements;

        // Use OpenAI to evaluate the match
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Evaluate the match between the following resume and job requirements:\n\nResume:\n${resumeText}\n\nJob Requirements:\n${userRequirements}`,
            max_tokens: 500,
        });

        // Clean up uploaded file
        fs.unlinkSync(req.file.path);

        // Return the result
        res.json({ match: response.data.choices[0].text.trim() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to process resume' });
    }
};

module.exports = { handleResumeUpload };
