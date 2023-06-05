from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Note
from ..models.db import db
from ..forms.note_form import NoteForm


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
    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    print('\n\n\n\n\n\n\n\n form-data ========>',form.data)
    if form.validate_on_submit():
        data = form.data
        new_note = Note(
            title=data['title'], 
            body=data['body'],
            trash=data['trash'],
            ownerId=data['ownerId'],
            notebookId=data['notebookId']
            )
        

        print('\n\n\n\n\n newNote', new_note)
        db.session.add(new_note)
        db.session.commit()
        return new_note.to_dict()

    return "Bad Data"    

@note_routes.route('/<int:id>')
@login_required
def get_note(id):
    """
    Query for a note by id and returns that note in a dictionary
    """
    note = Note.query.get(id)

    return note.to_dict()
