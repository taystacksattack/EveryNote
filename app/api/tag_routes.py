from flask import Blueprint # jsonify, request
from flask_login import login_required #current_user
from app.models import Tag, note_tag
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

    print("\n\n\n\n500 here?")
    tags = Tag.query.all()

    return { 'notetags': [tag.notes_of_tag() for tag in tags]
    }

    # print("what about this", dir(note_tag))
    # print("\n\n\nget children????", note_tag.get_children())
    # print("\n\n\n????", note_tag.table_valued())
    # print("type of table_valued...?", type(note_tag.table_valued()))
    # print("colu...?", note_tag.foreign_keys)
    # print("metadata...?", type(note_tag.metadata))

    # # print("\n\n\ntags", tags)
    # print("pre-note-tag")
    # print("\n\n\n\nwhat does this do", dir(note_tag))

    for tag in tags:
        print("does this work?", tag)

    tempNoteTags = []

    # for tag in tags:
    #     testtag = tag.to_dict_test()
    #     print("current tag:", testtag)

    return {"tempnote": tempNoteTags}

"""
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'body': self.body,
            'trash': self.trash,
            'ownerId': self.ownerId,
            'notebookId': self.notebookId,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            # 'tags': self.tags
        } """
