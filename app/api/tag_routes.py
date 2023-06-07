from flask import Blueprint # jsonify, request
from flask_login import login_required #current_user
<<<<<<< HEAD
from app.models import Tag, note_tag
#from ..models.db import db
#from ..forms.note_form import NoteForm
=======
from app.models import Tag
from ..models.db import db
#from ..forms.tag_form import TagForm
>>>>>>> tuesday-josh


tag_routes = Blueprint('tags', __name__)

def pull_notetags(self):
    return {
        'id': self.id,
        'note_id': self.note_id,
        'tag_id': self.tag_id
    }

<<<<<<< HEAD
=======
@tag_routes.route('/<int:tagId>', methods=["DELETE"]
# @tag_routes.route('/<int:tagId>', methods=["DELETE"]
)
@login_required
def delete_tag(tagId):
    print("at delete route")
    to_delete = Tag.query.get(tagId)
    db.session.delete(to_delete)
    db.session.commit()
    return { "message": f'Tag {tagId} successfully deleted'}

>>>>>>> tuesday-josh
@tag_routes.route('/')
@login_required
def get_tags():
    """
    Query for all tags and returns them in a list of tags dictionaries
    """

    tags = Tag.query.all()
    return {'tags': [tag.to_dict() for tag in tags]}

<<<<<<< HEAD
=======
@tag_routes.route('/', methods=["POST"])
@login_required
def create_tag():
    """
    Query for all tags and returns them in a list of tags dictionaries
    """

    """ form = TagForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            data = form.data
            res_tag = Tag {
            name: data.name
            }

            db.session.add(res_tag)
            db.session.commit()
            return res_tag.to_dict()


        """
    test_tag = Tag( name="test_tag")
    db.session.add(test_tag)
    db.session.commit()
    return test_tag.to_dict()




>>>>>>> tuesday-josh
#also get notetags
#does this work? query Tag// notes relationship
@tag_routes.route('/notetags/')
@login_required
def get_notetags():
    """
    Query for all note_tags and returns them in a list of note_tag tuples, by (note_id, tag_id)
    """

<<<<<<< HEAD
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
=======
    print("\n\n\nAT NOTETAGS ROUTE")

    tags = Tag.query.all()
    res = { "note_to_tags": {},
           "tag_to_notes": {} }


    tag_to_notes = res["tag_to_notes"]
    note_to_tags = res["note_to_tags"]

    for tag in tags:
        for note in tag.notes:

            print("\n\n\ncurrent tag", tag.to_dict())
            print("current note", note.to_dict())

            try:
                tag_to_notes[tag.id].append(note.id)
            except KeyError:
                tag_to_notes[tag.id] = [note.id]

            try:
                note_to_tags[note.id].append(tag.id)
            except KeyError:
                note_to_tags[note.id] = [tag.id]

    # print("\n\n\n\does THIS work?", res)
    return res
>>>>>>> tuesday-josh
