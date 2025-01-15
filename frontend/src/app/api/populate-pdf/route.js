import { PDFDocument } from "pdf-lib";
import fs from 'fs'
import path from 'path'

export async function POST(req) {
  const { formData } = await req.json()
  const pdfPath = path.resolve()
}