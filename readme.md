# README – API Reto 2

API construida con **Node.js**, **Express** y **MongoDB**, organizada en módulos dentro de la carpeta `pages/`.  
Proporciona endpoints para gestionar usuarios, ventas, planes y un sistema de estadísticas generales.

---

## Endpoints principales

A continuación se describen brevemente los endpoints disponibles.

---

# Estadísticas

Prefijo común:

```
/api/estadisticas
```

### **GET /kpis**
Devuelve indicadores principales:
- Ingresos totales (suma de facturas)
- Ticket medio
- Cubatas registrados en tarifas
- Lootboxes registrados en tarifas

---

### **GET /ingresos**
Devuelve los ingresos agrupados por mes.  
Útil para gráficas de facturación mensual.

---

### **GET /gastos**
Devuelve:
- Gastos por mes  
- Gastos agrupados por categoría (infraestructura, stock, servicios, etc.)

---

### **GET /comparativa**
Devuelve una comparativa semanal entre:
- Total de gastos por día
- Total de ingresos por día  
(Doming → Sábado)

---

# Usuarios

Prefijo:

```
/api/usuarios
```

### **GET /**
Lista todos los usuarios.

### **POST /**
Crea un nuevo usuario.

### **PUT /:id**
Modifica un usuario por ID.

### **DELETE /:id**
Elimina un usuario por ID.

---

# Ventas

Prefijo:

```
/api/ventas
```

### **GET /**  
Devuelve todas las ventas registradas.

### **POST /**  
Crea una nueva venta.

### **GET /:id**  
Devuelve una venta específica por ID.

### **DELETE /:id**  
Elimina una venta por ID.

---

# Planes

Prefijo:

```
/api/planes
```

### **GET /**  
Lista todos los planes.

### **POST /**  
Crea un nuevo plan.

### **PUT /:id**  
Actualiza un plan existente.

### **DELETE /:id**  
Elimina un plan por ID.

---

# ⚙️ Configuración del proyecto

### **Instalar dependencias**
```bash
npm install
```

### **Variables de entorno**
Crear un archivo `.env` en la raíz:

```
PORT=3000
MONGO_URI=mongodb+srv://usuario:password@cluster/basedatos
```

### **Modo desarrollo**
```bash
npm run dev
```

### **Modo producción**
```bash
npm start
```

---

#  Notas finales

- Todos los endpoints responden en formato JSON.
- Proyecto compatible con cualquier frontend (React, Vue, Angular…).
- Documentación ampliable a Swagger/OpenAPI si se necesita.
