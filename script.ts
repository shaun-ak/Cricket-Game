var score1:number;      //score of Team 1
var score2:number;      //score of Team 2
var maxScore:number;
var MvpT1=0;            //Score of Most valuable player in Team 1
var MvpT2=0;            //Score of Most valuable player in Team 2
var ManOfTheMatchScore=0;
var winnerTeam:number;
var playerNum1:number;
var playerNum2:number;
var ManOfTheMatchPlayerNum:number;
var flag1=false;
var flag2=false;

class Panel{
    teamNum:number;
    score:number;
    btnNum:number;
    colElement:HTMLElement;
    h3Element1:HTMLElement;
    h3Element2:HTMLElement;
    btnElement:HTMLElement;

    constructor(teamNo:number,sc:number,btnNo:number){
        this.teamNum=teamNo;
        this.score=sc;
        this.btnNum=btnNo;
        this.colElement=document.createElement("div");
        this.colElement.setAttribute("class","col-4 text-center");
        
        this.h3Element1=document.createElement("h3");
        this.h3Element1.innerText="TEAM "+this.teamNum+" SCORE";

        this.h3Element2=document.createElement("h3");
        this.h3Element2.setAttribute("id","sc"+this.teamNum);
        this.h3Element2.innerText=this.score.toString();

        this.btnElement=document.createElement("button");
        this.btnElement.setAttribute("class","btn btn-primary");
        this.btnElement.innerText="Hit"+this.btnNum;
        this.btnElement.setAttribute("id","btn"+this.btnNum);

        this.colElement.appendChild(this.h3Element1);
        this.colElement.appendChild(this.h3Element2);
        this.colElement.appendChild(this.btnElement);

        let rw=document.getElementById("panelRow");
        rw.appendChild(this.colElement);
    }
}

class Timer{
    head:HTMLElement;
    colElement:HTMLElement;
    score1:HTMLElement;
    constructor(public counter=0){
        this.colElement=document.createElement("div");
        this.colElement.setAttribute("class","col-4 text-center");

        this.head=document.createElement("h3");
        this.head.innerText="TIMER";
        this.colElement.appendChild(this.head);

        this.score1=document.createElement("h3");
        this.score1.innerText="0";
        this.colElement.appendChild(this.score1);

        let rw=document.getElementById("panelRow");
        rw.appendChild(this.colElement);

        let inter=this.change();
        inter();
        
    }

    change(): () => void{
        return () => {
            let k=0;
            let f=0;
            let intervalId = setInterval(() => {
                if(f===0){
                    let button=<HTMLButtonElement>document.getElementById("btn"+2);
                    button.disabled=true;
                    button=<HTMLButtonElement>document.getElementById("GenerateBtn");
                    button.disabled=true;
                    f=1;
                }
                if(flag1===true){
                    k=0;
                    this.counter=59;
                    flag1=false;
                }else if(flag2===true){
                    this.counter=59;
                    k=1;
                    flag2=false;
                }

                this.score1.innerText=this.counter.toString();
                this.counter = this.counter+1;
                if(this.counter === 60){
                    this.score1.innerText=this.counter.toString();
                    this.counter=0;
                    k=k+1;
                    if(k === 1){
                        let button=<HTMLButtonElement>document.getElementById("btn"+1);
                        button.disabled=true;
                        button=<HTMLButtonElement>document.getElementById("btn"+2);
                        button.disabled=false;
                    }
                    if(k === 2){
                        clearInterval(intervalId);
                        let button=<HTMLButtonElement>document.getElementById("btn"+2);
                        button.disabled=true;
                        button=<HTMLButtonElement>document.getElementById("GenerateBtn");
                        button.disabled=false;
                    }
                }
            },1000)
        }
    }
}

class Table{
    parentColElement:HTMLElement;
    teamNum:number;
    col:HTMLElement;
    row:HTMLElement;
    tHead:HTMLElement;
    table:HTMLElement;
    tRow:HTMLElement;
    th:HTMLElement;
    tBody:HTMLElement;
    tData:HTMLElement;
    count:number;
    total:number;
    indexi:number;
    indexj:number;
    grandTotal:number;
    h5El:HTMLElement;

    constructor(teamNo:number){
        this.teamNum=teamNo;

        this.parentColElement=document.createElement("div");
        this.parentColElement.setAttribute("class","col-sm-12 col-md-6 col-lg-4 text-center")
        this.table = document.createElement("table");
        this.table.setAttribute("class","table table-bordered");
        this.table.setAttribute("id","table"+this.teamNum);
        this.tHead = document.createElement("thead");
        this.tRow = document.createElement("tr");
        this.h5El = document.createElement("h5");
        this.h5El.innerText = "TEAM " + this.teamNum + " SCORE BOARD"

        //creating the Table Head
        for(let i=0;i<8;i++){
            this.th = document.createElement("th");
            this.th.setAttribute("scope","col");
            if(i===0)
                this.th.innerText = "TEAM "+this.teamNum;
            else if(i === 7)
                this.th.innerText = "Total";
            else
                this.th.innerText = "B" + i;
            this.tRow.appendChild(this.th);
        }
        this.tHead.appendChild(this.tRow);
        this.table.appendChild(this.tHead);

        //creating the Table Body
        this.tBody = document.createElement("tbody");
        for(let i=1;i<=10;i++){
            this.tRow = document.createElement("tr");
            this.tRow.setAttribute("id","player"+i);

            for(let j=0;j<8;j++){
                if(j===0){
                    this.th=document.createElement("th");
                    this.th.setAttribute("scope","row");
                    this.th.setAttribute("id",this.teamNum+"Player"+i);
                    this.th.innerText="Player" + i;
                    this.tRow.appendChild(this.th);
                }else if(j===7){
                    this.tData=document.createElement("td");
                    this.tData.setAttribute("id",this.teamNum+"Total"+i);
                    this.tRow.appendChild(this.tData);
                }else{
                    this.tData=document.createElement("td");
                    this.tData.setAttribute("id",this.teamNum+""+i+j);
                    this.tRow.appendChild(this.tData);
                }
            }
            this.tBody.appendChild(this.tRow);
        }
        this.table.appendChild(this.tBody);

        //appending Table and h3 Element to parent Column Element 
        this.parentColElement.appendChild(this.h5El);
        this.parentColElement.appendChild(this.table);

        let tableRow = document.getElementById("tableRow");
        tableRow.appendChild(this.parentColElement);
        this.indexi=1;                                  //indexi is the row wise iterating index
        this.indexj=1;                                  //indexj is the column wise iterating index
        this.grandTotal=0;
        this.total=0;                                   //total is the current total of the player of a particular row

        let button =<HTMLButtonElement>document.getElementById("btn"+this.teamNum);
        this.count=1;
        let handleClick = this.handleBtnEvent();        
        button.addEventListener("click",handleClick);

        
    }

    handleBtnEvent() : ()  => void{
        return () => {
            let randomNumGenerator = (min:number,max:number) => {
                return Math.floor(Math.random() * (max - min +1))+min;
            }
            let randomNum = randomNumGenerator(0,6);
            //console.log(randomNum);
            let button=<HTMLButtonElement>document.getElementById("btn"+this.teamNum);

            if(button.disabled===false && this.indexi<11){
                if(randomNum !== 0){
                    if(this.indexj===1){
                        this.total=0;
                    }

                    if(this.indexj < 7){
                        //getting the particular cell of the table
                        let td = document.getElementById(this.teamNum+""+this.indexi+this.indexj);
                        td.innerText=randomNum.toString();
                        this.total=this.total + randomNum;
                        this.indexj++;

                        //updating the grand total for that paricular team
                        this.grandTotal=this.grandTotal+randomNum;
                        let sc=document.getElementById("sc"+this.teamNum);
                        sc.innerText=this.grandTotal.toString();
                    }else{
                        let td = document.getElementById(this.teamNum+"Total"+this.indexi);
                        td.innerText = this.total.toString();
                        //finding the score of the man of the match player and the number of that player
                        if(this.teamNum===1){
                            if(MvpT1<this.total){
                                //console.log(this.total)
                                MvpT1 = this.total;
                                playerNum1=this.indexi;
                            }
                        }else{
                            if(MvpT2<this.total){
                                //console.log(this.total)
                                MvpT2 = this.total;
                                playerNum2=this.indexi;
                            }
                        }

                        this.indexi++;
                        this.indexj=1;  
                    }

                }else if(randomNum === 0 && this.indexi<11){
                    //getting the particular cell of the table
                    let td = document.getElementById(this.teamNum+""+this.indexi+this.indexj);
                    td.innerText=randomNum.toString();
                    let fd = document.getElementById(this.teamNum+"Total"+this.indexi);
                    //console.log(td);

                    if(this.indexj>1){
                        fd.innerText = this.total.toString();

                        //updating grand Total if it is not 1st column index and Random number == 0
                        this.grandTotal=this.grandTotal+randomNum;
                        let sc=document.getElementById("sc"+this.teamNum);
                        sc.innerText=this.grandTotal.toString();
                    }
                    
                    this.total=0;
                    if(this.indexj===1){
                        fd.innerText = this.total.toString();

                        //updating grand Total if it is 1st column index and Random number == 0
                        this.grandTotal=this.grandTotal+randomNum;
                        let sc=document.getElementById("sc"+this.teamNum);
                        sc.innerText=this.grandTotal.toString();
                    }
                    this.indexi++;
                    this.indexj=1;
                } 

                //if row index has gone out of bounds i.e more than 10 rows
                if(this.indexi>10){
                    button.disabled=true;
                    if(this.teamNum===1){
                        flag1=true;
                    }else if(this.teamNum===2){
                        flag2=true;
                    }

                    //Storing the grand Totals
                    if(this.teamNum===1){
                        score1=this.grandTotal;
                    }
                    else{
                        score2=this.grandTotal;
                    }
                }  
            }
            //end of if
        }
    }
}

class MidPanel{
    colElement:HTMLElement;
    h5El1:HTMLElement;
    h5El2:HTMLElement;
    hrEl:HTMLElement;
    winnerTeam1stEl:HTMLElement;
    winnerTeam2ndEl:HTMLElement;
    winnerPlayer:HTMLElement;
    winnerScore:HTMLElement;
    constructor(){
        //creating parent column element
        this.colElement = document.createElement("div");
        this.colElement.setAttribute("class","col-sm-12 col-md-6 col-lg-4 text-center");

        this.h5El1 = document.createElement("h5");
        this.h5El1.innerText = "MATCH WON BY";
        this.winnerTeam1stEl = document.createElement("h5");
        this.winnerTeam1stEl.setAttribute("id","winner1");
        this.colElement.appendChild(this.h5El1);
        this.colElement.appendChild(this.winnerTeam1stEl);

        
        this.hrEl = document.createElement("hr");
        this.winnerPlayer = document.createElement("h5");
        this.winnerPlayer.setAttribute("id","winnerP");
        this.winnerTeam2ndEl = document.createElement("h5");
        this.winnerTeam2ndEl.setAttribute("id","winner2");
        this.winnerScore = document.createElement("h5");
        this.winnerScore.setAttribute("id","winnerS");


        this.colElement.appendChild(this.hrEl);
        this.h5El2 = document.createElement("h5");
        this.h5El2.innerText = "MAN OF THE MATCH";
        this.colElement.appendChild(this.h5El2);

       
        this.colElement.appendChild(this.winnerPlayer);
        this.colElement.appendChild(this.winnerTeam2ndEl);
        this.colElement.appendChild(this.winnerScore);
        this.hrEl.style.width = "50%";
        this.hrEl.style.margin = "0 auto";

        

        let rw = document.getElementById("tableRow");
        rw.appendChild(this.colElement);
    }
}

class GamePlay{
    constructor(){
        new Panel(1,0,1);
        new Timer();
        new Panel(2,0,2);

        new Table(1);
        new MidPanel();
        new Table(2);
    }
}

new GamePlay();

let Gbutton =<HTMLButtonElement>document.getElementById("GenerateBtn");
let handleGbuttonClick = () =>{
    if(score1>score2){
        maxScore=score1;
    }else{
        maxScore=score2;
    }
    if(score1===maxScore){
        winnerTeam = 1;
        ManOfTheMatchPlayerNum = playerNum1;
        ManOfTheMatchScore = MvpT1;
    }
    if(score2===maxScore){
        winnerTeam = 2;
        ManOfTheMatchPlayerNum = playerNum2;
        ManOfTheMatchScore =MvpT2;
    }

    // console.log(score1);
    // console.log(score2);
    // console.log(maxScore);

    let winner1 = document.getElementById("winner1");
    winner1.innerText = "TEAM"+winnerTeam;

    let player = document.getElementById("winnerP");
    player.innerText = "PLAYER"+ManOfTheMatchPlayerNum;

    let winner2 = document.getElementById("winner2");
    winner2.innerText = "TEAM "+winnerTeam;

    let winScore = document.getElementById("winnerS");
    winScore.innerText = "SCORE: "+ManOfTheMatchScore;
}

Gbutton.addEventListener("click",handleGbuttonClick);