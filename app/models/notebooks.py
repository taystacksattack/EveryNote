
from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Notebook(db.Model):
    __tablename__ = "notebooks"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # Table Columns
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    title = db.Column(db.String(50), nullable=False)
    is_default = db.Column(db.Boolean, nullable=False)
    ownerId = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.utcnow)
    # Relationships
    owner = db.relationship(
        "User", back_populates="notebooks")
    notes = db.relationship(
        "Note", back_populates="notebooks", cascade="all, delete", single_parent=True)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "is_default": self.is_default,
            "ownerId": self.ownerId,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
