$(document).ready(function(){

    // this solution doesnt handle multiple board sizes unfortunately
    var heights = [0,0,0,0,0,0,0];
    var gameOver = false;
    var numPlayers = 1;

    var count = 0; // tracks the number of dots dropped. doesn't make sense to se
                    // if we've connected four until at least four reds have dropped

    var color = "red"; // red always starts right? That's definitely the case, I know the rules for sure

    var startGame = function(players){
        numPlayers = players;
        $(".options-wrapper").addClass("hidden");
        $(".game-wrapper").removeClass("hidden");
        var gameBoard = $(".game-board");
        for(let row = 5; row >= 0; row--){
            for(let column = 0; column < 7; column++){
                gameBoard.append("<div class='dot' data-row='" + row + "' data-column='" + column + "' ></div>");
            }
        }
    }

    // function that handles the dropping of a dot
    var dropDot = function(dot, color){
        var column = dot.attr("data-dropColumn");
        var yPos = heights[column]; 
        if (yPos > 5){
            illegalMove();
        }else{
            heights[column]++;
            dot.addClass("falling " + color + " row" + yPos);
            setTimeout(function(){
                dot.removeClass("falling");
                dot.removeClass(color);
                dot.removeClass("row" + yPos); // these needed to be 3 separate lines otherwise it causes problems
                addDot(column, yPos, color);
                count++;
                if(checkForWin(column, yPos, color)){
                    gameWin(color);
                }
                else if(count == 42){ // all slots are filled
                    gameDraw();
                }
                else if(color == "red" && numPlayers == 1){ //simple "ai"

                    var availableColumns = [];
                    var i = 0;
                    $(heights).each(function (){ // make sure the computer doesn't try to drop on a full column
                        if(heights[i] < 5){
                            availableColumns.push(i);
                        }
                        i++;
                    });
                    changeColor("yellow");
                    randomDrop = dropDot($(".drop-dot[data-dropColumn='" + availableColumns[Math.floor(Math.random() * availableColumns.length)] + "']"), "yellow");
                }
                else{
                    changeColor(color == "red" ? "yellow" : "red");
                }
            }, 400);
        }
    }

    var illegalMove = function(){
        var popup = $(".error-popup");
        popup.addClass("active");
        setTimeout(function(){
            popup.removeClass("active");
        }, 4000);
    }

    var addDot = function(column, yPos, currentColor){
        var dot = $(".dot[data-row=" + yPos + "]");
        $(dot[column]).addClass(currentColor);

    };

    var checkForWin = function(column, yPos, color){
        if(count >= 7){ //no use checking if you havent played at leasy 4 of one color
            var length = 0;

            //check vertical
            var allColumn = $(".dot[data-column='" + column + "']");

            for(var y = yPos-1; y < 6; y++){
                if($(allColumn[y]).hasClass(color)){
                    length++;
                }
                else{
                    length = 0;
                }
                if(length == 4){
                    return true;
                }
            }
            length = 0;
            // check horizontal
            var allRow = $(".dot[data-row='" + yPos + "']");
            for(var y = 0; y <= 6; y++){
                if($(allRow[y]).hasClass(color)){
                    length++;
                }
                else{
                    length = 0;
                }
                if(length == 4){
                    return true;
                }
            }
            length = 0;

        // check ascending diagonal
        for(var y = 2; y >= 0; y--){ // starting with the top-left most possibility
            for(var x = 0; x+y < 7; x++){
                var dot = $(".dot[data-column='" + x + "'][data-row='" + (y+x) + "']");
                if(dot.hasClass(color)){
                    length++;
                }
                else{
                    length = 0;
                }
                if(length == 4){
                    return true;
                }
            }
        }
        for(x = 1; x < 4; x++){
            for(y = 0; y < 6; y++){
                var dot = $(".dot[data-column='" + (y+x) + "'][data-row='" + y + "']");
                if(dot.hasClass(color)){
                    length++;
                }
                else{
                    length = 0;
                }
                if(length == 4){
                    return true;
                }
            }
        }

        // check descending diagonal
        for(var y = 5; y > 2; y--){
            for(var x = 0; (y-x) >= 0; x++){ 
                var dot = $(".dot[data-column='" + x + "'][data-row='" + (y-x) + "']");
                if(dot.hasClass(color)){
                    length++;
                    console.log()
                }
                else{
                    length = 0;
                }
                if(length == 4){
                    return true;
                }
            }
        }
        for(x = 1; x < 4; x++){
            for(y = 5; y >= 0; y--){
                var dot = $(".dot[data-column='" + (6-y) + "'][data-row='" + y + "']");
                if(dot.hasClass(color)){
                    length++;
                }
                else{
                    length = 0;
                }
                if(length == 4){
                    return true;
                }
            }
        }

        }
        return false;
    }



    var gameDraw = function(){
        $(".end-popup").removeClass("hidden");
        $(".end-popup__text.draw").removeClass("hidden");
    }

    var gameWin = function(){
        $(".end-popup").removeClass("hidden");
        $(".end-popup__text.win").removeClass("hidden");
        $(".end-popup__text.win").html("<span class='winner " + color + "'>" + color.toUpperCase() + "</span> wins!");
    }

    // I could have made color a boolean or something for more efficiency but making it a string that
    // switched back and forth made it easier to read and write
    var changeColor = function(newColor){
        $(".drop-row").removeClass(color);
        color = newColor;
        $(".drop-row").addClass(color);
        $(".turn-text h1").html("It's <span class='turn " + color + "'>" + color.toUpperCase() + "'s</span> turn");
    }

    var resetBoard = function(){
        $(".game-board").html("");
        heights = [0,0,0,0,0,0,0];
        count = 0;
        changeColor("red");
        $(".end-popup").addClass("hidden");
        $(".end-popup__text").addClass("hidden");
        $(".options-wrapper").removeClass("hidden");
        $(".game-wrapper").addClass("hidden");
    }

    $(".drop-dot").click( function(){
        dropDot($(this), color);
    });

    $(".play-button").click(function(){
        resetBoard();
    });

    $(".options-coin").click( function (){
        startGame($(this).attr("data-players"));
    });
});