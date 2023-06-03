
from flask_wtf import FlaskForm
from wtforms import ( StringField, BooleanField, DateField, TextAreaField )
from wtforms.validators import DataRequired, Length


class TaskForm(FlaskForm):
    title = StringField("Name of Task", validators=[
                        DataRequired(), Length(min=5, max=50)])

    description = TextAreaField(
        "Description of said task", validators=[DataRequired()])

    completed = BooleanField("Completed?", default=False)

    due_date = DateField("when should this task be completed?",)
    '''
        Maybe hide these from the JinJa but manually input the data when creating the user
        # created_at = DateField("Created At")
        # updated_at = DateField("Updated At")
    '''
