import os
from flask import Flask, send_from_directory, render_template
app = Flask(__name__)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def send(path):
    if path == "":
        return render_template('index.html')
    else:
        if os.path.exists('templates/' + path + '.html'):
            return render_template(path + '.html')
        else:
            return render_template('index.html')

if __name__ == '__main__':
    app.run(use_reloader=True, threaded=True)
