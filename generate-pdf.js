const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    console.log('🚀 Starting PDF generation...');

    // Launch browser
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Navigate to the CLEAN PDF version
    const resumePath = `file://${path.join(__dirname, 'dta', 'resume-pdf.html')}`;
    console.log(`📄 Loading resume from: ${resumePath}`);

    await page.goto(resumePath, {
        waitUntil: 'networkidle0'
    });

    // Wait for fonts and images to load
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate PDF
    const pdfPath = path.join(__dirname, 'dta', 'Dang_Thai_Anh_Resume.pdf');
    console.log(`💾 Generating PDF to: ${pdfPath}`);

    await page.pdf({
        path: pdfPath,
        format: 'A4',
        printBackground: true,
        margin: {
            top: '10mm',
            right: '10mm',
            bottom: '10mm',
            left: '10mm'
        },
        preferCSSPageSize: false
    });

    await browser.close();

    console.log('✅ PDF generated successfully!');
    console.log(`📍 Location: ${pdfPath}`);
})();
