from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required, current_user
from app.models import db, Notebook
from ..forms.notebook_form import NotebookForm


notebook_routes = Blueprint('notebooks', __name__)

# CREATE a new notebook


@notebook_routes.route("/new", methods=["GET", "POST"])
@login_required
def post_notebook():
    form = NotebookForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_notebook = NotebookForm(
            title=form.data["title"],
            is_default=form.data["is_default"]
        )
        print("==================================")
        print("NEW NOTEBOOK:", new_notebook)
        print("==================================")
        db.session.add(new_notebook)
        db.session.commit()
        return {"result": new_notebook.to_dict()}
    if form.errors:
        print({"message": "not successful"})
        return None

# UPDATE a notebook


@notebook_routes.route('/<int:id>/edit', methods=["PUT"])
@login_required
def put_notebook(id):

    form = NotebookForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        notebook_to_edit = Notebook.query.get(id)

        if current_user.id != notebook_to_edit.ownerId:
            return {"error": "This is not your notebook to update"}

        notebook_to_edit.title = form.data["title"]
        notebook_to_edit.is_default = form.data["is_default"]

        db.session.commit()
        return notebook_to_edit.to_dict()

    if form.errors:
        print(form.errors)
        return {"message": "not successful in Update route"}


@notebook_routes.route('/<int:id>/delete', methods=["GET", "DELETE"])
@login_required
def delete_notebook(notebookId):
    notebook_to_delete = Notebook.query.get(notebookId)

    db.session.delete(notebook_to_delete)
    db.session.commit()
    return redirect('/notebooks')

# GET notebook by ID


@notebook_routes.route("/notebookId")
@login_required
def get_notebook_byId(notebookId):

    notebook = Notebook.query.get(notebookId)

    print("==================================")
    print("GET NOTEBOOK BY ID:", notebook)
    print("==================================")
    return notebook.to_dict()

# GET all notebooks


@notebook_routes.route("/")
@login_required
def notebooks():

    notebooks = Notebook.query.filter(
        Notebook.ownerId == current_user.id).all()

    print("==================================")
    print("GET NOTEBOOK:", notebooks)
    print("==================================")

    return {'notebooks': [notebook.to_dict() for notebook in notebooks]}
