const len = 784;
const total_data = 1000;

const CAT = 0;
const RAINBOW = 1;
const TRAIN = 2;

let cats_data;
let trains_data;
let rainbows_data;

let cats = {};
let trains = {};
let rainbows = {};

let nn;

function preload() {
	cats_data = loadBytes('data/cats1000.bin');
	trains_data = loadBytes('data/trains1000.bin');
	rainbows_data = loadBytes('data/rainbows1000.bin');
}

function setup() {
	createCanvas(280, 280);
	background(255);
	// Preparing the data
	prepareData(cats, cats_data, CAT);
	prepareData(trains, trains_data, TRAIN);
	prepareData(rainbows, rainbows_data, RAINBOW);

	// Making the neural network
	nn = new NeuralNetwork(784, 64, 3);

	// Randomizin the data
	let training = [];
	training = training.concat(cats.training);
	training = training.concat(rainbows.training);
	training = training.concat(trains.training);

	let testing = [];
	testing = training.concat(cats.testing);
	testing = training.concat(rainbows.testing);
	testing = training.concat(trains.testing);

	let trainButton = select('#train');
	let epochCounter = 0;
	trainButton.mousePressed(function() {
		trainEpoch(training);
		epochCounter++;
		console.log("Epoch: " + epochCounter);
	});

	let testButton = select('#test');
	testButton.mousePressed(function() {
		let percent = testAll(testing);
		console.log("Percent: " + nf(percent, 2, 2) + "%");
	});

	let guessButton = select('#guess');
	guessButton.mousePressed(function() {
		let inputs = [];
		let img = get();
		img.resize(28, 28);
		console.log(img);
		img.loadPixels();
		for(let i = 0; i < len; i++) {
			let bright = img.pixels[i * 4];
			inputs[i] = (255 - bright) / 255.0;
		}
		// console.log(inputs);

		let guess = nn.predict(inputs);
		let m = max(guess);
		let classification = guess.indexOf(m);
		if (classification === CAT) {
			console.log("cat");
		} else if (classification === RAINBOW) {
			console.log("rainbow");
		} else if (classification === TRAIN) {
			console.log("train");
		}
	});

	let clearButton = select('#clear');
	clearButton.mousePressed(function() {
		background(255);
	});

	// for (let i = 1; i < 6; i++) {
	// 	trainEpoch(training);
	// 	console.log("Epoch: " + i);
	// 	let percent = testAll(testing);
	// 	console.log("% Correct: " + percent);
	// }


	// let total = 100;
	// for (let n = 0; n < total; n++) {
	// 	let img = createImage(28, 28);
	// 	img.loadPixels();
	// 	let offset = n * 784;
	// 	for (let i = 0; i < 784; i++) {
	// 		let val = 255 - cats_data.bytes[i + offset];
	// 		img.pixels[i * 4 + 0] = val;
	// 		img.pixels[i * 4 + 1] = val;
	// 		img.pixels[i * 4 + 2] = val;
	// 		img.pixels[i * 4 + 3] = 255;
	// 	}
	// 	img.updatePixels();
	// 	let x = (n % 10) * 28;
	// 	let y = floor(n / 10) * 28;
	// 	image(img, x, y);
	// }
}

function draw() {
	strokeWeight(8);
	stroke(0);
	if (mouseIsPressed) {
		line(pmouseX, pmouseY, mouseX, mouseY);
	}
}
