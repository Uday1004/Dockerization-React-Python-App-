import logging
logging.basicConfig(level=logging.DEBUG)

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/data', methods=['GET'])
def get_data():
    app.logger.debug('GET /api/data called')
    data = {"message": "Hello from the Python backend! with ReactApp"}
    return jsonify(data)

@app.route('/api/data', methods=['POST'])
def post_data():
    app.logger.debug('POST /api/data called')
    content = request.json
    response = {"message": f"Response: {content}"}
    return jsonify(response)

@app.errorhandler(404)
def page_not_found(e):
    app.logger.debug('404 error occurred: %s', (str(e)))
    return jsonify(error=str(e)), 404

if __name__ == '__main__':
    app.run(debug=True)
