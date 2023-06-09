
from flask_wtf import FlaskForm
from wtforms import ( StringField )

from wtforms.validators import DataRequired

class TagForm(FlaskForm):
    # name = StringField("Name")
    name = StringField("Name", validators=[DataRequired()])
