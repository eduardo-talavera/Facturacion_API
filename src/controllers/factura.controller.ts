import { Request, Response } from 'express';
import { timbrarFactura } from '../services/facturama.service';
import path from 'path';
import { Factura } from '../models/Factura';

export const crearFactura = async (req: Request, res: Response) => {
  try {
    const factura = await timbrarFactura(req.body);
    res.status(201).json(factura);
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Error al timbrar la factura' });
  }
};


export const obtenerPDF = async (req: Request, res: Response) => {
    try {
      const factura = await Factura.findOne({ uuid: req.params.uuid });
      if (!factura) {
        res.status(404).json({ error: 'Factura no encontrada' });
        return;
      }
  
      const pdfPath = path.resolve(factura.pdfPath!);

      res.download(pdfPath);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener el PDF' });
    }
  };


  export const listarFacturas = async (req: Request, res: Response) => {
    try {
      const { desde, hasta, rfc } = req.query;
      const filtro: any = {};
  
      if (desde || hasta) {
        filtro.fecha = {};
        if (desde) filtro.fecha.$gte = new Date(desde as string);
        if (hasta) filtro.fecha.$lte = new Date(hasta as string);
      }
  
      if (rfc) {
        filtro['receptor.Rfc'] = rfc;
      }
  
      const facturas = await Factura.find(filtro).select('uuid receptor total fecha');
      res.json(facturas);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener las facturas' });
    }
  };
  
  
