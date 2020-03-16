// I've seen versions of this problem before that involve
// separating the string into separate lines,
// but from what I can tell, this function is
// only supposed to do one line. That's an assumption
// I made that I should have asked for clarification on
// sooner, my apologies.
function justifyText(str, length){

    var re = new RegExp(" +"); // i admit I'm terrible at regex and have to look up everything all the time

    var words = str.split(re); // the reason I'm checking length this way is to account for
    var strLength = 0;          // a string like "test         string" with a lot of spaces
    for(var i = 0; i < words.length; i++){
        strLength += words[i].length;
    }
    var wordsLength = words.length;
    var numGaps = wordsLength - 1;

    if(strLength + numGaps > length){ // here's where that assumption comes into play
        console.log("string is too long for input length");
        return "ERROR: string is too long for input length";
    }
    else{
        var extras = (length - strLength) % numGaps; // if we can't divide spaces up evenly between each word, this is how many we'll have left over
        var spacesPerGap = (length - strLength - extras) / numGaps; // how many spaces each gap will get
        if(extras > 0){
            extraDistrubutionFreq = Math.floor(numGaps / extras); // calculating where to put the extra spaces
        }                                                          // so they're evenly distributed
        var newString = "";

        for(var i = 0; i < words.length; i++){
            if(i == (words.length - 1)){ // last word, no spaces afterwards
                newString += words[i];
            }
            else{
                newString += words[i];
                for(var j = 0; j < spacesPerGap; j++){
                    newString += " ";
                }
                if(extras > 0 && i % extraDistrubutionFreq == 0){ // this calculation biases the front part of the sentence
                    newString += " ";
                    extras--;
                }
            }
        }
        return newString;
    }
}