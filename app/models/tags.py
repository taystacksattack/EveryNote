
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
<<<<<<< Updated upstream
=======

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'num_notes': len(self.notes),
            'created_at': self.created_at,
            'updated_at': self.updated_at,
    }

    # def to_dict_test(self):
    #     return {
    #         'id': self.id,
    #         'name': self.name,
    #         'notes': self.notes,
    #         'created_at': self.created_at,
    #         'updated_at': self.updated_at,
    # }
    # def tag_notes(self):
    #     return {
    #         "tag_id": self.id,
    #         "notes": self.notes
    #     }
>>>>>>> Stashed changes
