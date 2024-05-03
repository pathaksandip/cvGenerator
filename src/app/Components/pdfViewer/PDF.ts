// utils/generatePdfFromHtml.js

import puppeteer from "puppeteer";
import fs from "fs";

export async function generatePdfFromHtml(
  htmlContent: string,
  outputPath: string
) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    await page.pdf({ path: outputPath || "example.pdf", format: "A4" });
    await browser.close();

    // Read the PDF file contents
    const pdfData = fs.readFileSync(outputPath || "example.pdf");

    return pdfData;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error; // Rethrow the error for further handling
  }
}
