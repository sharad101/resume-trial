


const pdfParse = require('pdf-parse');
const fs = require('fs');
//const WordExtractor = require('@microsoft/word-processing');

const parseResume = async (filePath) => {
    const fileExtension = filePath.split('.').pop();
    console.log(fileExtension);
    if (fileExtension === 'pdf') {
        const dataBuffer = fs.readFileSync(filePath);
        const pdfData = await pdfParse(dataBuffer);
        return pdfData.text;
    // } else if (fileExtension === 'docx') {
    //     const extractor = new WordExtractor();
    //     const extracted = await extractor.extract(filePath);
    //     return extracted.getBody();
    } else {
        throw new Error('Unsupported file format');
    }
};

module.exports = { parseResume };
