## Back-end

Le back-end a été développé avec express JS, sequelize(ORM) et mySQL(base de donnée).

Cloner ce projet avec la commande suivante :

    git clone https://github.com/dimitrilory44/DimitriLory_7_26082021.git
    cd backend

Installer les dépendances avec npm install.

Pour faire persister les données, créer un dossier `config` et un fichier `config.json` avec les informations suivantes :

    {
        "development": {
            "username": "root",
            "password": "votre_mp_root",
            "database": "votre_database_development",
            "host": "127.0.0.1",
            "dialect": "mysql"
        },
        "test": {
            "username": "root",
            "password": "votre_mp_root",
            "database": "votre_database_test",
            "host": "127.0.0.1",
            "dialect": "mysql"
        },
        "production": {
            "username": "root",
            "password": "votre_mp_root",
            "database": "votre_database_production",
            "host": "127.0.0.1",
            "dialect": "mysql"
        }
    }

N'oubliez pas de créer votre database directement sur mySQL.

Démarrer enfin le serveur avec npm run serve.