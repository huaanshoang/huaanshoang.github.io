var chonSlsoVl='1'; 
var chonBaiStr='0'; 
var chonSlpaVl='1';

var chonc='';
var values = [];

var tenidl='';
var slrepeat=1; 
var ndluu=""; 
var giongnoi='en';
var iddluu='p1';

//-------------------
function chonSlso() {    
    if(document.getElementById('Sl_mot').checked) {   
        chonSlsoVl='1';
        var uchon = document.getElementById("unit_so");
        while (uchon.length > 0) {
            uchon.options[0].remove();
        }
        themoptions(chonSlsoVl);
        chonBaiStr='0';
        // xuliviechoc();
    }

    if(document.getElementById('Sl_hai').checked) {   
        chonSlsoVl='2';
        var uchon = document.getElementById("unit_so");
        while (uchon.length > 0) {
            uchon.options[0].remove();
        }
        themoptions(chonSlsoVl);
        chonBaiStr='0';
        // xuliviechoc();   
    }   
    if(document.getElementById('Sl_ba').checked) {   
        chonSlsoVl='3';
        var uchon = document.getElementById("unit_so");
        while (uchon.length > 0) {
            uchon.options[0].remove();
        }
        themoptions(chonSlsoVl);
        chonBaiStr='0';
        // xuliviechoc();   
    }
}       
//---------------------------------
function themoptions(chonSlsoVl){
    if (chonSlsoVl=='1'){max=104;}
    if (chonSlsoVl=='2'){max=122;}
    if (chonSlsoVl=='3'){max=96;}
    var values = [];
    for (i=0; i<=max; ++i){
        values.push(i.toString());
    }
    var bselect = document.getElementById('unit_so');
    values.forEach(value =>{
        var option = document.createElement('option');
        option.innerHTML = value;
        option.value = value;
        bselect.appendChild(option);
    })
}
//---global neu co su thay doi unit thi ham nay chay----------------------
var uchon = document.getElementById("unit_so");
uchon.onchange=function(){
    chonBaiStr=(this.selectedIndex);
    xuliviechoc();
}
//-----------------------
function chonSlpart() {    
    if(document.getElementById('Pa_mot').checked) {   
        chonSlpaVl='1';
        xuliviechoc();   
    }   
    if(document.getElementById('Pa_hai').checked) {   
        chonSlpaVl='2';
        xuliviechoc(); 
    }   
    if(document.getElementById('Pa_ba').checked) {   
        chonSlpaVl='3';
        xuliviechoc();  
    }
}       
//----------------------------------
function xuliviechoc(){ 
    document.getElementById("words").innerHTML="";
}
//------------------------
// function checkButtonMic(){
//     if(document.getElementById('micON').checked) {   
//         miconoff=1;
//         // document.getElementById('circlein').style.backgroundColor = "#6BD6E1";
//         // kichHoatRec();
//     }
//     if(document.getElementById('micOFF').checked) {   
//         miconoff=0;
//         // document.getElementById('circlein').style.backgroundColor = null;
//     }   
// }
//-----------------
function checkButton() {
    alert("tttt day");   
    if(document.getElementById('mot').checked) {   
        slrepeat=1;   
    }   
    if(document.getElementById('ba').checked) {   
        slrepeat=3;   
    }   
    if(document.getElementById('nam').checked) {   
        slrepeat=5;   
    }
}
//--------------------------------
function checkButtonMic() {
    if(document.getElementById('micon').checked) {
        recogTalk();   
    }   
    if(document.getElementById('micoff').checked) {  
        recogTalk();   
    }   
}       

//------------Recognition----------
function recogTalk(){
if ("webkitSpeechRecognition" in window) {
    let speechRecognition = new webkitSpeechRecognition();

    let final_transcript = "";
    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;
    speechRecognition.lang = "en-US";
  
    speechRecognition.onstart = () => {
      document.querySelector("#circlein").style.backgroundColor = "#6BD6E1";
    };
    speechRecognition.onerror = () => {
        document.querySelector("#circlein").style.backgroundColor = null;
    };
    speechRecognition.onend = () => {
        document.querySelector("#circlein").style.backgroundColor = null;
    };
  
    speechRecognition.onresult = (event) => {
      let interim_transcript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
        } else {
          interim_transcript += event.results[i][0].transcript;
        }
      }
      //origin document.querySelector("#final").innerHTML = final_transcript;
      //origin document.querySelector("#interim").innerHTML = interim_transcript;
      document.querySelector("#words").innerHTML = interim_transcript;
    };
  
    // Set the onClick property of the start button
    document.querySelector("#micon").onclick = () => {
      // Start the Speech Recognition
      speechRecognition.start();
    };
    // Set the onClick property of the stop button
    document.querySelector("#micoff").onclick = () => {
      // Stop the Speech Recognition
      speechRecognition.stop();
    };

} else {
    console.log("Speech Recognition Not Available");
}
}
