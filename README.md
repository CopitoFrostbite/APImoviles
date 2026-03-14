# APImovil

Backend REST para una app móvil de journaling personal, pensado para mostrar en un portafolio profesional como proyecto de **Node.js + Express + MongoDB + Cloudinary**.

## ✨ Resumen del proyecto

Este proyecto implementa una API para:

- Gestión de usuarios (registro, login, edición de perfil y marcado lógico de eliminación).
- Gestión de entradas de diario (crear, listar por usuario, actualizar y soft delete).
- Gestión de imágenes asociadas a entradas (subida a Cloudinary, consulta y marcado/eliminación).

La API está organizada por capas (`routes`, `controllers`, `models`) y utiliza MongoDB con Mongoose para persistencia.

## 🧱 Stack técnico

- **Runtime:** Node.js
- **Framework:** Express
- **Base de datos:** MongoDB + Mongoose
- **Carga de archivos:** Multer
- **Almacenamiento de imágenes:** Cloudinary (`multer-storage-cloudinary`)
- **Configuración:** dotenv

## 📁 Estructura del repositorio

```txt
.
├── index.js
├── package.json
├── database/
│   └── mongoose.js
├── cloudinary/
│   ├── cloudinary.js
│   └── multer.js
├── controllers/
│   ├── UserController.js
│   ├── JournalController.js
│   └── ImageController.js
├── models/
│   ├── UserModel.js
│   ├── JournalModel.js
│   ├── ImageModel.js
│   └── ReminderModel.js
└── routes/
    ├── UserRoutes.js
    ├── JournalRoutes.js
    └── ImageRoutes.js
```

## ⚙️ Requisitos

- Node.js 18+
- MongoDB (local o Atlas)
- Cuenta de Cloudinary para subida de imágenes

## 🔐 Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con:

```env
PORT=4000
MONGO_URI=tu_cadena_de_conexion_mongodb
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

## 🚀 Instalación y ejecución

```bash
npm install
npm run dev
```

Para producción:

```bash
npm start
```

La API se levanta por defecto en `http://localhost:4000`.

## 🧭 Endpoints principales

> Prefijo base: `/api`

### Usuarios

- `POST /api/user/register` → registro con imagen de perfil (`multipart/form-data`, campo `avatar`)
- `POST /api/user/login` → login
- `POST /api/user/update-password` → actualización de contraseña
- `PUT /api/user/:userId/mark_deleted` → marcado lógico de usuario
- `PUT /api/user/:id` → actualización de datos de perfil
- `PUT /api/user/:id/profile_picture` → actualización de avatar

### Journals

- `GET /api/journals/:id` → listar journals por usuario
- `POST /api/journal/create` → crear entrada de journal
- `PUT /api/journal/:entryId` → eliminación de journal (según implementación actual)
- `PUT /api/journals/:journalId/delete` → soft delete de journal
- `PUT /api/journals/:journalId` → actualizar journal

### Imágenes

- `POST /api/entries/:entryId/images` → subir imagen asociada a entrada
- `GET /api/image/:journalId` → listar imágenes por journal
- `PUT /api/image/:imageId/delete` → marcado lógico de imagen
- `DELETE /api/image/:imageId` → eliminación de imagen

## 🗃️ Modelos de datos (alto nivel)

- **User**: username, name, lastname, email, password, avatar, isDeleted.
- **Journal**: journalId, userId, title, content, mood, date, isEdited, isDeleted, isDraft.
- **Image**: imageId, journalId, filePath, cloudUrl, dateAdded, isEdited, isDeleted, syncDate.
- **Reminder**: reminderId, userId, description, date, time.

## 🔄 Flujo general de uso

1. Registrar usuario con avatar.
2. Iniciar sesión para recuperar el perfil.
3. Crear entradas de journal.
4. Subir imágenes por entrada.
5. Listar/editar/marcar eliminación de entidades según necesidad.
- Documentación OpenAPI/Swagger.
- Tests unitarios e integración (Jest + Supertest).
- Versionado de API (`/api/v1`) y manejo centralizado de errores.
