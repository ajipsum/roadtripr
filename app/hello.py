import os
from flask import Flask, send_from_directory
app = Flask(__name__)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def send(path):
	return send_from_directory('roadtripr/public', 'index.html')
""" 
    if(path == ""):
        return send_from_directory('roadtripr/public', 'index.html')
    else:
        if(os.path.exists("roadtripr/public/" + path)):
            return send_from_directory('roadtripr/public', path)
        else:
            return send_from_directory('roadtripr/public', 'index.html')
"""

if __name__ == '__main__':
    app.run(use_reloader=True, threaded=True)
