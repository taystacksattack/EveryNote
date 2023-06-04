from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Task


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
