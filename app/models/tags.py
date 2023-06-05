
from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .note_tags import note_tag


class Tag(db.Model):
    __tablename__ = "tags"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    # color = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.utcnow)

    notes = db.relationship(
        "Note", back_populates="tags", secondary=note_tag)
