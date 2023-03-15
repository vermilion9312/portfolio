let me = "";
let com = "";
let list = [];
let turn = true;
let game = 0;

function selectPlayer(player) {
    me = player;
    if(me == "O") {
        com = "X";
    } else {
        com = "O";
    }
    
    // 화면 지우기
    document.querySelector("#mainTable").remove();

    init();
}

function drawHeader() {
    let $headerTable = document.createElement("table");
    $headerTable.id = "headerTable";

    let $tr = document.createElement("tr");

    let $td = document.createElement("td");
    $tr.append($td);
    $headerTable.append($tr);

    document.querySelector("#gameTableTd").append($headerTable);
}


function drawTurnTable() {
    let $turnTable = document.createElement("table");
    $turnTable.id = "turnTable";

    let $tr = document.createElement("tr");

    let $td = document.createElement("td");
    let $playerBtn = document.createElement("button");
    $playerBtn.classList = "playerBtn";
    $playerBtn.innerText = "O's Turn";
    $td.append($playerBtn);
    $tr.append($td);
    
    $td = document.createElement("td");
    $playerBtn = document.createElement("button");
    $playerBtn.classList = "playerBtn";
    $playerBtn.innerText = "X's Turn";
    $td.append($playerBtn);
    $tr.append($td);
    
    $turnTable.append($tr);

    document.querySelector("#gameTableTd").append($turnTable);
}

function drawContentTable() {
    let $contentTable = document.createElement("table");
    $contentTable.id = "contentTable";

    for(let i=0; i<3; i++) {
        let $tr = document.createElement("tr");

        let $td = document.createElement("td");
        $td.classList = "block";
        $tr.append($td);
        $td = document.createElement("td");
        $td.classList = "spaceBlock";
        $tr.append($td);

        $td = document.createElement("td");
        $td.classList = "block";
        $tr.append($td);
        $td = document.createElement("td");
        $td.classList = "spaceBlock";
        $tr.append($td);
        
        $td = document.createElement("td");
        $td.classList = "block";
        $tr.append($td);
        $contentTable.append($tr);

        //-----------------------------------

        $tr = document.createElement("tr");
        $td = document.createElement("td");
        $td.classList = "spaceBlock";
        $td.colSpan = "3";
        $tr.append($td);
        $contentTable.append($tr);

        //-----------------------------------

        document.querySelector("#gameTableTd").append($contentTable);
    }

}

function init() {
    drawHeader();
    drawTurnTable();
    drawContentTable();

    for(let i=0; i<5; i++) {
        let temp = [0, 3, 0, 3, 0];
        list.push(temp);
    }

    if(me == "O") {
        document.querySelectorAll(".playerBtn")[0].style.backgroundColor = "tomato";
        com = "X";
    } else {
        document.querySelectorAll(".playerBtn")[1].style.backgroundColor = "tomato";
        com = "O";
    }

    let blockList = document.querySelectorAll(".block");
    for(let i=0; i<blockList.length; i++) {
        blockList[i].addEventListener("click", mark);
    }
}

function mark(e) {
    let $turnTable = document.createElement("table");
    $turnTable.id = "turnTable";
    let $contentTable = document.querySelector("#contentTable");

    let y = 0;
    let x = 0;
    for(let i=0; i<5; i++) {
        for(let j=0; j<5; j++) {
            if(e.target == $contentTable.children[i].children[j]) {
                y = i;
                x = j;
            }
        }
    }

    if($contentTable.children[y].children[x].innerText == "") {

        if(document.querySelectorAll(".playerBtn")[0].style.backgroundColor == "") {
            document.querySelectorAll(".playerBtn")[0].style.backgroundColor = "tomato";
            document.querySelectorAll(".playerBtn")[1].style.backgroundColor = "";

            list[y][x] = 2;
        } else {
            document.querySelectorAll(".playerBtn")[0].style.backgroundColor = "";
            document.querySelectorAll(".playerBtn")[1].style.backgroundColor = "tomato";
            
            list[y][x] = 1;
        }

        console.log(list);

        if(turn) {
            $contentTable.children[y].children[x].innerText = me;
        } else {
            $contentTable.children[y].children[x].innerText = com;
        }

        $contentTable.children[y].children[x].style.fontSize = "80px";
        $contentTable.children[y].children[x].style.fontWeight = "bold";
        $contentTable.children[y].children[x].style.color = "tomato";

        turn = !turn;
    }

    let result = checkWin();
    if(result == 1) {
        document.querySelector("#headerTable").innerText = "Player O won the game!";
        removeEvent();
        document.querySelector("#replayBtn").style.display = "block";
    } else if(result == 2) {
        document.querySelector("#headerTable").innerText = "Player X won the game!";
        removeEvent();
        document.querySelector("#replayBtn").style.display = "block";
    }

}

function removeEvent() {
    let blockList = document.querySelectorAll(".block");
    for(let i=0; i<blockList.length; i++) {
        blockList[i].removeEventListener("click", mark);
        blockList[i].style.cursor = "auto";
    }
}

function checkWin() {

    let win1 = false;
    let win2 = false;
    
    // 가로 검사
    for(let i=0; i<5; i++) {
        let count1 = 0;
        let count2 = 0;
        for(let j=0; j<5; j++) {
            if(list[i][j] == 1) {
                count1 += 1;
            }
            if(list[i][j] == 2) {
                count2 += 1;
            }
        }
        if(count1 == 3) {
            win1 = true;
        }
        if(count2 == 3) {
            win2 = true;
        }
    }

    // 세로 검사
    for(let i=0; i<5; i++) {
        let count1 = 0;
        let count2 = 0;
        for(let j=0; j<5; j++) {
            if(list[j][i] == 1) {
                count1 += 1;
            }
            if(list[j][i] == 2) {
                count2 += 1;
            }
        }
        if(count1 == 3) {
            win1 = true;
        }
        if(count2 == 3) {
            win2 = true;
        }
    }

    // 대각선 / 검사
    if(list[0][4] == 1 && list[2][2] == 1 && list[4][0] == 1) {
        win1 = true;
    }
    if(list[0][4] == 2 && list[2][2] == 2 && list[4][0] == 2) {
        win2 = true;
    }
    // 대각선 \ 검사
    if(list[0][0] == 1 && list[2][2] == 1 && list[4][4] == 1) {
        win1 = true;
    }
    if(list[0][0] == 2 && list[2][2] == 2 && list[4][4] == 2) {
        win2 = true;
    }

    if(win1) {
        game = 1;
    }
    if(win2) {
        game = 2;
    }

    return game;
}

function replay() {
    location.href="index.html";
}
