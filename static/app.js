document.getElementById('submit-guess').addEventListener('click', guess_word);
const idTimer = setInterval(showTime, 1000);
let time_left = 60

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

    e.preventDefault();
    const guess = document.getElementById('guess').value
    console.log(guess);
    const response = await axios({
        url: `/` + "?word=" + guess,
        method: "POST",
    });
    console.log(response)
    const result = response.data["result"]
    document.getElementById('guess-result').innerText = result
}

