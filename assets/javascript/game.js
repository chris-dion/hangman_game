// list of different species of shark for hangman game.

var questions = ['hello  world', 'stranger  things', 'crystal  pepsi', 'hotline miami', 
'dungeon  and  dragons', 'arcades', 'tetris', 'slap  bracelets'];

// using above array we choose a random word.
var chosen_q = questions[Math.floor(Math.random() * questions.length)];

//tallies the number of wins and losses
var won = 0;
var loss = 0;

// global variables 
var current_letter;

//bool for if they guessed the right answer or not
var correct_bool = false;

//if the num_correct_guess equal the length of the word then the player wins.
var num_correct_guess = 0;

//if the player misses 6 times then they lsoe
var misses = 0;

//gets the length of the word
var length = chosen_q.length;

//split the word into a array so we can compare individual letters
var answer = chosen_q.split("");

//the array that will be initialized later so we can display it to the user.
var blank_spaces = [];

//these  variables will be used to check if a player has guessed the same letter twice
var guesses_so_far = [];
var guesses_index = 0;
var prev_guess = false;

//initialize the array that will be displayed to the user
for (var i = 0; i < length; i++){
	if (answer[i] != " "){
		blank_spaces[i] = "_";
	}else{
		num_correct_guess++;
		blank_spaces[i] = " ";
	}
}

document.getElementById("guess_board").innerHTML = blank_spaces.join('');

function reset_game(){
	console.log("the game has been reseted")
	chosen_q = questions[Math.floor(Math.random() * questions.length)];


	// global variables 
	correct_bool = false;
	num_correct_guess = 0;
	misses = 0;
	length = chosen_q.length;
	answer = chosen_q.split("");
	blank_spaces = [];

	guesses_so_far = [];
	guesses_index = 0;
	prev_guess = false;

	for (var i = 0; i < length; i++){
		if (answer[i] != " "){
			blank_spaces[i] = "_";
		}else{
			num_correct_guess++;
			blank_spaces[i] = " ";
		}
	}
	document.getElementById("guess_board").innerHTML = blank_spaces.join('');
	document.getElementById("misses").innerHTML = "You have 6 more incorrect guesses before you lose";
	document.getElementById("wins").innerHTML = "You have won " + won + " times";
	document.getElementById("loss").innerHTML = "You have loss " + loss + " times";
	document.getElementById("guess_so_far").innerHTML = "Guesses so far: ";


}



document.onkeyup = function(event){
	correct_bool = false;
	prev_guess = false;
	current_letter = event.key;
	current_letter = current_letter.toLowerCase();

	console.log ("the current letter is: " + current_letter );
	console.log ("the current word is: " + chosen_q );

	//scans previous made guess so to prevent repeats
	for (var i = 0; i < guesses_so_far.length; i++){
		if (guesses_so_far[i] == current_letter){
			prev_guess = true;
		}
	}

	guesses_so_far[guesses_index] = current_letter;
	guesses_index++;

	document.getElementById("guess_so_far").innerHTML = "Guesses so far: " + guesses_so_far.join(" ");

	//checks if you made an already previous guess
	if (prev_guess == false){
		document.getElementById("console_messages").innerHTML = "";
		//scan the chosen question and see if there is a match
		//if there's a match then fill in the space and iterate correct guess. if you did then it will skip over main chunk of code.
		for (var i = 0; i < length; i++){

			if (current_letter == answer[i]){

				if(blank_spaces[i] != "_" || blank_spaces[i] != " "){
					correct_bool = true;
					num_correct_guess++;
					blank_spaces[i] = current_letter;
					document.getElementById("guess_board").innerHTML = "" + blank_spaces.join('');
				}
			}

		}
	}else{
		correct_bool = true;
		document.getElementById("console_messages").innerHTML = "You have already made that guess; try again.";
	}

	//if they guessed wrong iterate misses and check if they lose the game
	if (correct_bool == false){
		misses++;
		document.getElementById("misses").innerHTML = "you have " + (6-misses) + " more incorrect guesses before you lose." ;
		if (misses == 6) {
			loss++;
			document.getElementById("console_messages").innerHTML = "You lose.";
			reset_game();
		}
	}

	//check for the win condition
	if (num_correct_guess == length) {
		won++
		document.getElementById("console_messages").innerHTML = "You win.";
		reset_game();
	}

}
