object = [];
os = "";
obj = "";

function prelode(){}

function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(640, 420);
    video.hide();
}

function start(){
    od = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    obj = document.getElementById("on").value;
}


function modelLoaded(){
    console.log("Model Loaded");
    os = true;
}

function gotResult(error, result){
    if (error){
        console.error(error);
    }
    else {
        console.log(result);
        object = result;
    }
}

function draw(){
    image(video, 0, 0, 640, 420);

    if (os != ""){
        od.detect(video, gotResult);
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            fill("red");
            percent = floor(object[i].confidence*100);
            text(object[i].label + " " + percent + "%", object[i].x-2, object[i].y-2);
            nofill();
            stroke("red");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);

            if (object[i].label == obj){
                document.getElementById("od").innerHTML = "Is the object detected - True";
            }
            else {
                document.getElementById("od").innerHTML = "Is the object detected - False";
            }
        } 
    }
}
