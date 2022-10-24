"""Flask app for Cupcakes"""

from flask import Flask, request, render_template, redirect, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Cupcake


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcake_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY']= 'abc123'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS']=False
toolbar = DebugToolbarExtension(app)

# using function created in model connect_db 
connect_db(app)


@app.route('/')
def get_html():
    return render_template('index.html')



@app.route('/api/cupcakes', methods=["GET"])
def all_cupcakes():
    """Get data about all cupcakes."""
    
    all_cupcakes = [cupcake.serialize() for cupcake in Cupcake.query.all()]
    return jsonify(cupcakes= all_cupcakes)


@app.route('/api/cupcakes/<int:cupcake_id>')
def get_cupcake(cupcake_id):
    """Get data about a single cupcake."""

    cupcake = Cupcake.query.get_or_404(cupcake_id)
    return jsonify(cupcake=cupcake.serialize())

@app.route('/api/cupcakes', methods=["POST"])
def create_cupcake():
    """Create a cupcake with flavor, size, rating and image data from the body of the request."""

    new_cupcake=Cupcake(flavor=request.json['flavor'], size=request.json['size'], rating=request.json['rating'], image=request.json.get('image', None))

    db.session.add(new_cupcake)
    db.session.commit()

    return (jsonify(cupcake=new_cupcake.serialize()),201)

@app.route('/api/cupcakes/<int:cupcake_id>', methods=["PATCH"])
def update_cupcake(cupcake_id):
    """Update a cupcake with the id passed in the URL and flavor, size, rating and image data from the body of the request. You can always assume that the entire cupcake object will be passed to the backend."""

    cupcake=Cupcake.query.get_or_404(cupcake_id)
    cupcake.flavor=request.json.get('flavor', cupcake.flavor)
    cupcake.size=request.json.get('size', cupcake.size)
    cupcake.rating=request.json.get('rating', cupcake.rating)
    cupcake.image=request.json.get('image', cupcake.image)

    db.session.commit()
    return jsonify(cupcake=cupcake.serialize())

@app.route('/api/cupcakes/<int:cupcake_id>', methods=["DELETE"])
def delete_cupcake(cupcake_id):
    """delete a cupcake"""
    cupcake=Cupcake.query.get_or_404(cupcake_id)
    db.session.delete(cupcake)
    db.session.commit()

    return jsonify(message="deleted")



