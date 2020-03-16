
// I've seen versions of this problem that involve
// separating the string into separate lines,
// but from what I can tell, this function is
// only supposed to do one line. That's an assumption
// I made that I should have asked for clarification on
// sooner, my apologies.
function justifyText(str, length){

    var words = str.split(" "); // the reason I'm checking length this way is to account for
    var strLength = 0;          // a string like "test         string" with a lot of spaces
    for(var i = 0; i < words.length; i++){
        strLength += words[i].length;
    }

    if(strLength > length){ // here's where that assumption comes into play
        console.log("string is too long for input length");
        return "ERROR: string is too long for input length";
    }
    else{
        var wordsLength = words.length;
        var numGaps = wordsLength - 1;
        var extras = (length - strLength) % numGaps; // if we can't divide spaces up evenly between each word, this is how many we'll have left over
        var spacesPerGap = (length - strLength - extras) / numGaps;
        var newString = "";
        extraDistrubutionFreq = Math.floor(numGaps / extras);
        for(var i = 0; i < words.length; i++){
            if(i == (words.length - 1)){ // last word
                newString += words[i];
            }
            else{
                newString += words[i];
                for(var j = 0; j < spacesPerGap; j++){
                    newString += " ";
                }
                if(extras > 0 && i % extraDistrubutionFreq == 0){
                    newString += " ";
                    extras--;
                }
            }
        }
        console.log(newString);
        return newString;
    }
}