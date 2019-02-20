//================================================================================
//Global Functions
let hide = () => {
    let x = document.getElementById("myDiv");
    x.style.display = "none";
  }

  let show = () =>{
    let y = document.getElementById("myDiv1");
    y.style.display = "grid";
  }

  let result = () =>{
    let z = document.getElementById("myDiv2");
    let y = document.getElementById("myDiv1");
    y.style.display = "none";
    z.style.display = "grid";
  }

  let nm = () =>{
      counter = 10;
      document.getElementById("ctr").innerHTML = counter;
}

  let hm = () =>{
      counter =5;
      document.getElementById("ctr").innerHTML = counter;
  }

  let refresh = () => {
      location.reload();
  }
//================================================================================

//Game Function
let game = {
    //global word arrays
    words: [
    "batman",
    "superman",
    "wolverine",
    "ironman",
    "captainamerica",
    "wonderwoman",
    "hulk",
    "thor",
    "vision",
    "captainmarvel",
    "deadpool",
    "spiderman",
    "flash",
    "hawkeye",
    "phoenix",
    "falcon",
    "antman"
    ],

    superpic: [
        "assets/img/superheros/bat.png",
        "assets/img/superheros/cap.png",
        "assets/img/superheros/flash.png",
        "assets/img/superheros/irn.png",
        "assets/img/superheros/spr.png",
        "assets/img/superheros/spr1.png",
        "assets/img/superheros/thor.png",
        "assets/img/superheros/ww.png"
    ],

    //Array used to store Wrong Letters
    wldArr: [""],

    //underscore display
    underDisplay: function(selectedWord) {
        let underDis = document.getElementById("underscore");
        let underArr = [];
        let rwsArr = selectedWord.split('');
        console.log("this is the underDisplay() and split rws: " + rwsArr);
            for(i=0; i < rwsArr.length;i++){
                underArr[i] = "_";
                // console.log(underscores);
            }
            
            underDis.innerHTML = underArr.join(" ");

        console.log("Inside Underscore Display Underarr: "+ underArr);
        console.log("Inside Underscore Display rwsArr: "+ rwsArr);
        return [underArr, rwsArr];
    },

    //Random Word Selector
    rws: function() {
        let randWordNum = Math.floor(Math.random()*this.words.length);
        console.log("this is from RWS Function: " + this.words[randWordNum]);
        return this.words[randWordNum];
        
        // console.log(selectedWord);
    },

    //wrong letter display and counter and hangman display
    wrongLD:  function(e, wordArr, undersArr) {
        let wld = document.getElementById("wgc");
        let ua = document.getElementById("underscore");
        let keyed = e.key.toLowerCase();
        
        let wrongNum = 0;
       
        //if statement to qualify that the game only registers letters and nothing else
        if(keyed.length === 1 && /[a-z]/.test(keyed)){
             //loop to replace all letters that are correct and count when letters aren't correct
            for(i=0; i<wordArr.length; i++){
                if(keyed === wordArr[i]){
                    undersArr[i] = wordArr[i];
                }
                else{
                    wrongNum++;
                }
            }
            ua.innerHTML = undersArr.join(" ");

            //tells if you got a letter wrong and counts down on your turns left
            if(wrongNum === wordArr.length){
                this.wldArr.push(keyed)
                counter--;
                wld.innerHTML = this.wldArr.join(" ");
                document.getElementById("ctr").innerHTML = counter;
            }
        }
        else{
            console.log("this key was pressed and is not one char: " + keyed);
        }
    },

    //will let you know if you win
    winChecker: function(wordArr, undersArr) {
        if(wordArr.join("") === undersArr.join("")){
            show();
            result();
            let wl = document.getElementById("winlose");
            let sh = document.getElementById("shResult");
            wl.innerHTML = "YOU WIN!"
            sh.innerHTML = "Congratulations!"
        }
    },

               //will let you know if you lose
    loseChecker: function(wordArr) {
        if(counter === 0){
        show();
        result();
        let wl = document.getElementById("winlose");
        let sh = document.getElementById("shResult");
        wl.innerHTML = "YOU LOSE!"
        sh.innerHTML = "The Superhero was " + selectedWord;
        }
    },

    //random pictures function
    rpf: function() {
        let num = Math.floor(Math.random()*this.superpic.length);
        document.getElementById("hmp").src = this.superpic[num];
    }

}


//================================================================================
//================================================================================
//MAIN PROCESS

//Mode Setting
let counter;
let heroNum = 5;
let selectedWord = game.rws();
let gameArray = game.underDisplay(selectedWord);
let underscoreArray = gameArray[0];
let wordArray = gameArray[1];
game.rpf();




document.onkeyup = function(e){
    game.wrongLD(e, wordArray, underscoreArray);
    game.winChecker(wordArray, underscoreArray);
    game.loseChecker(wordArray);
    //console.log(e.key);
    //console.log(counter);
}
