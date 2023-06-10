"""here we go again

Revision ID: ffdc0a98111c
Revises:
Create Date: 2023-06-09 16:55:21.032692

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ffdc0a98111c'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tags',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('notebooks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=50), nullable=False),
    sa.Column('is_default', sa.Boolean(), nullable=False),
    sa.Column('ownerId', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['ownerId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tasks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=50), nullable=False),
    sa.Column('ownerId', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(length=500), nullable=True),
    sa.Column('completed', sa.Boolean(), nullable=True),
    sa.Column('due_date', sa.DateTime(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['ownerId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('notes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=30), nullable=True),
    sa.Column('body', sa.Text(), nullable=True),
    sa.Column('trash', sa.Boolean(), nullable=True),
    sa.Column('ownerId', sa.Integer(), nullable=False),
    sa.Column('notebookId', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['notebookId'], ['notebooks.id'], ),
    sa.ForeignKeyConstraint(['ownerId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('note_tags',
    sa.Column('note_id', sa.Integer(), nullable=False),
    sa.Column('tag_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['note_id'], ['notes.id'], ),
    sa.ForeignKeyConstraint(['tag_id'], ['tags.id'], ),
    sa.PrimaryKeyConstraint('note_id', 'tag_id')
    )
    op.create_table('share_privileges',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('note_id', sa.Integer(), nullable=False),
    sa.Column('write_privileges', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['note_id'], ['notes.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'note_id')
    )
    # ### end Alembic commands ###
    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE notebooks SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE notes SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE tags SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE tasks SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE note_tags SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE share_privileges SET SCHEMA {SCHEMA};")

def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('share_privileges')
    op.drop_table('note_tags')
    op.drop_table('notes')
    op.drop_table('tasks')
    op.drop_table('notebooks')
    op.drop_table('users')
    op.drop_table('tags')
    # ### end Alembic commands ###
