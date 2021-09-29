var score1; //score of Team 1
var score2; //score of Team 2
var maxScore;
var MvpT1 = 0; //Score of Most valuable player in Team 1
var MvpT2 = 0; //Score of Most valuable player in Team 2
var ManOfTheMatchScore = 0;
var winnerTeam;
var playerNum1;
var playerNum2;
var ManOfTheMatchPlayerNum;
var flag1 = false;
var flag2 = false;
var Panel = /** @class */ (function () {
    function Panel(teamNo, sc, btnNo) {
        this.teamNum = teamNo;
        this.score = sc;
        this.btnNum = btnNo;
        this.colElement = document.createElement("div");
        this.colElement.setAttribute("class", "col-4 text-center");
        this.h3Element1 = document.createElement("h3");
        this.h3Element1.innerText = "TEAM " + this.teamNum + " SCORE";
        this.h3Element2 = document.createElement("h3");
        this.h3Element2.setAttribute("id", "sc" + this.teamNum);
        this.h3Element2.innerText = this.score.toString();
        this.btnElement = document.createElement("button");
        this.btnElement.setAttribute("class", "btn btn-primary");
        this.btnElement.innerText = "Hit" + this.btnNum;
        this.btnElement.setAttribute("id", "btn" + this.btnNum);
        this.colElement.appendChild(this.h3Element1);
        this.colElement.appendChild(this.h3Element2);
        this.colElement.appendChild(this.btnElement);
        var rw = document.getElementById("panelRow");
        rw.appendChild(this.colElement);
    }
    return Panel;
}());
var Timer = /** @class */ (function () {
    function Timer(counter) {
        if (counter === void 0) { counter = 0; }
        this.counter = counter;
        this.colElement = document.createElement("div");
        this.colElement.setAttribute("class", "col-4 text-center");
        this.head = document.createElement("h3");
        this.head.innerText = "TIMER";
        this.colElement.appendChild(this.head);
        this.score1 = document.createElement("h3");
        this.score1.innerText = "0";
        this.colElement.appendChild(this.score1);
        var rw = document.getElementById("panelRow");
        rw.appendChild(this.colElement);
        var inter = this.change();
        inter();
    }
    Timer.prototype.change = function () {
        var _this = this;
        return function () {
            var k = 0;
            var f = 0;
            var intervalId = setInterval(function () {
                if (f === 0) {
                    var button = document.getElementById("btn" + 2);
                    button.disabled = true;
                    button = document.getElementById("GenerateBtn");
                    button.disabled = true;
                    f = 1;
                }
                if (flag1 === true) {
                    k = 0;
                    _this.counter = 59;
                    flag1 = false;
                }
                else if (flag2 === true) {
                    _this.counter = 59;
                    k = 1;
                    flag2 = false;
                }
                _this.score1.innerText = _this.counter.toString();
                _this.counter = _this.counter + 1;
                if (_this.counter === 60) {
                    _this.score1.innerText = _this.counter.toString();
                    _this.counter = 0;
                    k = k + 1;
                    if (k === 1) {
                        var button = document.getElementById("btn" + 1);
                        button.disabled = true;
                        button = document.getElementById("btn" + 2);
                        button.disabled = false;
                    }
                    if (k === 2) {
                        clearInterval(intervalId);
                        var button = document.getElementById("btn" + 2);
                        button.disabled = true;
                        button = document.getElementById("GenerateBtn");
                        button.disabled = false;
                    }
                }
            }, 1000);
        };
    };
    return Timer;
}());
var Table = /** @class */ (function () {
    function Table(teamNo) {
        this.teamNum = teamNo;
        this.parentColElement = document.createElement("div");
        this.parentColElement.setAttribute("class", "col-sm-12 col-md-6 col-lg-4 text-center");
        this.table = document.createElement("table");
        this.table.setAttribute("class", "table table-bordered");
        this.table.setAttribute("id", "table" + this.teamNum);
        this.tHead = document.createElement("thead");
        this.tRow = document.createElement("tr");
        this.h5El = document.createElement("h5");
        this.h5El.innerText = "TEAM " + this.teamNum + " SCORE BOARD";
        //creating the Table Head
        for (var i = 0; i < 8; i++) {
            this.th = document.createElement("th");
            this.th.setAttribute("scope", "col");
            if (i === 0)
                this.th.innerText = "TEAM " + this.teamNum;
            else if (i === 7)
                this.th.innerText = "Total";
            else
                this.th.innerText = "B" + i;
            this.tRow.appendChild(this.th);
        }
        this.tHead.appendChild(this.tRow);
        this.table.appendChild(this.tHead);
        //creating the Table Body
        this.tBody = document.createElement("tbody");
        for (var i = 1; i <= 10; i++) {
            this.tRow = document.createElement("tr");
            this.tRow.setAttribute("id", "player" + i);
            for (var j = 0; j < 8; j++) {
                if (j === 0) {
                    this.th = document.createElement("th");
                    this.th.setAttribute("scope", "row");
                    this.th.setAttribute("id", this.teamNum + "Player" + i);
                    this.th.innerText = "Player" + i;
                    this.tRow.appendChild(this.th);
                }
                else if (j === 7) {
                    this.tData = document.createElement("td");
                    this.tData.setAttribute("id", this.teamNum + "Total" + i);
                    this.tRow.appendChild(this.tData);
                }
                else {
                    this.tData = document.createElement("td");
                    this.tData.setAttribute("id", this.teamNum + "" + i + j);
                    this.tRow.appendChild(this.tData);
                }
            }
            this.tBody.appendChild(this.tRow);
        }
        this.table.appendChild(this.tBody);
        //appending Table and h3 Element to parent Column Element 
        this.parentColElement.appendChild(this.h5El);
        this.parentColElement.appendChild(this.table);
        var tableRow = document.getElementById("tableRow");
        tableRow.appendChild(this.parentColElement);
        this.indexi = 1; //indexi is the row wise iterating index
        this.indexj = 1; //indexj is the column wise iterating index
        this.grandTotal = 0;
        this.total = 0; //total is the current total of the player of a particular row
        var button = document.getElementById("btn" + this.teamNum);
        this.count = 1;
        var handleClick = this.handleBtnEvent();
        button.addEventListener("click", handleClick);
    }
    Table.prototype.handleBtnEvent = function () {
        var _this = this;
        return function () {
            var randomNumGenerator = function (min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            };
            var randomNum = randomNumGenerator(0, 6);
            //console.log(randomNum);
            var button = document.getElementById("btn" + _this.teamNum);
            if (button.disabled === false && _this.indexi < 11) {
                if (randomNum !== 0) {
                    if (_this.indexj === 1) {
                        _this.total = 0;
                    }
                    if (_this.indexj < 7) {
                        //getting the particular cell of the table
                        var td = document.getElementById(_this.teamNum + "" + _this.indexi + _this.indexj);
                        td.innerText = randomNum.toString();
                        _this.total = _this.total + randomNum;
                        _this.indexj++;
                        //updating the grand total for that paricular team
                        _this.grandTotal = _this.grandTotal + randomNum;
                        var sc = document.getElementById("sc" + _this.teamNum);
                        sc.innerText = _this.grandTotal.toString();
                    }
                    else {
                        var td = document.getElementById(_this.teamNum + "Total" + _this.indexi);
                        td.innerText = _this.total.toString();
                        //finding the score of the man of the match player and the number of that player
                        if (_this.teamNum === 1) {
                            if (MvpT1 < _this.total) {
                                //console.log(this.total)
                                MvpT1 = _this.total;
                                playerNum1 = _this.indexi;
                            }
                        }
                        else {
                            if (MvpT2 < _this.total) {
                                //console.log(this.total)
                                MvpT2 = _this.total;
                                playerNum2 = _this.indexi;
                            }
                        }
                        _this.indexi++;
                        _this.indexj = 1;
                    }
                }
                else if (randomNum === 0 && _this.indexi < 11) {
                    //getting the particular cell of the table
                    var td = document.getElementById(_this.teamNum + "" + _this.indexi + _this.indexj);
                    td.innerText = randomNum.toString();
                    var fd = document.getElementById(_this.teamNum + "Total" + _this.indexi);
                    //console.log(td);
                    if (_this.indexj > 1) {
                        fd.innerText = _this.total.toString();
                        //updating grand Total if it is not 1st column index and Random number == 0
                        _this.grandTotal = _this.grandTotal + randomNum;
                        var sc = document.getElementById("sc" + _this.teamNum);
                        sc.innerText = _this.grandTotal.toString();
                    }
                    _this.total = 0;
                    if (_this.indexj === 1) {
                        fd.innerText = _this.total.toString();
                        //updating grand Total if it is 1st column index and Random number == 0
                        _this.grandTotal = _this.grandTotal + randomNum;
                        var sc = document.getElementById("sc" + _this.teamNum);
                        sc.innerText = _this.grandTotal.toString();
                    }
                    _this.indexi++;
                    _this.indexj = 1;
                }
                //if row index has gone out of bounds i.e more than 10 rows
                if (_this.indexi > 10) {
                    button.disabled = true;
                    if (_this.teamNum === 1) {
                        flag1 = true;
                    }
                    else if (_this.teamNum === 2) {
                        flag2 = true;
                    }
                    //Storing the grand Totals
                    if (_this.teamNum === 1) {
                        score1 = _this.grandTotal;
                    }
                    else {
                        score2 = _this.grandTotal;
                    }
                }
            }
            //end of if
        };
    };
    return Table;
}());
var MidPanel = /** @class */ (function () {
    function MidPanel() {
        //creating parent column element
        this.colElement = document.createElement("div");
        this.colElement.setAttribute("class", "col-sm-12 col-md-6 col-lg-4 text-center");
        this.h5El1 = document.createElement("h5");
        this.h5El1.innerText = "MATCH WON BY";
        this.winnerTeam1stEl = document.createElement("h5");
        this.winnerTeam1stEl.setAttribute("id", "winner1");
        this.colElement.appendChild(this.h5El1);
        this.colElement.appendChild(this.winnerTeam1stEl);
        this.hrEl = document.createElement("hr");
        this.winnerPlayer = document.createElement("h5");
        this.winnerPlayer.setAttribute("id", "winnerP");
        this.winnerTeam2ndEl = document.createElement("h5");
        this.winnerTeam2ndEl.setAttribute("id", "winner2");
        this.winnerScore = document.createElement("h5");
        this.winnerScore.setAttribute("id", "winnerS");
        this.colElement.appendChild(this.hrEl);
        this.h5El2 = document.createElement("h5");
        this.h5El2.innerText = "MAN OF THE MATCH";
        this.colElement.appendChild(this.h5El2);
        this.colElement.appendChild(this.winnerPlayer);
        this.colElement.appendChild(this.winnerTeam2ndEl);
        this.colElement.appendChild(this.winnerScore);
        this.hrEl.style.width = "50%";
        this.hrEl.style.margin = "0 auto";
        var rw = document.getElementById("tableRow");
        rw.appendChild(this.colElement);
    }
    return MidPanel;
}());
var GamePlay = /** @class */ (function () {
    function GamePlay() {
        new Panel(1, 0, 1);
        new Timer();
        new Panel(2, 0, 2);
        new Table(1);
        new MidPanel();
        new Table(2);
    }
    return GamePlay;
}());
new GamePlay();
var Gbutton = document.getElementById("GenerateBtn");
var handleGbuttonClick = function () {
    if (score1 > score2) {
        maxScore = score1;
    }
    else {
        maxScore = score2;
    }
    if (score1 === maxScore) {
        winnerTeam = 1;
        ManOfTheMatchPlayerNum = playerNum1;
        ManOfTheMatchScore = MvpT1;
    }
    if (score2 === maxScore) {
        winnerTeam = 2;
        ManOfTheMatchPlayerNum = playerNum2;
        ManOfTheMatchScore = MvpT2;
    }
    // console.log(score1);
    // console.log(score2);
    // console.log(maxScore);
    var winner1 = document.getElementById("winner1");
    winner1.innerText = "TEAM" + winnerTeam;
    var player = document.getElementById("winnerP");
    player.innerText = "PLAYER" + ManOfTheMatchPlayerNum;
    var winner2 = document.getElementById("winner2");
    winner2.innerText = "TEAM " + winnerTeam;
    var winScore = document.getElementById("winnerS");
    winScore.innerText = "SCORE: " + ManOfTheMatchScore;
};
Gbutton.addEventListener("click", handleGbuttonClick);
