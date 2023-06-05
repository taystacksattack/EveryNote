
from .db import db, add_prefix_for_prod, environment, SCHEMA


note_tag = db.Table(
    "note_tags",
    # Table Columns
    db.Model.metadata,
    db.Column("note_id", db.Integer, db.ForeignKey(
        add_prefix_for_prod("notes.id")), primary_key=True),
    db.Column("tag_id", db.Integer, db.ForeignKey(
        add_prefix_for_prod("tags.id")), primary_key=True)
)

if environment == "production":
    note_tag.schema = SCHEMA
