
Para un uso correcto de la aplicación, debe iniciar docker desktop y ejecutar el siguiente comando en la carpeta que contiene el fichero "docker-compose.yaml"
- docker-compose up

Si al iniciar el proyecto proporciona un error relacionado con que no existe Prisma.User(), deberá ejecutar manualmente el siguiente comando dentro 
del contenedor "backend":
- npx prisma migrate dev --name init

Los datos para iniciar sesión son los siguientes:
- usuario: test@fathom3.com
- password: 123456

Para mayor información: josemmv1999@gmail.com
