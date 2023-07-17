
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
   flask db upgrade
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

## API Endpoints
### Authorization and User
request|purpose|value
---|---|---
GET /api/auth/|When the app first loads, it checks to see if there is a a logged in user. It returns an object of the current user. |{ <br>'id': INT, <br>'username':STRING, <br>'email': STRING <br>}
POST /api/auth/signup| With valid inputs, a user can sign up for an account, and it logs in the user. It returns the object of the newly-created in user.  |{ <br>'id': INT, <br>'username':STRING, <br>'email': STRING <br>}
POST /api/auth/login| With valid credentials, a user can login. It returns an object of the logged in user.  |{ <br>'id': INT, <br>'username':STRING, <br>'email': STRING <br>}
GET /api/auth/logout| A user can logout and leave no trace of their data. It returns a confirmation message.  |{ <br>'message': 'User logged out'<br>}
### Notes
| Request | Purpose | Return Value|
|---------|---------|-------------|
|GET/api/notes| This fetch queries for all notes and returns them in a list of note dictionaries | [{<br/>"id": INTEGER,<br/>"body": STRING,<br/>"title": STRING, <br/> "notebookId": INTEGER, <br/> "ownerId": INTEGER, <br/> "trash": BOOLEAN, <br/>  "created_at": DATETIME, <br/> "updated_at": DATETIME<br/>}]|
|POST/api/notes| This fetch creates a new note and returns it as a dictionary| {<br/>"id": INTEGER,<br/>"body": STRING,<br/>"title": STRING, <br/> "notebookId": INTEGER, <br/> "ownerId": INTEGER, <br/> "trash": BOOLEAN, <br/>  "created_at": DATETIME, <br/> "updated_at": DATETIME<br/>}|
|GET/api/notes/:id| This fetch queries for a note by id and returns that note as a dictionary| {<br/>"id": INTEGER,<br/>"body": STRING,<br/>"title": STRING, <br/> "notebookId": INTEGER, <br/> "ownerId": INTEGER, <br/> "trash": BOOLEAN, <br/>  "created_at": DATETIME, <br/> "updated_at": DATETIME<br/>}|
|PUT/api/notes/:id| This fetch queries for a note by id and returns an updated note as a dictionary| {<br/>"id": INTEGER,<br/>"body": STRING,<br/>"title": STRING, <br/> "notebookId": INTEGER, <br/> "ownerId": INTEGER, <br/> "trash": BOOLEAN, <br/>  "created_at": DATETIME, <br/> "updated_at": DATETIME<br/>}|
|DELETE/api/notes/:id| This fetch queries for a note by id and deletes the note| {"message": "Successfully deleted"}|
### Tasks
| Request | Purpose | Return Value|
|---------|---------|-------------|
GET /api/tasks/| A logged in user can view their tasks as a list. It returns an an array of tasks. |{ <br>'id': INT, <br>'ownerId':INT, <br>'title': STRING, <br> 'description': STRING, <br> 'completed': BOOLEAN, <br> 'due_date': STRING, <br> 'created_at': STRING, <br> 'created_at': STRING <br>}
GET /api/tasks/| A logged in user can view their tasks as a list. It returns an an array of tasks. |{ <br>'id': INT, <br>'ownerId':INT, <br>'title': STRING, <br> 'description': STRING, <br> 'completed': BOOLEAN, <br> 'due_date': STRING, <br> 'created_at': STRING, <br> 'created_at': STRING <br>}
GET /api/tasks/taskId| A logged in user can view the details of a single task. It returns the specific information of the task. |{ <br>'id': INT, <br>'ownerId':INT, <br>'title': STRING, <br> 'description': STRING, <br> 'completed': BOOLEAN, <br> 'due_date': STRING, <br> 'created_at': STRING, <br> 'created_at': STRING <br>}
POST /api/tasks/new| A logged in user can add a new task to their tasks list. It returns the new task information. |{ <br>'id': INT, <br>'ownerId':INT, <br>'title': STRING, <br> 'description': STRING, <br> 'completed': BOOLEAN, <br> 'due_date': STRING, <br> 'created_at': STRING, <br> 'created_at': STRING <br>}
PUT /api/tasks/taskId| A logged in user can edit a specific task. It returns the edited task with the new information. |{ <br>'id': INT, <br>'ownerId':INT, <br>'title': STRING, <br> 'description': STRING, <br> 'completed': BOOLEAN, <br> 'due_date': STRING, <br> 'created_at': STRING, <br> 'created_at': STRING <br>}
DELETE /api/tasks/taskId/delete| A logged in user can delete a specific task. It returns a confirmation that the task was deleted successfully. |{<br> 'message': "successful deletion" <br>}
### Notebooks
request|purpose|value
---|---|---
GET /api/notebooks/| Gets all Notebooks,Formats into a nested object. |{ <br>'Notebooks':[ <br> { <br>'id': INT, <br>'title':STRING,<br>'is_default': STRING  <br> 'ownerId': STRING  <br>} <br>] <br>}
GET /api/notebooks/:notebookId| Gets a single notebooks by its Id ,Formats into a nested object. |{ <br>'id': INT, <br>'title':STRING,<br>'is_default': STRING  <br> 'ownerId': STRING  <br>}
POST /api/notebooks/new/| Creates a new notebook,Returns a formatted object.  |{ <br>'id': INT,<br>'title':STRING,<br>'is_default': STRING  <br>'ownerId': STRING  <br>'created_at': 'Thu, 01 Jan 2023 00:00:00 GMT', <br>'updated_at': 'Thu, 01 Jan 2023 00:00:00 GMT' <br>}
PUT /api/notebooks/:notebookId/edit/| Updates the associated notebook by its Id,returns a formatted object.  |{<br>'id': INT,<br>'title':STRING,<br>'is_default': STRING  <br>'ownerId': STRING  <br>'created_at': 'Thu, 01 Jan 2023 00:00:00 GMT', <br>'updated_at': 'Thu, 01 Jan 2023 00:00:00 GMT' <br>}
DELETE /api/notebooks/:notebook/delete| Deletes a notebook by its associated notebook,Returns a message.  |{ <br>'message': 'Notebook successfully deleted'<br>}

### Tags
| Request | Purpose | Return Value|
|---------|---------|-------------|
GET /api/tags/|Gets all Tags, formats into nested object|	{'tags': [<br>			{<br>            'id': 1<br>            'name': Joseph,<br>            'num_notes': 5,<br>            'created_at': 'Thu, 01 Jan 2023 00:00:00 GMT',<br>            'updated_at': 'Thu, 01 Jan 2023 00:00:00 GMT'<br>			}<br>			]<br>	}<br>
POST /api/tags/|Creates new tag, returns formatted object|    {<br>		'id': 1<br>		'name': Joseph,<br>		'num_notes':<br> 5,<br>		'created_at': 'Thu, 01 Jan 2023 00:00:00 GMT',<br>		'updated_at': 'Thu, 01 Jan 2023 00:00:00 GMT'<br>	}<br>
POST /api/tags/:tagId|Updates Tag of :tagId, returns updated tag in Object form|{<br>		'id': 1<br>		'name': Joseph,<br>		'num_notes': 5,<br>		'created_at': 'Thu, 01 Jan 2023 00:00:00 GMT',<br>		'updated_at': 'Thu, 01 Jan 2023 00:00:00 GMT'<br>	}<br><br>{"Error": "end of update route" }
DELETE /api/tags/:tagId|Deletes Tag of :tagId|{"message": f'Tag {tagId} successfully deleted'}
GET /api/tags/notetags/|Fetches and formats nested objects of all ids of tags associated with each object (note_to_tags), and all notes associated with each tag (tag_to_notes)|{"note_to_tags": { 1: [2]},<br>"tag_to_notes": { 2: [1]}}
POST /api/tags/notetags/<int:noteId>/<int:tagId>|Sends SQL query to add tag to note, returns message in object|{ "message": f"Tag {tagId} successfully added to Note {noteId}"}<br>{ "error": f"Unable to add tag {tagId} to Note {noteId}; note {noteId} not found" }<br>{ "error": f"Unable to add tag {tagId} to Note {noteId}; tag {tagId} not found" }<br>{ "message" :f"Tag {tagId} is already in Note {noteId}??"}<br>{ "error": f"Unable to add tag {tagId} to Note {noteId}"}
DELETE /api/tags/notetags/<int:noteId>/<int:tagId>|Removes tag from note, returns message in object|{ "message": f"Tag {tagId} successfully removed from Note {noteId}"}<br>{ "error": f"Either unable to locate tag {tagId}, or notetag with note {noteId}"}
