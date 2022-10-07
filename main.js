#!/usr/bin/env node
// process.argv returns the input string in the form of array that's why we have taken starting
// from 2 since the first two words are node and main.js
let inputarr=process.argv.slice(2);
let helpObj=require("./help.js");
let organizeObj=require("./organize.js");
//console.log(inputarr);t
// node main.js organize "DirectoryPath"
// node main.js help
let command=inputarr[0];
switch(command)
{
    case "organize":
    {
        organizeObj.organizeKey(inputarr[1]);
        break;
    }
    case "help":
    {
        helpObj.helpKey();
        break;
    }
    default:
    {
        console.log("Enter a valid command 👏");
    }
}
