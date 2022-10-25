from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

DEFAULT_URL = "https://tinyurl.com/demo-cupcake"

def connect_db(app):
    """Connect this database to provided Flask app. connect_db(app) is used in app.py """
    db.app = app
    db.init_app(app)


class Cupcake(db.Model):
    """cupcake model"""

    __tablename__ = "cupcakes"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    flavor = db.Column(db.Text, nullable=False)
    size = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Float, nullable=False)
    image = db.Column(db.Text, nullable=False, default=DEFAULT_URL)

    def serialize(self):
        """ Serialize cupcake to a dict of cupcake info"""
        return {
            'id': self.id,
            'flavor': self.flavor,
            'size': self.size,
            'rating': self.rating,
            'image': self.image
        }



