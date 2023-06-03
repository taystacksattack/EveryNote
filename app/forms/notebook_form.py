#from flask_sqlalchemy import SQLAlchemy
from flask_wtf import FlaskForm
from wtforms import ( StringField, BooleanField )
from wtforms.validators import DataRequired, Length

class NotebookForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired(), Length(
        min=1, max=50, message="Your notebook name must contain at least one character")])
    is_default = BooleanField(
        "Set this as your default Notebook?", validators=[DataRequired()])
    '''
        Maybe hide these from the JinJa but manually input the data when creating the user
        # created_at = DateField("Created At")
        # updated_at = DateField("Updated At")
    '''
