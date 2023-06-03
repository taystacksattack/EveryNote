
from .db import db, add_prefix_for_prod


note_tag = db.Table(
    "note_tags",
    # Table Columns
    db.Model.metadata, 
    db.Column("note_id", db.Integer, db.ForeignKey(
        add_prefix_for_prod("notes.id")), primary_key=True),
    db.Column("user_id", db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), primary_key=True)
)
