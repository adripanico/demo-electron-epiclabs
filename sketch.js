var $ = require('jquery');
var mic;
var fft;

function setup() {
    createCanvas($(window).width(), $(window).height());

    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT();
    fft.setInput(mic);

    noFill();
}

function draw() {
    background(0);
    stroke(255);

    // Get the overall volume (between 0 and 1.0)
    var vol = mic.getLevel();
    $('#volume-tag').html('<span>input level: ' + Math.round(vol * 100) + ' %</span>');

    var spectrum = fft.analyze();
    beginShape();
    for (i = 0; i < spectrum.length; i++) {
        vertex(map(i, 0, spectrum.length, 0, width - 1), map(spectrum[i], 0, 255, height, 300) );
    }
    endShape();

    var waveform = fft.waveform();  // analyze the waveform
    beginShape();
    // strokeWeight(2);
    for (var i = 0; i < waveform.length; i++){
        var x = map(i, 0, waveform.length, 0, width);
        var y = map(waveform[i], -1, 1, 100, 200);
        vertex(x, y);
    }
    endShape();
}