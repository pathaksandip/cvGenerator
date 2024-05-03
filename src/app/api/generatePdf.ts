// pages/api/generatePdf.ts

import { NextApiRequest, NextApiResponse } from "next";
import { generatePdfFromHtml } from "@/app/Components/pdfViewer/PDF";
import fs from "fs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
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
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=generated.pdf"
      );
      res.status(200).send(pdfData);
    } catch (error) {
      console.error("Error generating PDF:", error);
      res.status(500).json({ error: "Failed to generate PDF" });
    }
  } else {
    // Respond with Method Not Allowed if the method is not GET
    res.status(405).end();
  }
}
