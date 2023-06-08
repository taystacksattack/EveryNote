from flask import Blueprint, request  # jsonify, request
from flask_login import login_required  # current_user
from app.models import Tag, Note
from ..models.db import db
from ..forms.tag_form import TagForm


tag_routes = Blueprint('tags', __name__)


def pull_notetags(self):
    return {
        'id': self.id,
        'note_id': self.note_id,
        'tag_id': self.tag_id
    }


@tag_routes.route('/<int:tagId>', methods=["DELETE"]
                  # @tag_routes.route('/<int:tagId>', methods=["DELETE"]
                  )
@login_required
def delete_tag(tagId):
    print("at delete route")
    to_delete = Tag.query.get(tagId)
    db.session.delete(to_delete)
    db.session.commit()
    return {"message": f'Tag {tagId} successfully deleted'}

@tag_routes.route('/<int:tagId>', methods=["POST"])
@login_required
def update_tag(tagId):

    form = TagForm()
    form['csrf_token'].data = request.cookies['csrf_token']


    print("at update route, tag: ", tagId)
    to_update = Tag.query.get(tagId)


    print("EDIT TAG")

    if form.validate_on_submit():
        data = form.data
        # to_update["name"] = data["name"]
        to_update.name = data["name"]
        #db.session.add(to_update)
        db.session.commit()
        return to_update.to_dict()

    return { "Error": "end of update route" }

@tag_routes.route('/')
@login_required
def get_tags():
    """
    Query for all tags and returns them in a list of tags dictionaries
    """

    tags = Tag.query.all()
    return {'tags': [tag.to_dict() for tag in tags]}


@tag_routes.route('/', methods=["POST"])
@login_required
def create_tag():
    """
    Query for all tags and returns them in a list of tags dictionaries
    """

    form = TagForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # print("\n\n\ntag create DOES THIS WORK", dict(request.data))
    # print("\n\n\ntag create DOES THIS WORK", dict(request.form))

    print("CREATE TAG ROUTE")

    # if request.form[name]:
    #     print("very nice")
    if form.validate_on_submit():
        data = form.data
        res_tag = Tag(
        name= data["name"]
        # name= data.name
        )

        db.session.add(res_tag)
        db.session.commit()
        return res_tag.to_dict()

    return "Error, somewhere"


    # test_tag = Tag(name="test_tag")
    # db.session.add(test_tag)
    # db.session.commit()
    # return test_tag.to_dict()


# also get notetags
# does this work? query Tag// notes relationship
@tag_routes.route('/notetags/')
@login_required
def get_notetags():
    """
    Query for all note_tags and returns them in a list of note_tag tuples, by (note_id, tag_id)
    """

    print("\n\n\nAT NOTETAGS ROUTE")

    tags = Tag.query.all()
    res = {"note_to_tags": {},
           "tag_to_notes": {}}

    tag_to_notes = res["tag_to_notes"]
    note_to_tags = res["note_to_tags"]

    for tag in tags:
        for note in tag.notes:

            # print("\n\n\ncurrent tag", tag.to_dict())
            # print("current note", note.to_dict())

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

@tag_routes.route('/notetags/<int:noteId>/<int:tagId>', methods=["POST"])
@login_required
def add_tag_to_note(noteId, tagId):

    try:
        this_note = Note.query.get(noteId)
        this_tag = Tag.query.get(tagId)

        if this_tag in this_note.tags:
            return { "message" :f"Tag {tagId} is already in Note {noteId}??"}

        this_note.tags.append(this_tag)
        # db.session.add(this_note)
        db.session.commit()

        return { "message": f"Tag {tagId} successfully added to Note {noteId}"}
    except:
        return { "error": f"Unable to add tag {tagId} to Note {noteId}"}




"""     seed_note_13.tags.append(seed_tag_11_12_13)
    db.session.add(seed_note_13)

    db.session.commit()
 """
