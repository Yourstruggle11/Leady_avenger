//select all require elements and other things
var score = document.querySelector(".score");
var play_area = document.querySelector(".play_area");
var start_screen = document.querySelector(".start_screen");
var avengerDebolina = document.querySelector("#avengerDebolina");
var villain = document.querySelectorAll(".villain");
var theme = new Audio("../audio/theme.mp3");
var fire = new Audio("../audio/fire.mp3");
var hit = new Audio("../audio/hit.mp3");
var over = new Audio("../audio/over.mp3")
//




start_screen.addEventListener("click", start);

//creating object for moving the avenger
let forMoving = {
    ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false, b: false
}
//

let avenger = { speed: 5, score: 0 }
let play = {}

//creating function for move the avenger
document.addEventListener("keydown", (e) => {
    e.preventDefault();
    forMoving[e.key] = true;
    //console.log(forMoving);


});
document.addEventListener("keyup", (e) => {
    e.preventDefault();
    forMoving[e.key] = false;
    //console.log(forMoving);

});
//


//make for each loop to look road moving
function moveLines() {
    var roadLines = document.querySelectorAll(".roadLines");
    roadLines.forEach(function (RL) {
        if (RL.x <= -100) {
            RL.x += 1600
        }
        RL.x -= avenger.speed;
        RL.style.left = RL.x + "px";
    })
}
//

//make for each loop to look villain moving
function moveVillain() {
    var villain = document.querySelectorAll(".villain");
    villain.forEach(function (item) {
        if (item.x <= -50) {
            item.x = 1600
            item.style.top = Math.floor(Math.random() * 350) + "px";
        }
        if(avenger.score > 2000){
            item.x -= 10;
        item.style.left = item.x + "px";
        }
        else{
            item.x -= 6;
        item.style.left = item.x + "px";
        }
        
    })
}
//
function endgame(){
    over.play();
    play.start = false;
    theme.pause();
};
function playGame() {
    if (play.start) {
        moveLines();
        moveVillain();
        theme.play();
        //make function detect hit between heroine and dinosaur
        var villain = document.querySelectorAll(".villain");
        var avengerDebolina = document.querySelector("#avengerDebolina");
        villain.forEach(function (curr) {
            var bRect = curr.getBoundingClientRect();
            var aRect = avengerDebolina.getBoundingClientRect();
            if(!(aRect.bottom < bRect.top||aRect.top > bRect.bottom || aRect.left > bRect.right || aRect.right < bRect.left)){
               endgame();
               
                start_screen.classList.remove("hide");
                start_screen.innerHTML = `Hey that was great keep it up <br> Your final score is : ${avenger.score} <br> Click here to replay the game`
                avenger.score = -1;
            }
        })
        //

                //make function detect hit between bullet and dinosaur
                var villain = document.querySelectorAll(".villain");
                var bullet = document.querySelectorAll(".bullet");
                villain.forEach(function (currbul) {
                    var bRect = currbul.getBoundingClientRect();

                    bullet.forEach(function (currvill) {
                        var aRect = currvill.getBoundingClientRect();
                        if(!(aRect.bottom < bRect.top||aRect.top > bRect.bottom || aRect.left > bRect.right || aRect.right < bRect.left)){
                            hit.play();
                            console.log("boom");
                            document.querySelector("#bull").classList.remove("bullet");
                            currbul.classList.add("hide")
                            setTimeout(function(){
                                currbul.classList.remove("hide");
                            }, 1400)
                            
                        }
                    })

                })
                //


        //console.log("hi")
        var avengerDebolinaTop = document.querySelector("#avengerDebolina").offsetTop;
        var avengerDebolinaleft = document.querySelector("#avengerDebolina").offsetLeft;
        var avengerDebolina = document.querySelector("#avengerDebolina");
        if (forMoving.ArrowUp) {
            if (avengerDebolinaTop > -10) {
                avengerDebolina.style.top = avengerDebolinaTop - avenger.speed + "px";
            }
        }
        if (forMoving.ArrowDown) {
            if (avengerDebolinaTop <= 380) {
                avengerDebolina.style.top = avengerDebolinaTop + avenger.speed + "px";
            }
        }
        if (forMoving.ArrowLeft) {
            if (avengerDebolinaleft > 10) {
                avengerDebolina.style.left = avengerDebolinaleft - avenger.speed + "px";
            }
        }
        if (forMoving.ArrowRight) {
            if (avengerDebolinaleft <= 1200) {
                avengerDebolina.style.left = avengerDebolinaleft + avenger.speed + "px";
            }
        }

        if(forMoving.b){
            document.querySelector("#bull").classList.add("bullet");
            fire.play();
            setTimeout(function(){
                document.querySelector("#bull").classList.remove("bullet")
            }, 1000)
          //  document.querySelector("#bull").classList.remove("bullet")
        }

        window.requestAnimationFrame(playGame);
        avenger.score++
        document.querySelector(".score").innerHTML = `YOUR SCORE: ${avenger.score}`;

    }










}


function start() {
   
    //creating hero charecter
    start_screen.classList.add("hide");
    play_area.innerHTML = "";
    play.start = true;
    window.requestAnimationFrame(playGame);
    var avenger = document.createElement("div");
    avenger.setAttribute("id", "avengerDebolina");
    play_area.appendChild(avenger);
    var details_of_playArea = play_area.getBoundingClientRect();
    //

    //  create bullet to destroy enemy
     var avengerDebolina =document.querySelector("#avengerDebolina");
     var power = document.createElement("div");
     power.setAttribute("class", "bullet");
     power.setAttribute("id", "bull")
     avengerDebolina.appendChild(power);
     document.querySelector("#bull").classList.remove("bullet")
    //

    //make for loop to create road lines
    for (var i = 0; i < 8; i++) {
        var roadLines = document.createElement("div");
        roadLines.setAttribute("class", "roadLines");
        play_area.appendChild(roadLines);
        roadLines.x = i * 200;
        roadLines.style.left = roadLines.x + "px";
    }
    //

    //make foor loop to create villain
    for (var i = 1; i < 4; i++) {
        var villain = document.createElement("div");
        villain.setAttribute("class", "villain");
        villain.setAttribute("id", "maut");
        play_area.appendChild(villain);
        villain.x = i * 450
        villain.style.left = villain.x + "px"
        villain.style.top = Math.floor(Math.random() * 350) + "px";

    }
    //

}







