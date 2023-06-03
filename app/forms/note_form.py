#from flask_sqlalchemy import SQLAlchemy
from flask_wtf import FlaskForm
from wtforms import ( StringField, TextAreaField,
                     BooleanField)
#from wtforms.validators import DataRequired, Length, Email

class NoteForm(FlaskForm):
    title = StringField("Title")
    body = TextAreaField("Write away")
    trash = BooleanField("Trash?",  false_values=False)
