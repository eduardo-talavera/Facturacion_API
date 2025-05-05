
# API de Facturación


## Requerimientos minimos 📄
- Node >= 18.20.4
- mongoDB 1.43.4


## Instalacion y configuración 📦
- clonar o descargar repositorio
- abrir una terminal con la ruta en la raiz del proyecto
- ejecutar `npm install` para instalar todas las dependencias
- renombrar el archivo .env.example a .env y setear las variables

## Archivo .env

Example:

```env

  FACTURAMA_USER=<tu_usuario_facturama>
  FACTURAMA_PASSWORD=<tu_contraseña_facturama>
  PORT=4000

  DATABASE_URL=<tu_url_bd>
  JWT_SECRET=<tu_llave_secreta>
  FRONTEND_URL=<tu_frontend_url>
```

## Ejecución 🚀🚀 
- Desarrollo: ejecuta en una terminal `npm run dev`



## 1. Registrar usuario (temporal)
// solo una vez en mongo shell
`db.usuarios.insertOne({ email: 'admin@correo.com', password: '1234', rol: 'admin' })`


## 2. Obtener Token
`POST /api/auth/login`

`{
  "email": "admin@mail.com",
  "password": "1234"
}`

# 3. Usar token para llamadas protegidas
`Authorization: Bearer <token>`

# 4. Crear factura
`POST /api/facturas`

# 5. Consultar con filtros
`GET /api/facturas?desde=2025-01-01&hasta=2025-05-04&rfc=XAXX010101000`


# 6. Obtener PDF
`GET /api/facturas/:uuid/pdf`


