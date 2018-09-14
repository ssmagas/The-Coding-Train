function setup() {
	createCanvas(300, 200);
	console.log('running');

	var button = select('#submit');
	button.mousePressed(submitWord);

	var buttonA = select('#analyze');
	buttonA.mousePressed(analyzeThis);
}

function analyzeThis() {
	var txt = select('#textinput').value();

	var data = {
		text: txt
	}

	httpPost('/analyze', data, 'json', dataPosted, postErr);

	function dataPosted(result) {
		console.log(result);
	}

	function postErr(err) {
		console.log(err);
	}
}

function submitWord() {
	var word = select('#word').value();
	var score = select('#score').value();
	console.log(word, score);

	loadJSON('add/' + word + '/' + score, finished);

	function finished(data) {
		console.log(data);
	}
}
