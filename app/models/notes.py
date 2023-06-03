
# import db
from .db import db, add_prefix_for_prod
from datetime import datetime


class Note(db.Model):
    __tablename__ = "notes"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    body = db.Column(db.String(1000))
    trash = db.Column(db.Boolean)
    ownerId = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    notebookId = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("notebooks.id")), nullable=False)
    tagId = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("tags.id")), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.utcnow)

    # relationships
    owner = db.relationship(
        "User", back_populates="notes")
    notebooks = db.relationship(
        "Notebook", back_populates="notes")
    tags = db.relationship(
        "Tag", back_populates="notes", secondary="note_tags", cascade="all,delete-orphan")

    # shared_users = db.relationship("")
