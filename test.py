from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle


# Make Flask errors be real errors, not HTML pages with error info
app.config['TESTING'] = True

# This is a bit of hack, but don't use Flask DebugToolbar
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']


class FlaskTests(TestCase):

    # TODO -- write tests for every view function / feature!
    def test_show_board(self):  
        with app.test_client() as client:           
            resp = client.get('/')
            html = resp.get_data(as_text=True)
            self.assertEqual(resp.status_code, 200)
            self.assertEqual(len(session['board']), 5)
            self.assertIn('Guess the 5 letter word in 60 seconds', html)
        

    def test_verify_word(self):
        with app.test_client() as client:                   
            resp = client.post('/', data={'word': 'water'})
            html = resp.get_data(as_text=True)
            self.assertEqual(resp.status_code, 200)
            self.assertIn('result', html)
