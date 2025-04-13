from flask import Flask, request, jsonify
from flask_cors import CORS
from sentiment_analysis.sentiment_analyzer import predict_rating

app = Flask(__name__)
CORS(app, resources={r"/review-to-rating": {"origins": "http://localhost:5173"}})

@app.route("/review-to-rating", methods=["POST"])
def review_to_score():
    data: dict = request.get_json()
    review = data.get("review", "")
    predicted_rating = {"rating": predict_rating(review)}
    return jsonify(predicted_rating)

if __name__ == "__main__":
    app.run()