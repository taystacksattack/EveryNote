from .db import db, add_prefix_for_prod, environment, SCHEMA

share_privileges = db.Table(
    "share_privileges",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
    db.Column("note_id", db.Integer, db.ForeignKey(add_prefix_for_prod("notes.id")), primary_key=True),
    db.Column("write_privileges", db.Boolean, default=False)
)

if environment == "production":
    share_privileges.schema = SCHEMA

# class Share_Privileges(db.Table):
#     __tablename__ = "share_privileges"
#     # Table Columns
#     id = db.Column(db.Integer, primary_key=True)
#     # read_privileges = db.Column(db.Boolean, default=False)
#     write_privileges = db.Column(db.Boolean, default=False)
