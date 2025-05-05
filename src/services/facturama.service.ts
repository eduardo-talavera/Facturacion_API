import axios from 'axios';
import { generarPDF } from '../utils/pdfGenerator';
import { Factura } from '../models/Factura';

const facturamaAPI = axios.create({
  baseURL: 'https://api.facturama.mx/api-lite/',
  auth: {
    username: process.env.FACTURAMA_USER!,
    password: process.env.FACTURAMA_PASSWORD!,
  },
});

export const timbrarFactura = async (data: any) => {
  const response = await facturamaAPI.post('/cfdi40', data);
  const uuid = response.data.Complemento.TaxStamp.Uuid;
  const xml = response.data.Xml;

  const pdfPath = generarPDF(data, uuid);

  const total = data.Conceptos.reduce((acc: number, c: any) => acc + c.Importe, 0);

  const nuevaFactura = new Factura({
    uuid,
    receptor: data.Receptor,
    conceptos: data.Conceptos,
    total,
    fecha: data.Fecha,
    xml,
    pdfPath
  });

  await nuevaFactura.save();

  return { uuid, pdfPath };
};
