from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Task
from ..forms.task_form import TaskForm


task_routes = Blueprint('tasks', __name__)


@task_routes.route('/')
@login_required
def tasks():
    '''
    Queries for all tasks and returns them in a list for the user
    '''

    tasks = Task.query.filter(Task.ownerId == current_user.id).all()
    return [task.to_dict() for task in tasks]

@task_routes.route('/<int:id>')
@login_required
def get_task(id):
    """
    Query for a task by id and returns that task in a dictionary
    """
    task = Task.query.get(id)

    return task.to_dict()


@task_routes.route('/new', methods=['GET','POST'])
@login_required
def new_task():
    form = TaskForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_task = Task(
            ownerId = current_user.id,
            title = form.data['title'],
            description = form.data['description'],
            due_date = form.data['due_date'],
            completed = form.data['completed']
        )

        print("NEW TASK inside of the route",new_task)
        db.session.add(new_task)
        db.session.commit()
        return {"result": new_task.to_dict()}
    if form.errors:
        print("look at these errors from the backend", form.errors)
        return
