document.getElementById('submit-guess').addEventListener('click', guess_word);
//document.getElementById('guess').addEventListener('keypress', guess_word);

const idTimer = setInterval(showTime, 1000);
let time_left = 60
let score = 0
let words = new Set()

function showTime(){
    document.getElementById('timer').innerText = time_left;
    time_left -= 1;
    if (time_left <= 0) {
        clearInterval(idTimer);
        document.getElementById('timer').innerText = "Time is up !";
    }
}

async function guess_word(e){
    if (time_left <= 0) return;

    console.log(time_left);

    e.preventDefault();
    
    let guess = document.getElementById('guess').value;
    console.log(guess);

    if (guess.length === 0) return;

    if (words.has(guess)) return;

    words.add(guess);

    const response = await axios({
        url: `/` + "?word=" + guess,
        method: "POST",
    });
    console.log(response)
    const result = response.data["result"]
    document.getElementById('guess-result').innerText = result
    if (result === 'result - ok') {
        score += guess.length;
        document.querySelector('#score').innerText = "Score: " + score;
    }
    document.getElementById('guess').value = "";
    document.getElementById('guess').focus();
}

