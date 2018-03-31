import os
from flask import Flask, send_from_directory, render_template, jsonify
from controllers.githubcontroller import GithubController
app = Flask(__name__)

github_controller = None

@app.route('/about', methods=['GET'])
def github_contribs():
    global github_controller
    
    if github_controller == None:
        github_controller = GithubController()
    
    result = {'commits': github_controller.get_commit_counts(),
              'issues': github_controller.get_issue_counts()}
    return render_template('about.html', **result)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if(path == ""):
        return render_template('index.html')
    else:
        if(os.path.exists("react_app/build/" + path)):
            return send_from_directory('react-app/build/static/js', path)
        else:
            return send_from_directory('react-app/build', 'index.html')

if __name__ == '__main__':
    app.run(use_reloader=True, threaded=True)
