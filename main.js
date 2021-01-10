prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function takesnapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="capture_image" src="'+ data_uri  +'">';
    });
}

console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/yP9FUQGez/model.json', modelLoaded);

function modelLoaded() {
    console.log('Model did not load.');
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is:" + prediction_1;
    speak_data_2 = "The second prediction is:" + prediction_2;
    var utter_this = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utter_this);
}

function check() {
    img = document.getElementById('capture_image');
    classifier.classify(img, gotresult);
}

function gotresult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById('result_emotion_name').innerHTML = results[0].label;
        document.getElementById('update_emoji').innerHTML = results[0].confidence.toFixed(3);

        prediction_1 = results[0].label;

        document.getElementById('result_emotion_name2').innerHTML = results[1].label;
        document.getElementById('update_emoji2').innerHTML = results[1].confidence.toFixed(3);

        prediction_2 = results[1].label;
        speak();
    }
}