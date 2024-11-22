//Converte o MP3 para WAV 

const { exec } = require('child_process');

function convertAudio(inputPath, outputPath) {
    return new Promise((resolve, reject) => {
        exec(`ffmpeg -i "${inputPath}" "${outputPath}"`, (error) => {
            if (error) return reject(error);
            resolve();
        });
    });
}

module.exports = { convertAudio };

//Converte documento DOCX em PDF

const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

async function convertDocxToPdf(inputPath, outputPath) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    page.drawText('Exemplo de conversão. Integre com bibliotecas específicas.');
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputPath, pdfBytes);
}

module.exports = { convertDocxToPdf };

//Converte o JPEG para PNG
const sharp = require('sharp');

async function convertImage(inputPath, outputPath) {
    await sharp(inputPath).toFormat('png').toFile(outputPath);
}

module.exports = { convertImage };
