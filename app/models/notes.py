
#import db
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
    owners = db.relationship(
        "Users", back_populates="notes", cascade="all, delete-orphan")
    notebooks = db.relationship(
        "Notebooks", back_populates="notes", cascade="all, delete-orphan")
    tags = db.relationship(
        "Tags", back_populates="notes", secondary="note_tags", cascade="all, delete-orphan")

    shared_users = db.relationship("")
