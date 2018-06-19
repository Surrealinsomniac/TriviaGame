var triviaQuestions = [{
    question: "What year was Alien released?",
    answerList : ["1976", "1978", "1979", "1974"],
    answer: 2
},{
    question: "What is the name of the company in the movie Blade Runner that makes replicants",
    answerList: ["Wayland", "Tyrell", "The Company", "Robots 'R Us"],
    answer: 1
}, {
    question: "In the Star Wars movie, The Empire Strikes Back, what did the Millennium Falcon fly into to escape the Imperial fighters?",
    answerList: ["Space Station", "Black Hole", "Planet", "Asteriod Field"],
    answer: 3    
},{
    question: "In the film Star Trek - The Motion Picture, what was the name of the mysterious entity that was threatening Earth?",
    answerList: ["Tyranus", "Cygnus", "Vejur", "Cobalt"],
    answer: 2
},{
    question: "What is the Doctor's weapon of choice?",
    answerList: ["Screwdriver", "Gun", "Sword", "Shovel"],
    answer: 0
}, {
    question: "What is the name of the computer in 2001: A Space Odyssey",
    answerList: ["Lucy", "DOM", "SID", "HAL"],
    answer: 3
}, {
    question: "In which 1990 sci-fi movie did we see Fred Ward and Kevin Bacon being terrorized by gigantic, hungry worms?",
    answerList: ["Slither", "Feast", "Tremors", "Worms"],
    answer: 2
},{
    question: "In which movie world might you read the newspaper headline - T-Rex Tramples Tourists?",
    answerList: ["Jurassic Park", "Monsters INC", "Avatar", "Godzilla"],
    answer: 0
},{
    question: "Played by Malcolm McDowell, what does Alex call his gang of thugs in A Clockwork Orange?",
    answerList: ["Yarbles", "Droogs", "Banshees", "Doodles"],
    answer: 1
},{
    question: "What is the model number of the terminator cyborg in the 1984 sci-fi film The Terminator?",
    answerList: ["301", "201", "401", "101"],
    answer: 3
},{
    question: "Set in the year 2517, what space drama TV series follows the adventures of the renegade crew of the spaceship Serenity?",
    answerList: ["Firefly", "Andromeda", "Babylon 5", "V"],
    answer: 0
},{
    question: "Which actor played the first personification of the Doctor in Doctor Who, from 1963 to 1966?",
    answerList: ["Jon Pertwee", "Patrick Troughton", "Tom Baker", "William Hartnell"],
    answer: 3
},{
    question: "What is the not-so-classic film Night of the Lepus about?",
    answerList: ["Alien Invasion", "Giant Rabbits Attacking a Town", "Spiders Eating Babies", "Cars Coming Alive"],
    answer: 1
},{
    question: "What is the name of the ship that flees a robot attack to go in searh of Earth?",
    answerList: ["Enterprise", "Nostromo", "Battlestar Galactica", "Prometheus"],
    answer: 2
},{
    question: "What is the name of the Fearsome Alien in the movie Alien?",
    answerList: ["Xenomorph", "Exomorph", "Cyleomorph", "Alien"],
    answer: 0
}];

var imgArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13', 'question14', 'question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ imgArray[currentQuestion] +'.jpeg" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}
