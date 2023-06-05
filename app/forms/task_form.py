
from flask_wtf import FlaskForm
from wtforms import ( StringField, BooleanField, DateField, TextAreaField )
from wtforms.validators import DataRequired, Length


class TaskForm(FlaskForm):

    title = StringField("Name of Task", validators=[
                        DataRequired(), Length(min=5, max=50)])

    description = TextAreaField(
        "Description of task", validators=[DataRequired()])

    due_date = DateField("when should this task be completed?")

    updated_at = DateField("updated at")

    completed = BooleanField("Completed?", default=False)

    # submit = SubmitField("Save Task")
    '''
        Maybe hide these from the JinJa but manually input the data when creating the user
        # created_at = DateField("Created At")
        # updated_at = DateField("Updated At")
    '''
