from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Note
from ..models.db import db
from ..forms.note_form import NoteForm
from datetime import datetime
from .auth_routes import validation_errors_to_error_messages

note_routes = Blueprint('notes', __name__)

@note_routes.route('/')
@login_required
def notes():
    """
    Query for all notes and returns them in a list of notes dictionaries
    """

    notes = Note.query.filter(Note.ownerId == current_user.id).all()

    return {'notes': [note.to_dict() for note in notes]}


@note_routes.route('/', methods=[ 'POST'])
@login_required
def post_note():
    """
    Creates a new note and returns it as a dictionary
    """
    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        new_note = Note(
            title=data['title'],
            body=data['body'],
            trash=data['trash'],
            ownerId=data['ownerId'],
            notebookId=data['notebookId']
            )

        db.session.add(new_note)
        db.session.commit()



        return new_note.to_dict()

    return validation_errors_to_error_messages(form.errors), 400


@note_routes.route('/<int:id>')
@login_required
def get_note(id):
    """
    Query for a note by id and returns that note in a dictionary
    """
    note = Note.query.get(id)

    return note.to_dict()


@note_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_note(id):
    """
    Query for a note by id and returns an updated note in a dictionary
    """
    note = Note.query.get(id)
    # print('this is note \n\n\n\n\n', note)
    form = NoteForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        if form.data['title']:
            note.title=form.data['title']
        if form.data['body']:

            # print('\n\n\n\n\n\n form data ', form.data)
            note.body=form.data['body']

        #also with notebookId 07-18
        if form.data['notebookId']:
            print("\n\n\n\nNOTEBOOK ID", form.data['notebookId'])
            note.notebookId=form.data['notebookId']


        # note.updated_at=datetime.utcnow

        # print('\n\n\n\n\n this is datetime', datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"))

        note.updated_at = datetime.utcnow()
        db.session.commit()
        return note.to_dict()

    return {"message":  "Bad Data"}


@note_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_note(id):
    """
    Query for a note by id and deletes note
    """
    note = Note.query.get(id)

    # print('this is note \n\n\n\n\n', note)

    db.session.delete(note)
    db.session.commit()
    return {"message":  "Successfully deleted"}
