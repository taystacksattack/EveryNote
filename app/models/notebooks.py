
from db import db, add_prefix_for_prod
from datetime import datetime

class Notebook(db.Model):
    __tablename__ = "notebooks"
    # Table Columns
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    title = db.Column(db.String(50), nullable=False)
    is_default = db.Column(db.Boolean, nullable=False)
    ownerId = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("User.id")), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.utcnow)
    # Relationships
    owner = db.relationship(
        "User", back_populates="notebooks", cascade="all, delete")
    notes = db.relationship("Notebooks", back_populates="notes")
