import mongoose from 'mongoose';

const FacturaSchema = new mongoose.Schema({
  uuid: String,
  receptor: Object,
  conceptos: Array,
  total: Number,
  fecha: Date,
  xml: String,
  pdfPath: String
}, { timestamps: true });

export const Factura = mongoose.model('Factura', FacturaSchema);
