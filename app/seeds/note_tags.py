from app.models import SCHEMA, environment
from app.models.db import db
from app.models.note_tags import note_tag
from sqlalchemy.sql import text


def seed_notetags():
    # print("\n\n\nnote tag dir here lol")
    # print(dir(note_tag))
    # note_tag.add(1, 1)
    # # note_tag1 = note_tag(1, 1)
    # note_tag2 = note_tag(1, 2)

    # db.session.add(note_tag1)
    # db.session.add(note_tag2)
    # db.session.commit()
    pass

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_notetags():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.note_tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM note_tags"))

    db.session.commit()
