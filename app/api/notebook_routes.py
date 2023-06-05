from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Notebook
from app.forms.notebook_form import NotebookForm
notebook_routes = Blueprint('notebooks', __name__)


@notebook_routes.route("/")
@login_required
def notebooks():
    """
    Query for all notebooks and returns them in a list of notebooks dictionaries
    """

    notebooks = Notebook.query.filter(
        Notebook.ownerId == current_user.id).all()

    return {'notebooks': [notebook.to_dict() for notebook in notebooks]}


@notebook_routes.route("/notebookId")
@login_required
def get_notebook_byId(notebookId):

    notebook = Notebook.query.get(notebookId)
    return notebook.to_dict()


@notebook_routes.route("/notebooks/new")
@login_required
def create_notebook():
    form = NotebookForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_notebook = NotebookForm(
            title=form.data["title"],
            is_default=form.data["is_default"]
        )
        print("NEW NOTEBOOK:", new_notebook)
        db.session.add(new_notebook)
        db.session.commit()
        return {"result": new_notebook.to_dict()}
    if form.errors:
        print("get fucked", form.errors)
        return
