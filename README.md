
# Welcome to EveryNote

EveryNote, an Evernote clone, is a website for users to jot down notes and tasks and organize them according to tags and notebooks. 
Feel free to visit the live site [here](https://everynote-yrm6.onrender.com/)

## Index
* [MVP Feature List](https://github.com/taystacksattack/EveryNote/wiki/MVP-Feature-List)
* [Database Schema](https://github.com/taystacksattack/EveryNote/wiki/Database-Schema)
* [User Stories](https://github.com/taystacksattack/EveryNote/wiki/User-Stories)
* [React Components](https://github.com/taystacksattack/EveryNote/wiki/React-Components-List)
* [Routes](https://github.com/taystacksattack/EveryNote/wiki/Routes)
* [React Store](https://github.com/taystacksattack/EveryNote/wiki/React-Store)
* [Original Flask Starter Documentation](https://github.com/taystacksattack/EveryNote/wiki/Original-Flask-Starter-Documentation)

---------------------

## Techologies Used
<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" /><img
src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=white" /><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" /><img src="https://img.shields.io/badge/Sqlalchemy-000000?style=for-the-badge&logo=Sqlalchemy&logoColor=white" /><img 
src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" /><img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" /><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /><img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" /><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" /><img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=Render&logoColor=white" />

## Splash Page
![splash](https://github.com/taystacksattack/EveryNote/blob/main/SplashPage.png)

## Notes
![notes](https://github.com/taystacksattack/EveryNote/blob/main/Notes.png)

## Notebooks
![notebooks](https://github.com/taystacksattack/EveryNote/blob/main/Notebooks.png)

## Tasks
![tasks](https://github.com/taystacksattack/EveryNote/blob/main/Tasks.png)

## Tags
![tags](https://github.com/taystacksattack/EveryNote/blob/main/Tags.png)

## Getting Started

1. Start out by cloning the repository
2. Install the dependencies
    * `pipenv install -r requirements.txt`
3. Create .env file, for example:
     ```
     SECRET_KEY= super_secret_key_name
     DATABASE_URL=sqlite:///dev.db
     SCHEMA= schema_name_here
     ```
4. Make sure the SQLite3 database connection URL is in the **.env** file
5. In a terminal in the app directory,  set up into your pipenv, migrate your database, seed your database, and run your Flask app:

   ```bash
   pipenv shell
   flask db upgrad
   flask seed all
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.
     * Essentially, in a terminal in the react-app folder:
         ```
           npm install
           npm start
         ```
7. Now you can either set up an account or use the demo user option to explore EveryNote

## MVP Features List
### 1. New account creation, log in, log out, and guest/demo login

* Users can sign up, log in, and log out.
* Users can use a demo log in to try the site.
* Users can't use certain features without logging in (like notes and sharing).
* Logged in users are directed to their profile page which displays a navigation bar, their notes, tasks, and a scratch pad.
* Logged out users are directed to the login page.

### 2. Notebooks

* Logged in users can select their notebooks, which provides them with a brief list of the notes contained therein.
* Logged in users can also write, edit, or delete notebooks.

### 3. Notes

* Logged in users can select and read their notes.
* Logged in users can also write, edit, or delete notes.
* Users can share notebooks with other users and determine if they have write capabilities.

### 4. Tasks

* Logged in users can select and view tasks they have created.
* Logged in users can also write, edit, or delete tasks.

### 5. Tags

* Logged in users can view tags to notes.
* Logged in users can assign tags and delete them from notes.
