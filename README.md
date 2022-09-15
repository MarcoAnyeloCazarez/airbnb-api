# Ruta del proyecto desplegado en render
https://anyelo-clonairbnb.onrender.com

# Rutas  
Desarrollmos toda la lógica que se va a programar para ter


- /api/v1/users
- /api/v1/users/:id
- /api/v1/users/me

- /api/v1/auth/login
- /api/v1/auth/register
- /api/v1/auth/password-recovery
- /api/v1/auth/verify-account

- /api/v1/users
- - GET (ADMIN)

- /api/v1/users/:id
- - GET 
- - PUT (ADMIN) 
- - DELETE (ADMIN)


- /api/v1/users/me
- - GET
- - PUT
- - DELETE
- - PATCH


- /api/v1/auth/login     //para el login si necesito hacer una peticion y leer info d usuari
- - POST

- /api/v1/auth/register
- - POST

- /api/v1/auth/password-recovery
- - POST
- - PATCH

Bibliografía para relaciones de tablas con sequelize: https://sequelize.org/docs/v6/core-concepts/assocs/

# Paths de mi usuario a traves de mi aplicación
  -[✓]  1.- Registrar mi usuario    
  -[✓]  2.- loggear mi usuario

## Gests (invitados o usuarios sin sesion iniciada)
    1.- Puede ver los lugares
    2.- Puede ver la información de un lugar

### Gests (con sesion iniciada)
    1.- Puede ver los lugares
    2.- Puede ver la información de un lugar 
    3.- Reservar un lugar
    4.- Dar un score una vez finalice la reservación
    5.- Cancelar resevaciones

#### Host (persona que renta lugar)
    1.- Puede ver los lugares
    2.- Puede ver la información de un lugar 
    3.- Reservar un lugar
    4.- Dar un score una vez finalice la reservación
    5.- Crear lugares
    6.- Cancelar reservaciones e los lugares donde es host
    7.- Puede ver perfiles de usuario
    8.- Puede ver los lugares que le pertenecen
    9.- Puede editar sus lugares
    10.- Puede eliminar sus lugares

##### Admin 
    1.- Puede ver los lugares
    2.- Puede ver la información de un lugar 
    3.- Reservar un lugar
    4.- Dar un score una vez finalice la reservación
    5.- Puede ver perfiles de usuario
    6.- Puede eliminar lugares
    7.- editar el lugar
    8.- Modificar roles
    9.- Eliminar un usuario
    10.- Modificar un usuario
    11.- Ver lugares de los hosts




##### RUTAS

ruta raiz
/api/v1/accommodations

/
    - GET
    - POST

/:id
    - GET
    - PUT
    - PATCH
    - DELETE

/:id/available/?arrival=value&departure=value         // para reviar fechas de reservaciones o en su caso disponibilidad
    - GET