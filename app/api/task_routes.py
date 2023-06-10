from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required, current_user
from app.models import db, Task
from ..forms.task_form import TaskForm
from datetime import datetime
import operator


task_routes = Blueprint('tasks', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages



@task_routes.route('/')
@login_required
def tasks():
    '''
    Queries for all tasks and returns them in a list for the user
    '''

    tasks = Task.query.filter(Task.ownerId == current_user.id).all()
    task_dicts = [task.to_dict() for task in tasks]
    sorted_tasks = sorted(task_dicts, key=operator.itemgetter('title'))
    # print(sorted_tasks)
    return sorted_tasks

@task_routes.route('/<int:id>')
@login_required
def get_task(id):
    """
    Query for a task by id and returns that task in a dictionary
    """
    task = Task.query.get(id)

    return task.to_dict()


@task_routes.route('/new', methods=["GET","POST"])
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

        # print("NEW TASK inside of the route",new_task)
        db.session.add(new_task)
        db.session.commit()
        return {"result": new_task.to_dict()}
    if form.errors:
        # print("Look at these errors from the backend", form.errors)
        return {"errors": validation_errors_to_error_messages(form.errors)}


@task_routes.route('/<int:id>/edit', methods = ["GET", "PUT"])
@login_required
def edit_task(id):
    form = TaskForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    # CHECK TO SEE IF USER ID == task ownerId

    # print("form inside route",form)

    if form.validate_on_submit():
        task_to_update = Task.query.get(id)
        if current_user.id != task_to_update.ownerId:
            return {"error" : "This is not your task to update"}

        task_to_update.title = form.data['title']
        task_to_update.description = form.data['description']
        task_to_update.due_date = form.data['due_date']
        task_to_update.completed = form.data['completed']
        # task_to_update.updated_at = datetime.utcnow
        db.session.commit()

        # print(task_to_update)
        return redirect("/tasks")

    if form.errors:
        # print('Look at these errors from the backend', form.errors)
        return


@task_routes.route('/<int:id>/delete', methods = ["GET", "DELETE"])
@login_required
def delete_task(id):
    # print("id",id)
    task_to_delete = Task.query.get(id)
    # print("Here's that task",task_to_delete)
    if current_user.id != task_to_delete.ownerId:
            return {"error" : "This is not your task to delete"}

    db.session.delete(task_to_delete)
    db.session.commit()
    # print(success)
    redirect('/tasks')
    return {"status":"successful deletion"}#redirect("/tasks")
