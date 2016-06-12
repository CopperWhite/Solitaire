var mapWidth = 7;
var mapHeight = 7;
var voidArray = ['box1-1','box1-2','box1-6','box1-7',
	'box2-1','box2-2','box2-6','box2-7',
	'box6-1','box6-2','box6-6','box6-7',
	'box7-1','box7-2','box7-6','box7-7'];
var counter = 0;
var valArray = [-1,1];

$(function(){
	for(var y=1;y<=mapHeight;y++){
		for(var x=1;x<=mapWidth;x++){
			$('<div></div>').addClass('box')
				.attr('id','box'+x.toString()+'-'+y.toString())
					.data('x',x)
						.data('y',y)
							.css({left:(x-1)*50,top:(y-1)*50}).appendTo('#field');
		}
	}

	for(var i=0; i<voidArray.length;i++) {
		var boxes = document.getElementById(voidArray[i]);
		$(boxes).removeClass('box');
		$(boxes).addClass('void');
	}

	$('.box').addClass('coin');
	$('#box4-4').removeClass('coin').addClass('empty');


	$('#score').append(counter);

	$('.box').on('click',function() {
		if($(this).hasClass('coin')) {
			$('.step').removeClass('step');
			$('.picked').addClass('coin');
			$('.picked').removeClass('picked');
			$(this).addClass('picked');
			$(this).removeClass('coin');
			var startX = parseInt($('.picked:first').data('x'));
			var startY = parseInt($('.picked:first').data('y'));
			var moves = [2,-2];
			for (var i=0;i<moves.length;i++) {
				var stepIdX = 'box'+(startX-moves[i]).toString()+'-'+startY.toString();
				var stepIdY = 'box'+startX.toString()+'-'+(startY-moves[i]).toString();
				var stepBox = document.getElementById(stepIdX);
				$(stepBox).addClass('step');
				var stepBox = document.getElementById(stepIdY);
				$(stepBox).addClass('step');
			}
		}
	});

	function move(startX, startY, finishX, finishY) {
		for (var i = 0;i<valArray.length;i++) {
			if (((startX-finishX)==valArray[i]*2)) {
				var removedId = 'box'+(finishX+valArray[i]).toString()+'-'+(finishY).toString();
			} else if (((startY-finishY)==valArray[i]*2)) {
				var removedId = 'box'+(finishX).toString()+'-'+(finishY+valArray[i]).toString();
			}
		}
		var emtyBox = document.getElementById(removedId);
		if ($(emtyBox).hasClass('empty')) {
			var startId = 'box'+(startX).toString()+'-'+startY.toString();
			var startBox = document.getElementById(startId);
			$(startBox).addClass('coin');
		} else {
			var finishId = 'box'+(finishX).toString()+'-'+(finishY).toString();
			var finishBox = document.getElementById(finishId);
			$(emtyBox).removeClass('coin');
			$(emtyBox).addClass('empty');
			$(finishBox).removeClass('empty');
			$(finishBox).addClass('coin');
			$('.step').removeClass('step');
			$('.picked').addClass('empty');
			$('.picked').removeClass('picked');
			counter++;
			$('#score').empty();
			$('#score').append(counter);
		}
	};

	$('.box').on('click',function() {
		if (($(this).hasClass('empty'))&&($(this).hasClass('step'))) {
			var startX = parseInt($('.picked:first').data('x'));
			var startY = parseInt($('.picked:first').data('y'));
			var finishX = parseInt($(this).data('x'));
			var finishY = parseInt($(this).data('y'));

			move(startX, startY, finishX, finishY);
		}
		if (document.getElementsByClassName('coin').length<=1) {
			alert('You have won!');
		}
	})
});