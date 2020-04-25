//Variables
var cInput; //Current Input Value
var mainFunc;
var subFunc;
var mainArg;
var split;
var cLen = 10;
var blStat = 0;
var copyID = 0;
var pInput;
var lineNew;
var lineOld;
var textNew;
var textOld;
var mainDiv;
var syntax;
const msgType = ["log", "output", "error"];
const comName = ['log', 'read', 'edit', 'del', 'copy', 'google', 'remind', 'format'];
const comSynt = ['log.[Text].[Storage Tag].[ID Number(optional)]',
    'read.[Storage Tag].[ID Number]',
    'edit.[Edit type].[Storage Tag].[ID Number]',
    'del.[Storage Tag].[ID Number]',
    'copy.[Storage Tag].[ID Number]',
    'google.[Storage Tag].[ID Number]',
    'format.[Format Type].[Format Style]'];
const errInp = "The function you have entered is not recognized or you have used the incorrect syntax. Type 'help' for a list of available functions.";
const errRead = ["Please enter a valid ID or 'all' to read a stored note.", "There isn't a note stored with the tag and ID you entered, please try again."];
const errUnk = "Encountered an unknown error. Aborting the command..."
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
    //Determines which function is required
    mainFunc = flag.split('.')[0];
    console.log(mainFunc);
    if (mainFunc == 'log') {
        log(cInput);
    } else if (mainFunc == 'read') {
        read(cInput);
    } else if (mainFunc == 'del') {
        del(cInput);
    } else if (mainFunc == 'help') {
        help(cInput);
    } else if (mainFunc == 'copy') {
        copy(cInput);
    } else if (mainFunc == 'google') {
        google(cInput);
    } else {
        //Occurs when the user inputs an unrecognised command
        funcLine(errInp, msgType[2]);
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
function getNote(flag) {
    //retrieves the text from the specified location
    storageKey = flag.split('.')[1] + flag.split('.')[2].toString();
    if (localStorage.getItem(storageKey) == null) {
        return 0;
    } else {
        return localStorage.getItem(storageKey)
    }
}

//Command Functions
function log(flag) {
    text = flag.split('.')[1];
    tag = flag.split('.')[2];
    if (localStorage.getItem(tag) == null) {
        index = 0;
    } else {
        if (flag.split('.').length < 4) {
            index = parseInt(localStorage.getItem(tag)) + 1;
        }
        else {
            index = parseInt(flag.split('.')[3]);
        }
    }
    storageKey = tag + index.toString();
    localStorage.setItem(tag, index);
    localStorage.setItem(storageKey, text)
    var storedText = "Your note has been stored with the tag: '" + tag + "' and the ID: " + index;
    funcLine(storedText, msgType[1]);
    console.log(localStorage.getItem(storageKey));
    console.log(localStorage.getItem(tag));
}
function help(flag) {
    com = flag.split('.')[1];
    if (flag.split('.').length == 2) {
        if (com == 'log') {
            var helpText = "The syntax for the command you entered is: ";
            funcLine(helpText, msgType[1]);
            funcLine(comSynt[0],msgType[1]);
        }
        for (var i = 0; i < comName.length; i++) {
            if (flag.split('.')[1] == i) {
                var helpText = "The syntax for the command you entered is: " + comSynt[i];
                funcLine(helpText, msgType[1])
            }
        }
    } else {
        for (var i = 0; i < comName.length; i++) {
            var command = comName[i];
            syntax =
                clas = 'output'
            funcLine(command, clas)
        }
    }

}
function read(flag) {
    var gotText;
    tag = flag.split('.')[1];
    index = parseInt(flag.split('.')[2]);
    if (Number.isNaN(index) && flag.split('.')[2] == "all") {
        gotText = "Retrived notes from: " + tag;
        funcLine(gotText, msgType[1]);
        for (var i = 0; i <= parseInt(localStorage.getItem(tag)); i++) {
            storageKey = tag + i.toString();
            text = localStorage.getItem(storageKey);
            funcLine(text, msgType[1])
        }
    } else if (Number.isInteger(index)) {
        if (localStorage.getItem(tag) == null) {
            funcLine(errRead[1], msgType[2]);
        } else {
            storageKey = tag + index.toString();
            text = localStorage.getItem(storageKey);
            gotText = "Retrived note from: " + storageKey;
            funcLine(gotText, msgType[1]);
            funcLine(text, msgType[1]);
        }
    } else {
        funcLine(errRead[0], msgType[2]);
    }
}
function edit(flag) {

}
function del(flag) {
    var delText;
    tag = flag.split('.')[1];
    index = parseInt(flag.split('.')[2]);
    if (Number.isNaN(index) && flag.split('.')[2] == "all") {
        delText = "Deleted all notes from: " + tag;
        funcLine(delText, msgType[1]);
        for (var i = 0; i <= parseInt(localStorage.getItem(tag)); i++) {
            storageKey = tag + i.toString();
            localStorage.removeItem(storageKey);
            localStorage.removeItem(tag);
        }
    }
    else if (Number.isInteger(index)) {
        if (localStorage.getItem(tag) == null) {
            funcLine(errRead[1], msgType[2]);
        } else {
            storageKey = tag + index.toString();
            localStorage.removeItem(storageKey);
            text = localStorage.getItem(storageKey);
            delText = "Deleted note from: " + storageKey;
            funcLine(gotText, msgType[1]);
        }
    } else {
        funcLine(errRead[0], msgType[2]);
    }

}
function copy(flag) {
    tag = flag.split('.')[1];
    index = flag.split('.')[2];
    storageKey = tag + index;
    funcLine("Copied: " + localStorage.getItem(storageKey), msgType[1]);
    var tempInput = document.createElement("input");
    tempInput.value = localStorage.getItem(storageKey);
    mainDiv = document.getElementById("main");
    mainDiv.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    mainDiv.removeChild(tempInput);
}
function google(flag) {
    // tag = flag.split('.')[1];
    // index = flag.split('.')[2];
    // storageKey = tag + index;
    // var gText=localStorage.getItem(storageKey);
    // gArray=gText.split("")
    // var qURL=""
    // for(var i=0;i<gArray.length();i++){
    //     if (gArray==" "){

    //     }
    // }
    // gURL="https://www.google.com/search?q="+
    // window.open("https://www.w3schools.com");
}
function remind() {

}
function format() {

}

