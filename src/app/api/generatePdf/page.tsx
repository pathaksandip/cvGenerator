// pages/page.tsx

import { NextApiRequest, NextApiResponse } from "next";
import { generatePdfFromHtml } from "@/app/Components/pdfViewer/PDF";
import React from "react";

// Function to handle PDF generation
const handleGeneratePdf = async () => {
  const htmlContent = `
    <html>
      <head>
        <title>PDF Content</title>
      </head>
      <body>
        <h1>Hello, world!</h1>
        <p>This is a PDF generated from HTML content.</p>
      </body>
    </html>
  `;

  const outputPath = "/pdf/generated.pdf";

  try {
    const pdfData = await generatePdfFromHtml(htmlContent, outputPath);

    // Send the PDF file as response
    const url = window.URL.createObjectURL(new Blob([pdfData]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "generated.pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();

    console.log("PDF downloaded successfully!");
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};

export default handleGeneratePdf;
