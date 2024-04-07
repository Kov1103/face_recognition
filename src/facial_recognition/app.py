from flask import Flask, jsonify, request
import subprocess
import logging

# Thiết lập cấu hình logging
logging.basicConfig(filename='app.log', level=logging.DEBUG)

app = Flask(__name__)

@app.route('/run_face_rec', methods=['GET'])
def run_face_rec():
    try:
        # Nhận input từ request (nếu có)
        input_data = request.args.get('input_data')
        logging.info(f'Received input_data: {input_data}')

        result = subprocess.run(['python', 'facial_req.py'], stdout=subprocess.PIPE, text=True)
        output = result.stdout

        logging.info(f'Output: {output}')

        return jsonify({'output': output})
    except Exception as e:
        logging.error(f'Error running face_rec.py: {str(e)}')
        return jsonify({'error': str(e)})

@app.route('/run_register', methods=['GET'])
def run_register():
    try:
        result = subprocess.run(['python', 'register.py'], stdout=subprocess.PIPE, text=True)
        output = result.stdout
        return jsonify({'output': output})
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/run_train_model', methods=['GET'])
def run_train_model():
    try:
        result = subprocess.run(['python', 'train_model.py'], stdout=subprocess.PIPE, text=True)
        output = result.stdout
        return jsonify({'output': output})
    except Exception as e:
        return jsonify({'error': str(e)})
    
@app.route('/run_delete_user', methods=['GET'])
def run_delete_user():
    try:
        result = subprocess.run(['python', 'delete_user.py'], stdout=subprocess.PIPE, text=True)
        output = result.stdout
        return jsonify({'output': output})
    except Exception as e:
        return jsonify({'error': str(e)})
    
if __name__ == '__main__':
    app.run(debug=True)