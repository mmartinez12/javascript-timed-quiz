var clearScores = document.getElementById("#clearScores");
var scoreDisplay = document.getElementById("#scores");
//var hiscores = document.getElementById(".hiscores")


localStorage.getItem("hiscores");

console.log(localStorage);



function populateTable() {
    scoreList.innerHTML = hiscores.map((row) => {
      return `<tr><td>${row.clicker}</td><td>${row.score}</tr>`;
    }).join('');
  }

function checkScore() {
    let worstScore = 0;
    if (hiscores.length > 4) {
      worstScore = hiscores[hiscores.length - 1].score;
    }
if (score > worstScore) {
    hiscores.push({score, initials});
  }
hiscores.sort((a, b) => a.score > b.score ? -1 : 1);

if (hiscores.length > 5) {
    hiscores.pop();
  }
  populateTable();
  localStorage.setItem('hiscores', JSON.stringify(hiscores));
}

function clearScores() {
    hiscores.splice(0, hiscores.length);
    localStorage.setItem('hiscores', JSON.stringify(hiscores));
    populateTable();
  }

//clearScores.addEventListener("click", localStorage.clear());