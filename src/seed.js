require('dotenv').config();
const mongoose = require('mongoose');

const Discoteca = require('./models/Discoteca');
const Factura = require('./models/FacturaMensual');
const Tarifa = require('./models/Tarifa');
const Gasto = require('./models/Gasto');

const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/erp_demo';

async function seed() {
  await mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true });

  // Limpiar colecciones (opcional)
  await Discoteca.deleteMany({});
  await Factura.deleteMany({});
  await Tarifa.deleteMany({});
  await Gasto.deleteMany({});

  // Crear discotecas
  const bataplan = await Discoteca.create({
    cif: 'B12345678',
    nombre: 'Bataplan',
    nombreCorto: 'Bataplan',
    direccion: { calle: 'C/ Falsa 10', ciudad: 'Donostia', provincia: 'Gipuzkoa', codigoPostal: '20001', pais: 'ES' },
    telefono: '+34 600 111 001',
    email: 'info@bataplan.local',
    encargado: 'Iñigo Arrieta',
    notas: 'Local céntrico'
  });

  const gu = await Discoteca.create({
    cif: 'B87654321',
    nombre: 'Gu',
    nombreCorto: 'Gu',
    direccion: { calle: 'Plaza Mayor 3', ciudad: 'Donostia', provincia: 'Gipuzkoa', codigoPostal: '20002', pais: 'ES' },
    telefono: '+34 600 222 002',
    email: 'contacto@gu.local',
    encargado: 'Ane Etxeberria'
  });

  const xokho = await Discoteca.create({
    cif: 'B11223344',
    nombre: 'Xokho',
    nombreCorto: 'Xokho',
    direccion: { calle: 'Av. Zurriola 5', ciudad: 'Donostia', provincia: 'Gipuzkoa', codigoPostal: '20003', pais: 'ES' },
    telefono: '+34 600 333 003',
    email: 'hola@xokho.local',
    encargado: 'Koldo Mendizabal'
  });

  // Facturas
  await Factura.create([
    { local_id: bataplan._id, numeroFactura: 'F-2025-10-001', mes: '2025-10', fechaVencimiento: new Date('2025-10-05'), importeNeto: 450, impuestoPercent: 21, importeImpuesto: 94.5, importeBruto: 544.5, estado: 'pagada', metodoPago: 'transferencia', fechaPago: new Date('2025-10-03') },
    { local_id: gu._id, numeroFactura: 'F-2025-10-002', mes: '2025-10', fechaVencimiento: new Date('2025-10-07'), importeNeto: 650, impuestoPercent: 21, importeImpuesto: 136.5, importeBruto: 786.5, estado: 'pendiente' },
    { local_id: xokho._id, numeroFactura: 'F-2025-10-003', mes: '2025-10', fechaVencimiento: new Date('2025-10-05'), importeNeto: 1200, impuestoPercent: 21, importeImpuesto: 252, importeBruto: 1452, estado: 'pagada', fechaPago: new Date('2025-10-06') }
  ]);

  // Tarifas
  await Tarifa.create([
    { local_id: bataplan._id, version: '2025-10-v1', vigenteDesde: new Date('2025-10-01'), activo: true, moneda: 'EUR', items: [
      { codigo: 'ENT-GEN', nombre: 'Entrada general', precio: 12, oferta: 0 },
      { codigo: 'COPA-GIN', nombre: 'Copa gin', precio: 6.5, oferta: 10 },
      { codigo: 'CERVEZA', nombre: 'Cerveza', precio: 3.5, oferta: 0 }
    ]},
    { local_id: gu._id, version: '2025-09-v1', vigenteDesde: new Date('2025-09-20'), activo: true, moneda: 'EUR', items: [
      { codigo: 'ENT-GEN', nombre: 'Entrada general', precio: 10, oferta: 0 },
      { codigo: 'COPA-VODKA', nombre: 'Vodka copa', precio: 7, oferta: 5 }
    ]},
    { local_id: xokho._id, version: '2025-07-v1', vigenteDesde: new Date('2025-07-01'), activo: true, moneda: 'EUR', items: [
      { codigo: 'ENT-GEN', nombre: 'Entrada general', precio: 15, oferta: 0 },
      { codigo: 'COPA-RON', nombre: 'Ron copa', precio: 8, oferta: 20 }
    ]}
  ]);

  // Gastos
  await Gasto.create([
    { ambito: 'empresa', titulo: 'Servidor / Hosting', proveedor: 'ACME Hosting SL', importe: 120, fecha: new Date('2025-10-02'), pagado: true },
    { ambito: 'local', local_id: bataplan._id, titulo: 'Compra bebidas (stock)', proveedor: 'Distribuidora Bebidas SA', importe: 480.5, fecha: new Date('2025-10-28'), pagado: false },
    { ambito: 'local', local_id: gu._id, titulo: 'Pago técnico sonido', proveedor: 'Sonido Pro SL', importe: 220, fecha: new Date('2025-10-26'), pagado: true }
  ]);

  console.log('Seed completo');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
