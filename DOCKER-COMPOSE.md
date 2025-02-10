# Configuración y Solución de Problemas para PostgreSQL y pgAdmin con Docker Compose

Este documento detalla cómo verificar y solucionar problemas al configurar servicios de PostgreSQL y pgAdmin utilizando `docker-compose`.

---

## Verificación de Configuración del `docker-compose.yaml`

### Puertos Expuestos:
- Asegúrate de que el servicio `db` exponga correctamente el puerto `5432` en el host.
- Verifica que este puerto no esté bloqueado por un firewall local o de red.

### Red:
- Ambos servicios (`db` y `pgadmin`) están configurados en la misma red `net-app`. Esto permite la comunicación entre contenedores.
- Ten en cuenta que esto no afecta conexiones externas al contenedor.

### Variables de Entorno para el `pgadmin`:
- El cliente `pgadmin` no tiene dependencias directas de las variables de entorno del servicio `db`.
- Verifica que estás utilizando las credenciales correctas al configurar la conexión desde `pgadmin` a `db`.

---

## Pasos para Conectarte

### Desde pgAdmin (en el navegador del host)

1. **Accede a pgAdmin**:
   - Abre tu navegador y ve a: `http://localhost:5050`.
   - Utiliza las siguientes credenciales:
     - **Usuario**: `hadmarcano@gmail.com`
     - **Contraseña**: `123456`

2. **Configura la conexión al servidor PostgreSQL**:
   - En el menú lateral, selecciona "Add New Server".
   - Ingresa la siguiente información:
     - **General -> Name**: Nombre de tu preferencia, por ejemplo, `PostgresDB`.
     - **Connection -> Host name/address**: Usa `db` (nombre del servicio definido en `docker-compose.yaml`) o `localhost` si te conectas desde el navegador del host.
     - **Connection -> Port**: `5432`.
     - **Connection -> Maintenance Database**: `advancedb`.
     - **Connection -> Username**: `user`.
     - **Connection -> Password**: `password`.
   - Guarda y prueba la conexión.

### Desde pgAdmin Local (en tu máquina)

Si prefieres usar un cliente pgAdmin instalado en tu máquina y no el contenedor:

1. Configura el servidor en tu cliente pgAdmin local con los siguientes datos:
   - **Host**: `localhost`
   - **Port**: `5432`
   - **Database**: `advancedb`
   - **Username**: `user`
   - **Password**: `password`

2. Verifica que el puerto `5432` esté accesible desde tu máquina:
   ```bash
   telnet localhost 5432
   ```
   O utiliza `curl`:
   ```bash
   curl localhost:5432
   ```

3. **Firewall y Red**:
   - Asegúrate de que no haya reglas de firewall bloqueando la conexión al puerto `5432`.
   - Si trabajas en un entorno como WSL o Docker Desktop en Windows, verifica que los puertos estén mapeados correctamente entre los sistemas.

---

## Debugging Adicional

### Logs del Contenedor PostgreSQL
Verifica si hay errores en los logs del contenedor:
```bash
docker logs cont-postgres-db
```

### Salud del Contenedor
Verifica el estado de salud del servicio:
```bash
docker inspect --format='{{json .State.Health.Status}}' cont-postgres-db
```

### Ping desde pgAdmin al Contenedor de la Base de Datos
Si ambos contenedores están en la misma red, prueba si `pgadmin` puede resolver el nombre del servicio `db`:
```bash
docker exec -it cont-pgadmin ping db
```

---

## Ajustes Propuestos

Si el problema persiste, intenta lo siguiente:

1. **Revisar Variables de Entorno**:
   Asegúrate de que sean correctas en el `docker-compose.yaml`:
   ```yaml
   environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=advancedb
   ```

2. **Eliminar el Healthcheck de pgAdmin**:
   Puede no ser relevante en este caso. Modifica:
   ```yaml
   healthcheck:
      test: ["CMD-SHELL", "curl -f http://localhost:80 || exit 1"]
   ```

3. **Reinicia Todo**:
   ```bash
   docker-compose down
   docker-compose up -d --build
   ```

Con estas configuraciones, deberías poder conectarte sin problemas desde `pgadmin` o cualquier cliente externo.