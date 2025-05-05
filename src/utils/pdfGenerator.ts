import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const generarPDF = (factura: any, uuid: string): string => {
  const filePath = path.join(__dirname, `../../pdfs/${uuid}.pdf`);
  const doc = new PDFDocument();

  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(20).text('Factura CFDI 4.0', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`UUID: ${uuid}`);
  doc.text(`Cliente: ${factura.Receptor.Nombre} - ${factura.Receptor.Rfc}`);
  doc.text(`Fecha: ${factura.Fecha}`);
  doc.moveDown();

  factura.Conceptos.forEach((c: any) => {
    doc.text(`${c.Descripcion} - $${c.ValorUnitario}`);
  });

  doc.moveDown();
  doc.text(`Total: $${factura.Conceptos.reduce((acc: number, c: any) => acc + c.Importe, 0)}`);

  doc.end();

  return filePath;
};
