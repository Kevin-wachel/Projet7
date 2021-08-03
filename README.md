# Projet7

## Objectifs de la mission :
Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues. Le département RH de Groupomania a laissé libre cours à son imagination pour les fonctionnalités du réseau et a imaginé plusieurs briques pour favoriser les échanges entre collègues.

## Technologies utilisées :
### Pour le Back:
NodeJS
Express
mySql

### Pour le Front :
Sass

Installation

Copier ce repository, puis :

Créer la base de donnée database_developpement en renseignent vos identifiants, vous pouvez utiliser vos propres identifiant mais il faudra changer le fichier .env.

## Fichier .env :
```bash
DB_NAME = database_development
DB_HOST = 127.0.0.1
DB_USER = root
DB_PASS = 
```
## Dans notre terminal

Ouvrez le terminal sur le dossier Backend : ```cd backend```

Ensuite utiliser la commande suivante: ```sequelize db:migrate```

Puis retourner dans le dossier backend, et écrivez la commande: ```nodemon server``` pour lancer le serveur sur le port 3000.
