# from flask_sqlalchemy import SQLAlchemy
from flask_wtf import FlaskForm
from wtforms import (StringField, BooleanField)
from wtforms.validators import DataRequired


class NotebookForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired()])
    is_default = BooleanField(
        "Set this as your default Notebook?", default=False)
