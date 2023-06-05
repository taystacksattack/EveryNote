from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Notebook

notebook_routes = Blueprint('notebooks', __name__)

# @login_required

@notebook_routes.route("/")
def notebooks():
    """
    Query for all notebooks and returns them in a list of notebooks dictionaries
    """

    notebooks = Notebook.query.filter(
        Notebook.ownerId == current_user.id).all()

    print("------------------------")
    print("notebooks:", notebooks)
    print("------------------------")
    print('notebooks.title:', {"notebooks": [notebook.title
          for notebook in notebooks]})
    print("------------------------")
    print('notebooks.to_dict:', {"notebooks": [notebook.to_dict()
          for notebook in notebooks]})
    print("------------------------")

    return {'notebooks': [notebook.to_dict() for notebook in notebooks]}
