import json
import torch
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification

device = torch.device("cpu")

checkpoint_path = "sentiment_analysis/checkpoint"

model = DistilBertForSequenceClassification.from_pretrained(
    checkpoint_path, 
    torch_dtype=torch.float16
).to(device)
tokenizer = DistilBertTokenizer.from_pretrained(
    "distilbert-base-uncased", 
    torch_dtype=torch.float16
)

with open("sentiment_analysis/sentiment_map.json", "r") as f:
    prediction_map = json.load(f)

def predict_rating(review: str) -> float:
    """Takes in a movie review and calculates the corresponding rating for it based on its sentiment."""
    input = tokenizer(review, padding=True, truncation=True, return_tensors="pt")
    input = {key: value.to(device) for key, value in input.items()}

    model.eval()
    with torch.no_grad():
        output = model(**input)

    probabilities = output.logits
    softmax_probabilities = probabilities[0].softmax(0)

    rating = 0
    for i, probability in enumerate(softmax_probabilities):
        # Skipping using the neutral prediction for now
        if i == 2:
            pass
        else:
            weight = prediction_map[str(i)]["weight"]
            rating += probability.item() * weight
    
    # Normalize the rating to be between 0-1 and then put it in range of 0-10
    normalized_rating = (rating + 1) / 2
    return round((normalized_rating * 10), 2)

# Example Usage
review = "The movie was alright. It had its good parts, but could have been better."
rating = predict_rating(review)
print(rating)