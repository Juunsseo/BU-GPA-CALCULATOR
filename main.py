from flask import Flask, request, jsonify, send_from_directory

app = Flask(__name__, static_folder='.')

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/calculate_gpa', methods=['POST'])
def calculate_gpa():
    data = request.json
    grades = data.get('grades', [])
    credits = data.get('credits', [])
    if not grades or not credits:
        return jsonify({"error": "Invalid input"}), 400
    total_points = sum(grade * credit for grade, credit in zip(grades, credits))
    total_credits = sum(credits)
    gpa = total_points / total_credits if total_credits else 0
    return jsonify({"gpa": gpa})

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('.', path)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
