from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    barbara = User(
        username='Barbara', email='barbara@aa.io', password='password')
    lorna = User(
        username='Lorna', email='lorna@aa.io', password='password')
    emmanuel = User(
        username='Emmanuel', email='emmanuel@aa.io', password='password')
    mattie = User(
        username='Mattie', email='mattie@aa.io', password='password')
    karl = User(
        username='Karl', email='karl@aa.io', password='password')
    jeanne = User(
        username='Jeanne', email='jeanne@aa.io', password='password')
    marcella = User(
        username='Marcella', email='marcella@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(barbara)
    db.session.add(lorna)
    db.session.add(emmanuel)
    db.session.add(mattie)
    db.session.add(karl)
    db.session.add(jeanne)
    db.session.add(marcella)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
