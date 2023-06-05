
# import db
from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .note_tags import note_tag


class Note(db.Model):
    __tablename__ = "notes"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    body = db.Column(db.String(1000))
    trash = db.Column(db.Boolean)
    ownerId = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    notebookId = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("notebooks.id")), nullable=False)
    # tagId = db.Column(db.Integer, db.ForeignKey(
    #     add_prefix_for_prod("tags.id")))
    #     add_prefix_for_prod("tags.id")), nullable=False)

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
        "Tag", back_populates="notes", secondary=note_tag)

    # shared_users = db.relationship("")

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
        }
