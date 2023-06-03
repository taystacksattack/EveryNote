

from db import db, add_prefix_for_prod
from datetime import datetime

class Tasks(db.Model):
    __tablename__ = "tasks"
    # Table Columns
    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(50), nullable=False)

    ownerId = db.Column(db.Integer, ForeignKey(
        add_prefix_for_prod("User.id")), nullable=False)

    description = db.Column(db.String)

    completed = db.Column(db.Boolean, default=False)

    due_date = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.utcnow)

    updated_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.utcnow)
    # relationships
    owner = db.relationship(
        "Users", back_populates="tasks", cascade="all, delete-orphan")
