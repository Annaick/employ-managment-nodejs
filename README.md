
# Projet Nodejs
Projet Nodejs pour la gestion d'employées utilisant NextJS et Postgres


# Installer

## 1- Cloner
Cloner le projet
  - Pour https:
```bash
  git clone https://link-to-project
```
  - Pour ssh:
  ```bash
  git clone git@github.com:Annaick/employ-managment-nodejs.git
```

## 2- Postgres
Lancez un serveur postgres en local selon votre choix

Autre methode recommandée (optionel):
- Installer Docker 
- Dans la racine du projet, ouvrir un terminal et lancer la commande:

```bash
  docker compose up
```
    cette commande va creer le serveur postgres automatiquement en local 

## 2- Mettre en place les environnements

Dans le projet, dupliquer le fichier '.env.exemple' et le renommer '.env'

ensuite mettre les valeurs selon votre configuration dans le fichier
  - POSTGRES_DB: nom de la base de données
  - POSTGRES_USER= nom de l'utilisateur
  - POSTGRES_PASSWORD= mot de passe
  - POSTGRES_HOST=localhost
  - POSTGRES_PORT=5432


## 3 - Installer les dépendances
```bash
  npm install
```

## 4 - Lancer la migration et le seed

```bash
  npm run migrate
```

```bash
  npm run seed
```


## 5 - Lancer l'application

```bash
  npm run dev
```

## 5 - Vérifier que tout marche
Ouvrir un navigateur et aller dans 
```bash
  http://localhost:3000/api/test
```
Resultat:
![Screenshot From 2025-03-29 07-36-19](https://github.com/user-attachments/assets/607d1bbb-9e94-4950-a8ab-6b95c7cedcae)


# Methodologie de travail

!!!! Ne pas travailler directement sur la branche main


 1- Créer une branche pour son travail
 2 - Travailler sur sa branche
 3 - Creer un pull request et demander un review à une personne au moins
 4 - Après validation, merger
 
