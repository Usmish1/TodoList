from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import requests

app = Flask(__name__)
CORS(app)

@app.route('/api/todos', methods=['GET'])
def todos_api():
    with open('todos.json', 'r') as f:
        todos = json.load(f)
    print(todos)
    return jsonify(todos)

@app.route('/api/todos', methods=['POST'])
def add_todos():
    new_todo = request.json
    with open('todos.json', 'w') as f:
        json.dump(new_todo, f)
    print(new_todo)
    return jsonify(new_todo)
        

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5500, debug=True)
