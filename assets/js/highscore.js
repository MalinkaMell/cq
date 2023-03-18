let saveHighscore = JSON.parse(window.localStorage.getItem("saveHighscore"));
console.log(saveHighscore);
let sorted = saveHighscore.sort((a, b) => parseInt(b.highscore) - parseInt(a.highscore));
let table = document.getElementById('highscore');

function appendHighscore() {
  
  saveHighscore.map((item, i) => {

    let row =  document.createElement('tr');
    let numTd = document.createElement('th');
    let initialsTd =  document.createElement('td');
    let scoreTd =  document.createElement('td');

    numTd.innerHTML = i+1;
    initialsTd.innerHTML = item.initials;
    scoreTd.innerHTML = item.highscore;

    row.append(numTd);
    row.append(initialsTd);
    row.append(scoreTd);
    table.append(row);
  })
}
appendHighscore()