document.addEventListener("DOMContentLoaded", function () {
	new Vue({
		el: '#app',
		data: function() {
			return {
				letters: [],
			};
		},
		ready: function() {
			var word = "spiderdance";
			var letters = word.split('');
			for (var i = 0; i<letters.length; i++) {
				this.letters.push({
					content: letters[i],
					visible:false
				});
			}
		},
		methods: {
			open: function (letter) {
					letter.visible=true;
			}
		}
	});
})