var square = document.querySelector(".square");
var bnt0 = document.querySelector("#zero");
var bnt1 = document.querySelector("#one");
var bnt2 = document.querySelector("#two");
var bnt3 = document.querySelector("#three");
var bnt4 = document.querySelector("#four");
var bnt5 = document.querySelector("#five");
var bnt6 = document.querySelector("#six");
var bnt7 = document.querySelector("#seven");
var bnt8 = document.querySelector("#eight");
var bnt9 = document.querySelector("#nine");
var bnt10 = document.querySelector("#ten");
var trainBtn = document.querySelector("#train"); 
var startBtn = document.querySelector("#start");
var inputButtons2 = document.querySelector("#inputButtons");
var roundDisplay = document.querySelector("#rounds");
var roundDiv = document.querySelector("#roundDisplay");
var rateInput = 0;
var NewColor = 0;
var redPrecent = 0;
var greenPrecent = 0;
var bluePrecent = 0;
var colorData = [{input: [1, 0, 0], output: [1]}];
var roundNum = 0;

startBtn.addEventListener("click", function(){
    inputButtons2.style.visibility = "visible";
    startBtn.style.display = "none";
    roundDiv.style.visibility = "visible";
    rateInput = 0;
    buttonStuff()
})
// The input values from each of the ten input buttons
bnt0.addEventListener("click", function(){
    rateInput = 0;
    buttonStuff();
})
bnt1.addEventListener("click", function(){
    rateInput = 0.1;
    buttonStuff();
})
bnt2.addEventListener("click", function(){
    rateInput = 0.2;
    buttonStuff();
})
bnt3.addEventListener("click", function(){
    rateInput = 0.3;
    buttonStuff();
})
bnt4.addEventListener("click", function(){
    rateInput = 0.4;
    buttonStuff();
})
bnt5.addEventListener("click", function(){
    rateInput = 0.5;
    buttonStuff();
})
bnt6.addEventListener("click", function(){
    rateInput = 0.6;
    buttonStuff();
})
bnt7.addEventListener("click", function(){
    rateInput = 0.7;
    buttonStuff();
})
bnt8.addEventListener("click", function(){
    rateInput = 0.8;
    buttonStuff();
})
bnt9.addEventListener("click", function(){
    rateInput = 0.9;
    buttonStuff();
})
bnt10.addEventListener("click", function(){
    rateInput = 1;
    buttonStuff();
})

function buttonStuff(){
    neuralData();
    console.log("The color is rated at " + rateInput*100 + " precent red");
    colorSqure();
}

function colorSqure(){
    randomColor();
    square.style.backgroundColor = newColor;
}

// Creates random colors for the user to determine whether or not the color is closse to the color they want.
// The data created from the user decsion and the color value are then stored into the colorData array.
// This data will later be fed into the neural net. 
function randomColor(){
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    newColor = "rgb(" + r + ", " + g + ", " + b + ")";
    console.log("r" + r + " g" + g + " b"+ b);
    redPrecent = r/255;
    greenPrecent = g/255;
    bluePrecent = b/255;
    console.log("Red " + redPrecent + "%"+ " Green " + greenPrecent + "%"+" Blue " + bluePrecent + "%")
}


function neuralData(){
    colorData.push({input: [redPrecent, greenPrecent, bluePrecent], output: [rateInput]});
    runNet();
    roundNum = roundNum + 1;
    roundDisplay.textContent = roundNum;
    console.log(roundNum); 
    if(roundNum > 14){
        trainBtn.style.display = "unset";
    }   
}
 

//Neural Net !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
var net = new brain.NeuralNetwork();
var output = 0;
var trainClicked = false
//Once the train button is pressed the data the user inputed (Which is contained in the arr colorData) is feed to the neural net
// The net is then trained and ready to properly function. 
trainBtn.addEventListener("click", function(){
    net.train(colorData,{iterations: 20000, log: true, logPeriod: 100, learningRate: 0.01,});
    netChosesColor();
})

var output;
var testData = 0;
function runNet(){
    if(trainClicked === true){
        testData = colorData[roundNum].input
        output = net.run(testData);      
    }
}

// Create the color squares after the net has been trained.

var netColorSquare;
var tureColor;
var netColors = [];
var numberRuns = 0;
var numberOfSquares = 60;
var arrySquares = [];
var square2 = document.querySelectorAll(".square2");
var displayPrecentage = document.querySelectorAll(".precentAge");
var newSquare;
var newParagraph;
var numberSquareRuns = 0;

var outputExpectation = 0.65;
function netChosesColor(){
    for(var i =  0; i < numberOfSquares; i++){
        // Feeds random colors to the net. The net will give an output based off of the users inputs from the test
        // Once an output is over the outputExpectation amount the color is the convereted to RGB number (between 0 and 255).
        // The RGB number is then stored into the netColors arry.
        while( output <= outputExpectation){
            numberRuns = numberRuns + 1;
            var r = Math.floor(Math.random() * 256);
            var g = Math.floor(Math.random() * 256);
            var b = Math.floor(Math.random() * 256);
            console.log("r" + r + " g" + g + " b"+ b);
            redPrecent = r/255;
            greenPrecent = g/255;
            bluePrecent = b/255;
            netColorSquare = [redPrecent, greenPrecent, bluePrecent];
            output = net.run(netColorSquare);
            console.log("Trail: " + numberRuns + " Output: " + output);
            console.log("Current Color: " + netColorSquare);
            console.log("");
        }
        numberSquareRuns = numberSquareRuns + 1;
        numberRuns = 0;
        console.log("output: " + output);
        console.log("r" + r+ " g" + g + " b" + b);
        netColorSquare = "rgb(" + r + ", " + g + ", " + b + ")";
        console.log("Number of Runs: " + numberSquareRuns + " out of " + numberOfSquares);
        console.log("====================================================");
        netColors.push({ color: [netColorSquare], precentage: [Math.round(output * 100)]});
        output = 0;        
    }
    // This part of the function creates the colored squares that are going to be displayed at the bottom of the page. 
    for(var i = 0; i < numberOfSquares; i++){
        newSquare = document.createElement("div");
        newParagraph = document.createElement("p");
        newParagraph.appendChild(document.createTextNode(netColors[i].precentage + "%"));
        newSquare.appendChild(newParagraph);
        newSquare.setAttribute('class', 'square2');
        document.getElementById("main").appendChild(newSquare);
        newSquare.style.backgroundColor = netColors[i].color; 
    }
}


//Styling of the input buttons. Nothing really critical, just nice for the user to see.

var btnBackground = "#4CAF50"
var btnColor = "white";
var inputButtons = [bnt0, bnt1, bnt2, bnt3, bnt4, bnt5, bnt6, bnt7, bnt8, bnt9]
var numberOfButtons;

function styleButtons(){
    for(i = 0; i < numberOfButtons; i++){
        inputButtons[i].style.backgroundColor = btnBackground;
        inputButtons[i].style.color = btnColor;
    }
}
function unStyleButtons(){
    for(i = 0; i < numberOfButtons; i++){
        inputButtons[i].style.backgroundColor = "";
        inputButtons[i].style.color = "";
    }
}
bnt1.addEventListener("mouseover", function(){
    numberOfButtons = 1;
    styleButtons();
})
bnt1.addEventListener("mouseout", function(){
    numberOfButtons = 1;
    unStyleButtons();
})
bnt2.addEventListener("mouseover", function(){
    numberOfButtons = 2;
    styleButtons();
})
bnt2.addEventListener("mouseout", function(){
    numberOfButtons = 2;
    unStyleButtons();
})
bnt3.addEventListener("mouseover", function(){
    numberOfButtons = 3;
    styleButtons();
})
bnt3.addEventListener("mouseout", function(){
    numberOfButtons = 3;
    unStyleButtons();
})
bnt4.addEventListener("mouseover", function(){
    numberOfButtons = 4;
    styleButtons();
})
bnt4.addEventListener("mouseout", function(){
    numberOfButtons = 4;
    unStyleButtons();
})
bnt5.addEventListener("mouseover", function(){
    numberOfButtons = 5;
    styleButtons();
})
bnt5.addEventListener("mouseout", function(){
    numberOfButtons = 5;
    unStyleButtons();
})
bnt6.addEventListener("mouseover", function(){
    numberOfButtons = 6;
    styleButtons();
})
bnt6.addEventListener("mouseout", function(){
    numberOfButtons = 6;
    unStyleButtons();
})
bnt7.addEventListener("mouseover", function(){
    numberOfButtons = 7;
    styleButtons();
})
bnt7.addEventListener("mouseout", function(){
    numberOfButtons = 7;
    unStyleButtons();
})
bnt8.addEventListener("mouseover", function(){
    numberOfButtons = 8;
    styleButtons();
})
bnt8.addEventListener("mouseout", function(){
    numberOfButtons = 8;
    unStyleButtons();
})
bnt9.addEventListener("mouseover", function(){
    numberOfButtons = 9;
    styleButtons();
})
bnt9.addEventListener("mouseout", function(){
    numberOfButtons = 9;
    unStyleButtons();
})
bnt10.addEventListener("mouseover", function(){
    numberOfButtons = 10;
    styleButtons();
})
bnt10.addEventListener("mouseout", function(){
    numberOfButtons = 10;
    unStyleButtons();
})
