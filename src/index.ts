import * as fs from 'fs';
import * as path from 'path';
import pdfParse from 'pdf-parse';

async function extractMetadata(filePath: string) {
    // Read the PDF file
    const dataBuffer = fs.readFileSync(filePath);

    // Parse the PDF using pdf-parse to extract metadata
    const data = await pdfParse(dataBuffer);

    // Output the metadata
    console.log('PDF Metadata:');
    console.log(`Title: ${data.info.Title || 'N/A'}`);
    console.log(`Author: ${data.info.Author || 'N/A'}`);
    console.log(`Subject: ${data.info.Subject || 'N/A'}`);
    console.log(`Keywords: ${data.info.Keywords || 'N/A'}`);
    console.log(`Creator: ${data.info.Creator || 'N/A'}`);
    console.log(`Producer: ${data.info.Producer || 'N/A'}`);
    console.log(`Creation Date: ${data.info.CreationDate || 'N/A'}`);
    console.log(`Modification Date: ${data.info.ModDate || 'N/A'}`);

    if ((data.info.Subject != undefined && data.info.Subject == '"/reports/IB/Receipt"') && (data.info.Creator != undefined && data.info.Creator == "JasperReports Library version 6.20.3-415f9428cffdb6805c6f85bbb29ebaf18813a2ab")) {
        console.log(`This is a proper check!`);
    } else {
        console.log(`This is a fake check!`);
    }
}

function main() {
    const filePath = path.resolve(__dirname, '../pdf-name.pdf'); // Replace with your PDF file path
    if (fs.existsSync(filePath)) {
        extractMetadata(filePath).catch(console.error);
    } else {
        console.error('File does not exist.');
    }
}

main();