card_list = ["space-shuttle","space-shuttle", "laptop", "laptop", "git-square", "git-square", "gamepad","gamepad","headphones","headphones", "rocket","rocket","linux","linux","reddit-alien","reddit-alien" ];

matchers = 0;
movesCount = 0;
starCounts = 3;
opened_cards = [];

$timer = $('.timer');
$restarter = $('.restart');
$moves = $('.moves');
$finalStars = $('.finalStars');
$finalTimer = $('.finalTimer');
currentTimer = null;

/*
display:
prepare the deck in general;
- shuffles and display the cards on the deck.
- call prepareCounters.
- start a timer and displays it on the deck.
*/
function display(cards) {

  shuffled = shuffle(cards);
  for (let i = 0; i < shuffled.length; i++) {
       $card = preparingCard(shuffled[i]);
       $('.deck').append($card);
  }

  prepareCounters();

	second = 0;
	$timer.text(`${second}`);
	initTime();


  $restarter.on('click', function(){
      restart();
  });
}


/*
prepareCounters:
- displays number of moves on the deck.
- list the stars on the deck.
*/
function prepareCounters() {

  $moves.text(`${movesCount}`);

  let j = 2;
  while( j >= 0){
   			$('.stars').append('<li><i class="fa fa-star"></i></li>');
   			j--;
 		}
}

/*
preparingCard:
- prepare a card.
- it does the following functionalities:
    - if a card clicked, it displays its symbol.
    - if multiple cards been clicked, it call check function to check if they're matched.
    - it reduces stars count after certain number of cards clicks.
*/
function preparingCard(name) {
  $card = $(`<li class="card">
               <i class="fa fa-${name}"></i>
           </li>`);

  $card.on("click", function(){

  if (!$(this).hasClass('show open')) {

      $moves.text(++movesCount);

     if(!opened_cards.includes($(this))) {
         $(this).addClass("show open");
         opened_cards.push($(this));
   }

    if (opened_cards.length == 2){
         check_for_match();
   }

    if (movesCount % 10 == 0) {
        if (starCounts >= 0) {
            $('.stars').children()[starCounts-1].remove();
   		      $('.stars').append('<li><i class="fa fa-star-o"></i></li>');

           starCounts -= 1;
      }
   }
}

   });

   return $card;
}




/*
check_for_match:
- check if two opened cards are mathed, if so.. it add class match and increment the number of matchers then clean the opened cards array.
- in case it reaches 8 matchers, it shows the winning div.
-
*/
function check_for_match() {
if ( opened_cards[0].children().attr('class') == opened_cards[1].children().attr('class')) {
  opened_cards[0].addClass("match");
  opened_cards[1].addClass("match");
  matchers += 1;

  opened_cards = [];

  if ( matchers == 8 ){
    $('#win').show();
    $finalStars.text(`${starCounts}`);
    $finalTimer.text(`${second}`);

    $("#restart").on('click', function () {
			$("#win").hide();
			restart();

	});
  }
} else {
    setTimeout( function () {
      for ( card of opened_cards ) {
     card.removeClass('open show');
   }
  opened_cards = [];
    }, 300);
  }
}



/*
restart:
- it resets everything to play the game again.
*/
function restart(){
 	$('.deck').empty();
 	opened_cards =[];
  cleanStars();
 	matchers = 0;
  movesCount = 0;
  resetTimer(currentTimer);

 	display(card_list);

}

/*
cleanStars:
- it removes the empty stars during restarting the game so that the filled stars will take its place.
*/
function cleanStars() {
  let j = 2;
  while(j >= 0){
  $('.stars').children()[j].remove();
    j--;
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



/*
initTime:
- initialize the timer.
*/
function initTime() {
	currentTimer = setInterval(function () {
		$timer.text(`${second}`);
		second = second + 1;
	}, 1000);
}


/*
resetTimer:
- Re-setting the timer.
*/
function resetTimer(timer) {
	if (timer) {
		clearInterval(timer);
	}
}


display(card_list);
