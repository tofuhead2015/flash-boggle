from flask import Flask, request, render_template, flash, redirect, session
from boggle import Boggle

boggle_game = Boggle()

app = Flask(__name__)

app.config['SECRET_KEY'] = "top secret"

@app.route('/')
def show_board(): 
    '''
    >>> Initialize the session board
    '''
    session["board"] = boggle_game.make_board()    
    return render_template('base.html', board = session["board"])
    

@app.route('/', methods=['POST'])
def verify_word(): 
    '''
    >>> verify the word entered
    '''
    guess = request.args.get('word')
    print("verify_word: ", guess)    
    result = boggle_game.check_valid_word(session["board"], guess)
    return {"result": "result - " + result}


