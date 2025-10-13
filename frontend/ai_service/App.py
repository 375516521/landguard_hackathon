# AI microservice stub.
# Replace with actual model code to perform satellite image retrieval & inference.
from flask import Flask, request, jsonify
from flask_cors import CORS
import time, random, requests, os

app = Flask(__name__)
CORS(app)

@app.route('/analyze', methods=['POST'])
def analyze():
  body = request.get_json() or {}
  parcel_id = body.get('parcelId')
  geojson = body.get('geojson')
  # Simulate analysis: compute fake score and types
  time.sleep(1)
  result = {
    'parcelId': parcel_id,
    'riskScore': round(random.uniform(0,1),3),
    'degradationTypes': ['erosion'] if random.random()>0.5 else ['vegetation_loss'],
    'confidence': round(random.uniform(0.6,0.98),2),
    'raw': { 'note': 'this is simulated; replace with model output' }
  }
  # Optionally: post back to backend to save result (if backend exposes such endpoint)
  backend_url = os.environ.get('BACKEND_CALLBACK') or 'http://localhost:5000/api/parcels/callback'
  try:
    requests.post(backend_url, json={'parcelId': parcel_id, 'result': result}, timeout=5)
  except Exception as e:
    # ignore; backend already updates when it receives response through initial call.
    pass
  return jsonify({'success': True, 'result': result})

if __name__ == '__main__':
  app.run(port=5001, debug=True)
