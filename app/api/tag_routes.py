from flask import Blueprint # jsonify, request
from flask_login import login_required #current_user
from app.models import Tag
#from ..models.db import db
#from ..forms.note_form import NoteForm


tag_routes = Blueprint('tags', __name__)

def pull_notetags(self):
    return {
        'id': self.id,
        'note_id': self.note_id,
        'tag_id': self.tag_id
    }

@tag_routes.route('/')
@login_required
def get_tags():
    """
    Query for all tags and returns them in a list of tags dictionaries
    """

    tags = Tag.query.all()
    return {'tags': [tag.to_dict() for tag in tags]}



#also get notetags
#does this work? query Tag// notes relationship
@tag_routes.route('/notetags/')
@login_required
def get_notetags():
    """
    Query for all note_tags and returns them in a list of note_tag tuples, by (note_id, tag_id)
    """
    tags = Tag.query.all()
    res = { "note_to_tags": {},
           "tag_to_notes": {} }


    tag_to_notes = res["tag_to_notes"]
    note_to_tags = res["note_to_tags"]

    for tag in tags:
        for note in tag.notes:
            try:
                tag_to_notes[tag.id].append(note.id)
            except KeyError:
                tag_to_notes[tag.id] = [note.id]

            try:
                note_to_tags[note.id].append(tag.id)
            except KeyError:
                note_to_tags[note.id] = [tag.id]

    print("\n\n\n\does THIS work?", res)
    return res
