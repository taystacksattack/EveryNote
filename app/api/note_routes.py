from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Note

note_routes = Blueprint('notes', __name__)

@note_routes.route('/')
@login_required
def notes():
    """
    Query for all notes and returns them in a list of notes dictionaries
    """
   
    notes = Note.query.filter(Note.ownerId == current_user.id).all()

    return {'notes': [note.to_dict() for note in notes]}
    
@note_routes.route('/<int:id>')
@login_required
def get_note(id):
    """
    Query for a note by id and returns that note in a dictionary
    """
    note = Note.query.get(id)
    
    return note.to_dict()
