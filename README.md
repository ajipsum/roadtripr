#  roadtripr

# startup instructions
- make sure you have virtualenv (pip install virtualenv)
- in the root folder run:
    virtualenv venv
    source venv/bin/activate
    pip install -r requirements.txt

# installing a new package
- always install a new package while inside the virtual environment
- after installing, go back to root and run:
    pip freeze > requirements.txt

# exiting the virtual environment
- run:
    deactivate
