# Stocks Recommendation App

## Introducción
Esta aplicación web recomienda acciones para invertir según tu **perfil de riesgo** (alto, medio o bajo). El usuario elige su nivel de riesgo y el sistema obtiene datos de metas de brokers y precios actuales, calcula un puntaje de recomendación y muestra las mejores opciones en tiempo real con _infinite scroll_.

## Características
- **Selección de perfil de riesgo**: Alto, Medio, Bajo.  
- **Cálculo de recomendación**: Basado en precio objetivo, precio actual, antigüedad del informe y cambio de rating.  
- **Infinite Scroll**: Carga más acciones al llegar al final.  
- **Filtros**: Buscar por ticker o empresa.  

## Tecnología
- **Frontend**: Vue 3 + TypeScript, Pinia, Vite, Tailwind CSS  

---

##


###  Preparar variables
```bash
cp .env.example .env
```

### Variables de Entorno (frontend)
En `.env` reemplaza las variables con los datos del api(backend):
```env
VITE_API_URL=http://localhost:8080/api/v1
VITE_LOGIN_EMAIL=
VITE_LOGIN_PASSWORD=
```


---

## Instalación y Ejecución


### Frontend

1. Instalar dependencias:
   ```bash
   npm install
   # o: yarn
   ```
2. Levantar el servidor de desarrollo:
   ```bash
   npm run dev
   # o: yarn dev
   ```
3. Abrir en el navegador: `http://localhost:5173` (o el puerto que indique Vite).

---

## Uso
1. Al cargar la app, selecciona tu nivel de riesgo  
2. El sistema mostrará las mejores acciones según un puntaje que combina:
   - **Upside %** (potencial de subida)  
   - **Rating delta** (cambio de recomendación)  
   - **Recency weight** (peso por antigüedad)  
3. Navega con _infinite scroll_ para cargar más  
4. Abre el panel de filtros para buscar por ticker o empresa
