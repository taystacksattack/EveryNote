from app.models import db, Task, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_tasks():
    ask_for_an_extension = Task(
        title='Adult Responsibility', ownerId=1, description="ask for an extension for the 2023 tax season as you procrastinated to hard", completed=True, due_date="2023-28-05")
    finish_pokemon_types = Task(
        title='Hobbies', ownerId=1, description="Finish writing out the type of the current iteration of Pokemon", completed=False, due_date="2023-01-07")

    db.session.add(ask_for_an_extension)
    db.session.add(finish_pokemon_types)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_tasks():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tasks"))

    db.session.commit()
