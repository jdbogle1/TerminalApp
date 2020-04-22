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
var lineOld;
var textNew;
var textOld;
var mainDiv;
var clas;
var syntax;
const comName = ['log', 'read', 'edit', 'del', 'copy', 'google']
const comSynt = ['log.[Text].[Storage Tag].[ID Number(optional)]','read.[Storage Tag].[ID Number(optional)]',
'edit.[Edit type].[Storage Tag].[ID Number]',
'del.[Storage Tag].[ID Number]']
//Non-Command Functions
function hitEnter() {
	//Gets inputed text and which character
	var x = event.which || event.keyCode;
	cInput = document.getElementsByClassName("cInput")[0].value;
	//Dynamic Input Length
	if (cInput.length > 0) {
		cLen = 10 + cInput.length * 7;
	} else {
		cLen = 17;
	}
	if (x == 08) {
		cLen -= 7;
	}
	inpWidth = cLen.toString() + "px";
	document.getElementsByClassName("cInput")[0].style.width = inpWidth;
	//Process Function
	if (x == 13) {
		//Append
		newLine();
		return 2;
	}
	return 1;
}
function blink() {
	//White
	if (blStat == 0) {
		document.getElementsByClassName("cInput")[0].style.borderRightColor = "#ffffff";
		blStat = 1
	}
	//Transparent 
	else {
		document.getElementsByClassName("cInput")[0].style.borderRightColor = "#00000000";
		blStat = 0;
	}
}
function newLine() {
	//Deletes old input
	pInput = document.getElementsByClassName("cInput")[0];
	pInput.remove();
	//Adds log of previous input
	lineOld = document.createElement("p");
	textOld = document.createTextNode(cInput);
	lineOld.append(textOld);
	lineOld.setAttribute("class", "log")
	mainDiv = document.getElementById("main");
	mainDiv.appendChild(lineOld);
	//Runs a function
	process(cInput);
	//Proceeds to next line
	lineNew = document.createElement("input");
	mainDiv.appendChild(lineNew)
	lineNew.setAttribute("class", "cInput")
	lineNew.setAttribute("autocomplete", "off")
	lineNew.focus();
	lineNew.setAttribute("spellcheck", "off")
	lineNew.setAttribute("onkeypress", "hitEnter()")


}
function process(flag) {
	try {
		//Determines which function is required
		mainFunc = flag.split('.')[0];
		console.log(mainFunc);
		if (mainFunc == 'log') {
			console.log("hello")
			log(cInput)
		} else if (mainFunc == 'help') {
			help(cInput)
		}
		//Occurs when the user inputs an unrecognised command
	} catch (err) {
		var error = "The function you have entered is not recognized or you have used the incorrect syntax. Type 'help' for a list of available functions.";
		clas = "error";
		funcLine(error, clas);
	}
}
function funcLine(text, clas) {
	//Output
	lineOld = document.createElement("p");
	textOld = document.createTextNode(text)
	lineOld.append(textOld);
	lineOld.setAttribute("class", clas)
	mainDiv = document.getElementById("main");
	mainDiv.appendChild(lineOld);
}

//Command Functions
function log(flag) {
	console.log("Logged:", flag.split('.')[1]);
	console.log("Storage Tag and ID:", flag.split('.')[2], flag.split('.')[3]);
}
function help(flag) {
	for (var i = 0; i < comName.length; i++) {
		var command = comName[i];
		syntax=
		clas = 'output'
		funcLine(command, clas)
	}
}
function read(flag) {

}
function edit(flag) {

}
function del(flag) {

}
function copy() {

}
function google() {

}

