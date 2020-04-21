//Variables
var cInput; //Current Input Value
var mainFunc;
var subFunc;
var mainArg;
var split;
var cLen = 10;
var blStat = 0;
var numLines = 1;
var pInput;
var lineNew;
//Functions
function hitEnter() {
	var x = event.which || event.keyCode;
	cInput = document.getElementById("cInput").value;
	//Dynamic Input Length
	if (cInput.length > 0) {
		cLen = 10 + cInput.length * 7;
	} else {
		cLen = 17;
	}
	inpWidth = cLen.toString() + "px";
	console.log(document.getElementById("cInput").style.width);
	document.getElementById("cInput").style.width = inpWidth;
	//Process Function
	if (x == 13) {
		//Append
		newLine();
		//Continue
		process(cInput);
		return 2;
	}
	return 1;
}
function blink() {
	if (blStat == 0) {
		document.getElementById("cInput").style.borderRightColor = "#ffffff";
		blStat = 1
	} else {
		document.getElementById("cInput").style.borderRightColor = "#00000000";
		blStat = 0;
	}
}
function newLine() {
	pInput = document.getElementById("cInput");
	pInput.remove();
	lineNew = document.createElement("p");
	lineNew.get;

}
function process(flag) {
	mainFunc = cInput.split('.')[0];
	subFunc = cInput.split('.')[1];
	mainArg = cInput.split('.')[2];
	if (mainFunc == 'log') {
		log(subFunc, mainArg)
	}
}

function log(flag, argument) {
	console.log(1)
}
