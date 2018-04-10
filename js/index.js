card_list = ["space-shuttle","space-shuttle", "laptop", "laptop", "git-square", "git-square", "gamepad","gamepad","headphones","headphones", "rocket","rocket","linux","linux","reddit-alien","reddit-alien" ];

matchers = 0
movesCount = 0
starCounts = 3
opened_cards = []


$timer = $('.timer');
$restarter = $('.restart');
$moves = $('.moves');

function display(cards) {
  
  shuffled = shuffle(cards);
  for (let i = 0; i < shuffled.length; i++) {
   $card = preparingCard(shuffled[i]);

  $('.deck').append($card);
  }
  
  preparingDeck();
  
	second = 0;
	$timer.text(`${second}`);
	initTime();
  
  
  $restarter.on('click', function(){
    restart();
  });
}


function preparingDeck() {
  
  $moves.text(movesCount);
 
  let j = 2;
  while( j >= 0){
   			$('.stars').append('<li><i class="fa fa-star"></i></li>');
   			j--;
 		}
}


function preparingCard(name) {
  $card = $(`<li class="card">
               <i class="fa fa-${name}"></i>
           </li>`);

   $card.on("click", function(){
      $moves.text(++movesCount);
    
     if(opened_cards.includes($(this)) == false) {
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
     
   });

   return $card
}


function check_for_match() {
if ( opened_cards[0].children().attr('class') == opened_cards[1].children().attr('class')) {
  matchers += 1;
  opened_cards = [];
  
  if ( matchers == 8 ){
  $('#win').show();
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



function restart(){
 	$('.deck').empty();
 	opened_cards =[];
 		//Re-shuffle
 	display(card_list);
  cleanStars();
 	//reset matching
 	matchers = 0;
  movesCount = 0;
}


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



function initTime() {
	currentTimer = setInterval(function () {
		$timer.text(`${second}`)
		second = second + 1
	}, 1000);
}

function resetTimer(timer) {
	if (timer) {
		clearInterval(timer);
	}
}


display(card_list);