Do It Natural API

src
│   app.js          # App entry point
└───config          # Environment variables and configuration related stuff
└───domain          # All the business logic
└───loaders         # Split the startup process into modules for search in db
└───middlewares     # Fonctions pour utiliser l'app tel que l'auth
└───models          # Database models with functions
└───routes          # All the endpoints
└───services        # Specific things we need from the db that could be usefull
└───utils           # Specific fonctions we need to use