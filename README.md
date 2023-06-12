
# Welcome to EveryNote's Wiki

## Link

# https://everynote-yrm6.onrender.com/

## Feature List

EveryNote, an Evernote clone, is a website for users to jot down notes and tasks and organize them according to tags and notebooks.

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

---

## DataBase Schema
![image](https://github.com/taystacksattack/EveryNote/assets/118297234/ecf7b572-acc4-488d-bfdf-da982dc5786c)

---

## React Components

### Navigation

* Navigation
* ProfileButton
* LandingPage

### Users

* LoginFormPage
* LoginFormModal
* SignupFormPage
* SignupFormModal

### Notebooks

* NotebookPage
* NewNotebook
* NotebookDetailPage

### Notes

* NotesPage
* DeleteNoteModal

### Tasks

* TasksPage
* SingleTask
* CreateTask
* EditTask
* DeleteTaskModal

### Tags

* Add SelectNoteToTag
* AddTagToNoteForm
* TagsPage
* TagCreateRenameModal
* TagDeleteModal

---

## Frontend Routes

* Login, path '/login'
* Signup, path '/signup'
* Notes, path '/notes'
* Notebooks, path '/notebooks'
* Notboook Details, path 'notebooks/:notebookId'
* Create Notebook, path '/notebooks/new'
* Tasks, path '/tasks'
* Create Task, path '/tasks/new'


## Backend Routes

### Users

* Login, POST, '/login'
* Logout DELETE, '/logout'
* Signup POST, '/signup'

### Notebooks

* Notebooks List, GET, '/notebooks'
* NotebookDetailPage, GET, '/notebook/notebookId'
* New Notebook, POST, '/notebooks/new'
* Edit Notebook, PUT, '/notebooks/notebookId/edit'
* Delete Notebook, DELETE, '/notebooks/notebookId/delete'

### Notes

* Notes, GET, '/notes'
* Note by Note Id, GET, '/notes/noteId'
* New Note, POST, '/notes'
* Edit Note by Note Id, PUT, '/notes/noteId'
* Delete Note by Note Id, DELETE, '/notes/noteId'

### Tasks

* Tasks, GET, '/tasks'
* Task by Task Id, GET, '/tasks/taskId'
* New Task, POST, '/tasks/new'
* Edit Task by Id, PUT, '/tasks/taskId/edit'
* Delete Task by Id, DELETE, '/tasks/taskId/delete'

### Tags

* Tags, GET, '/tags'
* Task by Task Id, GET, '/tags/taskId'
* New Tag, POST, '/tags'
* Edit Tag by Id, POST, '/tags/taskId'
* Delete Tag by Id, DELETE, '/tags/tagId'

## Note Tags (Join Table Query)

* Note Tags, GET, '/notetags'
* Add Tag to Note, POST, '/notetags/noteId/tagId'
* Edit Task by Id, PUT, '/tasks/taskId/edit'
* Delete Note Tag, DELETE, '/notetags/noteId/tagId'
* Remove Tag from all Notes, DELETE, '/notetags/all/tagId'


## React Store

State = {
      notebooks: {allNoteBooks},
      notes: {allNotes},
      notetags: { 
            {note_to_tags},
            {tags_to_notes},
      },
      tasks: {allTasks},
      session: {user}
}

---

## User Stories

### Sign Up
As an unregistered and unauthorized user, I want to be able to sign up as a user through a sign-up form.

On the /signup page:
* I would like to see a form where I can enter in my email, username and password of choice.
* I would like to be able to successfully log in upon providing valid info and completion of the form.

When I enter invalid data on the sign-up form:
* I would like to be informed of the failed validations.
* I would like the entries that were valid to stay populated on the form, such that I only have to to fill in the entries that weren’t valid and re-enter my password to resubmit

### Log In
As a registered user, I want to be able to log in to the website via a log-in form.

On the /login page:
* I would like to be able to enter my email and password on a log-in form.
* I would like to be logged in upon successful and valid completion of the form.

When I enter invalid data on the log-in form:
* I would like to be informed of the failed validations.
* I would like the entries that were valid to stay populated on the form, such that I only have to to fill in the entries that weren’t valid and re-enter my password to resubmit

### Demo User
As an unregistered and unauthorized user, I would like to see a button on both the /signup and /login forms to allow me to explore the site as a guest without needing to sign in or sign up.

When on the /signup or /login page:
* I can click on a Demo User button to log me in and allow me access to the site like a normal user.
* I can test the site’s features and functionality without needing to enter credentials.

Log out
As a logged in user, I want to find a log out button on the navigation bar

While on any page of the site:
* I can log out of my account and be redirected to the website’s home page

### Create Notes
As a logged in user, I want a button to create a new note.

When I click on the button to create a note:
* I would like to be directed to the /notes page where I have a giant text area with a rich text editor where I can write, title, and style my notes.
* I would also like a save button to save my notes (if not implementing autosave yet)

View Notes
As a logged in user, I want to be able to view all my notes.

When I click “Notes” in the Navigation Bar or when I click the “create a note” button:
* I would like to see a list of all my notes by their titles and when they were last created/edited
* On the Notes heading, I would like to see a total count of my notes (additionally can have buttons to sort/filter the notes)
* Clicking on an individual note title, I should be able to see the individual note contents

Update Notes
As a logged in user, I want to be able to edit my notes

When I go to my /notes page and click on an individual note:
* Upon clicking the note in the text area, I should be able to edit the content, or title or restyle my notes.
* I would also like a save button to save my updated note (if autosave is not yet implemented)

### Delete Notes
As a logged in user, I want to be able to delete any of my notes

When I go to my /notes page:
* Upon selecting a note, there should be a dropdown menu (or button) to send the note to the trash for deletion.

### Share Notes
As a logged in user, I want to be able to share my notes to other users or to other people’s email

When I go to my /notes page:
* I should see a “Share” button. Upon clicking the button I can invite someone via their username or email and select their read/edit privileges

### Create Tasks
As a logged in user, I want to find a link in the navigation bar to create a new task.

When I click to create a task:
* I should get a popup allowing me to enter my new task
* I should have a button “create task” that saves the task I created

### View Tasks
As a logged in user, I want to see all my tasks that I’ve created

When I navigate to /tasks:
I want to see a list of all my tasks as checkboxes
If the tasks have been completed they would appear crossed off

### Update Tasks
As a logged in user, I want to be able to update my tasks.

When I navigate to /tasks:
* I want to be able to click on a task and either revise the name of the task or mark it as completed

### Delete Tasks
As a logged in user, I want to be able to delete my tasks

When I navigate to /tasks and select a single task:
* I want a button to delete the task and remove it from my list of tasks

### Create Notebooks
As a logged in user, in the navigation bar, I want to a button to create a new notebook

When I click on the create new notebook button:
* I want to see a form where I can fill out the name of my notebook

### View Notebooks
As a logged in user, I want to be able to see all my notebooks

When I go to /notebooks:
* I want to see a list of the names of the notebooks with a count of the number of notes inside the notebook
* I also want to see the who created each notebook, when it was last updated, who it was shared with, and an actions menu where I can add a new note, share the notebook, rename the notebook or delete the notebook

### Update Notebooks
As a logged in user, I want to be able to update the name of my notebook

When I go to /notebooks, under the actions menu:
* I can click on rename notebook a form pops up where I can edit the name and save the new name


### Delete Notebook
As a logged in user, I want to be able to delete my notebook

When I go to /notebooks, under the actions menu:
* I can click on delete notebook and I will get a prompt to confirm whether I want to delete the notebook

### Create Tags
As a logged in user, I want a button to create a tag for my notes

When I click on the button to create a tag:
* I should have a form pop up to give the tag a name and have a button to actually create it.

In the /notes page:
* I also have the option to create new tag or attach a created tag to the note

### View Tags
As a logged in user, I want to be able to view all my created tags

When I click “Tags” in the Navigation Bar:
* I should see a list of the names of the tags and the number of notes that were tagged with that particular tag


### Delete Tags
As a logged in user, I want to be able to delete the tags I created

When I click on an individual tag:
* There is an option to delete the tag
* Deleting the tag, removes the tag from all notes that had that tag



---------------------

# Flask React Project - this is from the original starter documentation (for reference)

This is the starter for the Flask React project.

## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


## Deployment through Render.com

First, refer to your Render.com deployment articles for more detailed
instructions about getting started with [Render.com], creating a production
database, and deployment debugging tips.

From the [Dashboard], click on the "New +" button in the navigation bar, and
click on "Web Service" to create the application that will be deployed.

Look for the name of the application you want to deploy, and click the "Connect"
button to the right of the name.

Now, fill out the form to configure the build and start commands, as well as add
the environment variables to properly deploy the application.

### Part A: Configure the Start and Build Commands

Start by giving your application a name.

Leave the root directory field blank. By default, Render will run commands from
the root directory.

Make sure the Environment field is set set to "Python 3", the Region is set to
the location closest to you, and the Branch is set to "main".

Next, add your Build command. This is a script that should include everything
that needs to happen _before_ starting the server.

For your Flask project, enter the following command into the Build field, all in
one line:

```shell
# build command - enter all in one line
npm install --prefix react-app &&
npm run build --prefix react-app &&
pip install -r requirements.txt &&
pip install psycopg2 &&
flask db upgrade &&
flask seed all
```

This script will install dependencies for the frontend, and run the build
command in the __package.json__ file for the frontend, which builds the React
application. Then, it will install the dependencies needed for the Python
backend, and run the migration and seed files.

Now, add your start command in the Start field:

```shell
# start script
gunicorn app:app
```

_If you are using websockets, use the following start command instead for increased performance:_

`gunicorn --worker-class eventlet -w 1 app:app`

### Part B: Add the Environment Variables

Click on the "Advanced" button at the bottom of the form to configure the
environment variables your application needs to access to run properly. In the
development environment, you have been securing these variables in the __.env__
file, which has been removed from source control. In this step, you will need to
input the keys and values for the environment variables you need for production
into the Render GUI.

Click on "Add Environment Variable" to start adding all of the variables you
need for the production environment.

Add the following keys and values in the Render GUI form:

- SECRET_KEY (click "Generate" to generate a secure secret for production)
- FLASK_ENV production
- FLASK_APP app
- SCHEMA (your unique schema name, in snake_case)
- REACT_APP_BASE_URL (use render.com url, located at top of page, similar to
  https://this-application-name.onrender.com)

In a new tab, navigate to your dashboard and click on your Postgres database
instance.

Add the following keys and values:

- DATABASE_URL (copy value from Internal Database URL field)

_Note: Add any other keys and values that may be present in your local __.env__
file. As you work to further develop your project, you may need to add more
environment variables to your local __.env__ file. Make sure you add these
environment variables to the Render GUI as well for the next deployment._

Next, choose "Yes" for the Auto-Deploy field. This will re-deploy your
application every time you push to main.

Now, you are finally ready to deploy! Click "Create Web Service" to deploy your
project. The deployment process will likely take about 10-15 minutes if
everything works as expected. You can monitor the logs to see your build and
start commands being executed, and see any errors in the build process.

When deployment is complete, open your deployed site and check to see if you
successfully deployed your Flask application to Render! You can find the URL for
your site just below the name of the Web Service at the top of the page.

[Render.com]: https://render.com/
[Dashboard]: https://dashboard.render.com/
