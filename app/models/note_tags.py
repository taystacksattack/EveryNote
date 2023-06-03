
from db import db, add_prefix_for_prod


class NoteTag(db.Table):
    __name__ = "note_tags"
    # Table Columns
    id = db.Column(db.Integer, primary_key=True)
    noteId = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("Notes")), nullable=False)
    tagId = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("Tags")), nullable=False)
    # relationship
    note = db.relationship("Notes", secondary="tags",
                           back_populates="note_tags")
    tag = db.relationship("Tags", secondary="notes",
                          back_populates="note_tags")
