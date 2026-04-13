import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import ExcelJS from "exceljs";
import cors from "cors";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  const EXCEL_FILE = path.join(process.cwd(), "consultations.xlsx");

  // API Route for Consultation Requests
  app.post("/api/consultation", async (req, res) => {
    try {
      const { name, email, phone, service, message } = req.body;
      
      let workbook = new ExcelJS.Workbook();
      let worksheet;

      if (fs.existsSync(EXCEL_FILE)) {
        await workbook.xlsx.readFile(EXCEL_FILE);
        worksheet = workbook.getWorksheet("Consultations");
      } else {
        worksheet = workbook.addWorksheet("Consultations");
        worksheet.columns = [
          { header: "Date", key: "date", width: 20 },
          { header: "Name", key: "name", width: 25 },
          { header: "Email", key: "email", width: 30 },
          { header: "Phone", key: "phone", width: 20 },
          { header: "Service", key: "service", width: 20 },
          { header: "Message", key: "message", width: 50 },
        ];
        // Style the header
        worksheet.getRow(1).font = { bold: true };
      }

      worksheet.addRow({
        date: new Date().toLocaleString(),
        name,
        email,
        phone,
        service,
        message
      });

      await workbook.xlsx.writeFile(EXCEL_FILE);
      
      console.log(`New consultation request saved for: ${name}`);
      res.status(200).json({ success: true, message: "Consultation request saved successfully!" });
    } catch (error) {
      console.error("Error saving to Excel:", error);
      res.status(500).json({ success: false, message: "Failed to save request." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
