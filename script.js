//Variables
var cInput; //Current Input Value
var mainFunc;
var subFunc;
var arg;
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
const comSynt = [
    'log.[Text].[Storage Tag].[ID Number(optional)]',
    'read.[Storage Tag].[ID Number]',
    'edit.[Edit Type].[Text].[Storage Tag].[ID Number]',
    'del.[Storage Tag].[ID Number]',
    'copy.[Storage Tag].[ID Number]',
    'google.[Storage Tag].[ID Number]',
    'remind.[Remind Type].[Text].[DD/MM/YYYY]',
    'format.[Format Type].[Format Style]'
    ];
const errInp = "The function you have entered is not recognised or you have used the incorrect syntax. Type 'help' for a list of available functions.";
const errRead = ["Please enter a valid ID or 'all' to read a stored note.", "There isn't a note stored with the tag and ID you entered, please try again."];
const errEdi = "That is not a recognised edit mode, use help.edit for a list of available modes."
const errUnk = "Encountered an unknown error. Aborting the command...";
const errFor = ["That is not one of the recognised format options, use help.format for a list of available options.", "That is not a recognised setting for this option, please try again."];
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
    mainDiv.appendChild(lineNew);
    lineNew.setAttribute("class", "cInput")
    lineNew.setAttribute("autocomplete", "off")
    lineNew.focus();
    lineNew.setAttribute("spellcheck", "off");
    lineNew.setAttribute("onkeypress", "hitEnter()");


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
    } else if (mainFunc == 'format') {
        format(cInput);
    } else if (mainFunc == 'remind'){
        remind(cInput);
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
        for (var i = 0; i < comName.length; i++) {
            console.log(comName[i], flag.split('.')[1]);
            if (flag.split('.')[1] == comName[i]) {
                var helpText = "The syntax for the command you entered is: ";
                funcLine(helpText, msgType[1]);
                funcLine(comSynt[i], msgType[1]);
            }
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
    var mode = flag.split('.')[1];
    var text = flag.split('.')[2];
    tag = flag.split('.')[3];
    index = flag.split('.')[4];
    storageKey = tag + index;
    if (localStorage.getItem(storageKey) == null) {
        funcLine(errRead[0], msgType[2])
    } else {
        if (mode == 'a' || 'append') {
            text = localStorage.getItem(storageKey) + text;
            localStorage.setItem(storageKey, text);
        } else if (mode == 'p' || 'prepend') {
            text += localStorage.getItem(storageKey);
            localStorage.setItem(storageKey, text);
        } else if (mode == 'r' || 'replace') {
            localStorage.setItem(storageKey, text);
        } else {
            funcLine(errEdi, msgType[2])
        }
    }
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
    tag = flag.split('.')[1];
    index = flag.split('.')[2];
    storageKey = tag + index;
    var gText = localStorage.getItem(storageKey);
    gArray = gText.split("");
    var qURL = "";
    for (var i = 0; i < gArray.length; i++) {
        console.log(gArray[i])
        if (gArray[i] == " ") {
            gArray[i] = "+"
        }
        qURL += gArray[i];
    }
    gURL = "https://www.google.com/search?q=" + qURL;
    window.open(gURL);
}
function remind(flag) {
    var type = flag.split('.')[1];
    var text = flag.split('.')[2];
    var dateInp = flag.split('.')[3];
    if (type == 'log') {
        localStorage.setItem(dateF, text);
    } else if (type == 'read') {
        if (flag.split('.').length == 4) {
            var remText="Your reminder for"+dateInp+"is:";
            funcLine(remText,msgType[1]);
            funcLine(localStorage.getItem(dateInp),msgType[1]);
        } else if (flag.split('.').length == 3) {
            var today = new Date();
            var tomorrow=new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            var day=tomorrow.getDate().toString;
            var month=tomorrow.getMonth()+1;
            month=month.toString;
            var year=tomorrow.getFullYear().toString;
            var dateA = day+"/"+month+"/"+year;
            var remText="Your reminder for tommorow is: ";
            funcLine(remText,msgType[1]);
            funcLine(localStorage.getItem(dateA),msgType[1]);
        }
        else {
            funcLine(errInp,msgType[2]);
        }
    } else {
        funcLine(errInp,msgType[2]);
    }
}
function format(flag) {
    subFunc = flag.split('.')[1];
    arg = flag.split('.')[2];
    var docBody = document.getElementsByTagName("body")[0];
    var docIn = document.getElementsByTagName("input")[0];
    if (subFunc == 'bg') {
        if (arg == 'dark') {
            docBody.style.backgroundColor = "#10183b";
            docIn.style.textShadow = "ffffff";
        } else if (arg == 'light') {
            docBody.style.backgroundColor = "#ffffff";
            docIn.style.textShadow = "#10183b";
        }
        else {
            funcLine(errFor[1], msgType[2]);
        }
    } else {
        funcLine(errFor[0], msgType[2]);
    }
}

