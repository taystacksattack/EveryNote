from .db import db, add_prefix_for_prod

share_privileges = db.Table(
    "shareprivileges",
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("note_id", db.Integer, db.ForeignKey("notes.id"), primary_key=True),
)



# class Share_Privileges(db.Table):
#     __tablename__ = "share_privileges"
#     # Table Columns
#     id = db.Column(db.Integer, primary_key=True)
#     # read_privileges = db.Column(db.Boolean, default=False)
#     write_privileges = db.Column(db.Boolean, default=False)
