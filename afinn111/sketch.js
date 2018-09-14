var afinn;

function preload() {
	afinn = loadJSON('afinn111.json');
}

function setup() {
	noCanvas();
	console.log(afinn);

	var txt = select('#txt');
	txt.input(typing);

	function typing() {
		var textinput = txt.value();
		var words = textinput.split(/\W/);
		console.log(words);
		var scoredwords = [];
		var totalScore = 0;
		for (var i = 0; i < words.length; i++) {
			var word = words[i].toLowerCase();
			if (afinn.hasOwnProperty(word)) {
				var score = afinn[word];
				totalScore += Number(score);
				scoredwords.push(word + ': ' + score + ' ');
			}
		}
		var scorePar = select('#scoreP');
		scorePar.html('score: ' + totalScore);
		var comp = select('#comparative');
		comp.html('comparative: ' + totalScore / words.length);
		var wordlist = select('#wordlist');
		wordlist.html(scoredwords);
		// console.log(txt.value());
	}
}

function draw() {

}
