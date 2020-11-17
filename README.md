# ChatApp REST API

Este REST API trabaja en conjunto con el Socket.IO API. Este API maneja
los usuarios y mensajes de ChatApp.

## Prerequisitos
- node < v12.14.0
- PostgreSQL < 12.4

## Para comenzar
1. Corra el archivo ``./initProject/init.sh``. Sino sabe donde están los
parámetros de ``init.sh`` ejecute el siguiente comando:

```bash
psql --username=postgres --dbname=postgres
```

Este comando inicia la base de datos como usuario _postgres_ y base de datos
_postgres_. Estos son los nombres predeterminados que le asigna PostgreSQL a la
base de datos. Si el comando dado arroja un error, solo ingrese el comando
``psql`` sin ninguna opción.

Si ha podido iniciar sesión siga leyendo, sino intente nuevamente y asegúrese
de tener postgres instalado. Use uno de estos comandos para usar la terminal
de postgres, si quiere saber que otros comandos hay, ejecute ``\?``.
``\du``: Usuarios actuales de la base de datos.
``\l``: Base de datos actuales.
``\d``: Tablas de la base de datos actual.
``\c <nombreDeLaBaseDeDatos>``: Cambiar base de datos a <nombreDeLaBaseDeDatos>.

**NOTA**: Si quiere borrar las tablas creadas puede usar ``./initProject/terminate.sh``.

2. Si la base de datos está inicializada corra ``npm run start`` y luego en
otra terminal corra ``npm run test``. Asegúrese de que las pruebas pasen
correctamente. Este API supone que el usuario y la base de datos son llamados
_postgres_, sino es así cambie la URL en ``./src/modules/config/databse.js``.
