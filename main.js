camera = document.getElementById(camera);

Webcam.attach("#camera");

function snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("snapshot_result").innerHTML = '<img id="snapped_img" src="'+data_uri+'">'
    });
}

link = "https://teachablemachine.withgoogle.com/models/9rkzPJjfV/model.json";

console.log(ml5.version);

classifier = ml5.imageClassifier(link, model_loaded);

function model_loaded(){
    console.log("Model has loaded.");
}

function predict(){
    img = document.getElementById("snapped_img");
    classifier.classify(img, emotion_detected);
}

function emotion_detected(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        prediction1 = results[0].label;
        console.log(prediction1);
        prediction2 = results[1].label;
        console.log(prediction2);
        speak();
        if(prediction1 == "Happy"){
            document.getElementById("emotion_name1").innerHTML = "Happy";
            document.getElementById("emoji1").innerHTML = "&#128512;";
        }
        else if(prediction1 == "Sad"){
            document.getElementById("emotion_name1").innerHTML = "Sad";
            document.getElementById("emoji1").innerHTML = "&#128577;";
        }
        else{
            document.getElementById("emotion_name1").innerHTML = "Angry";
            document.getElementById("emoji1").innerHTML = "&#128545;";
        }
    //prediction 2
        if(prediction2 == "Happy"){
            document.getElementById("emotion_name2").innerHTML = "Happy";
            document.getElementById("emoji2").innerHTML = "&#128512;";
        }
        else if(prediction2 == "Sad"){
            document.getElementById("emotion_name2").innerHTML = "Sad";
            document.getElementById("emoji2").innerHTML = "&#128577;";
        }
        else{
            document.getElementById("emotion_name2").innerHTML = "Angry";
            document.getElementById("emoji2").innerHTML = "&#128545;";
        }
    }
}

function speak(){
    synth = window.speechSynthesis;
    speechData1 = "The first prediction is " + prediction1;
    speechData2 = "The second prediction is " + prediction2;
    utterThis = new SpeechSynthesisUtterance(speechData1 + speechData2);
    synth.speak(utterThis);
}