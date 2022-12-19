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
var message="";
var miconoff=0;
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
    // alert(chonBaiStr);
    xuliviechoc(chonSlsoVl,chonBaiStr,chonSlpaVl);
}
//-----------------------
function chonSlpart() {    
    if(document.getElementById('Pa_mot').checked) {   
        chonSlpaVl='1';
        xuliviechoc(chonSlsoVl,chonBaiStr,chonSlpaVl);
    }   
    if(document.getElementById('Pa_hai').checked) {   
        chonSlpaVl='2';
        xuliviechoc(chonSlsoVl,chonBaiStr,chonSlpaVl);
    }   
    if(document.getElementById('Pa_ba').checked) {   
        chonSlpaVl='3';
        xuliviechoc(chonSlsoVl,chonBaiStr,chonSlpaVl);
    }
}       
//----------------------------------
function xuliviechoc(chonSlsoVl,chonBaiStr,chonSlpaVl){ 
    document.getElementById("words").innerHTML="";
    if (chonSlpaVl=="3"){
        //tai vao tep .js tuong ung va thuc hien cac lenh trong do
        const script = document.createElement('script');
        let tepjs='./talking/s'+chonSlsoVl+'/talk_'+chonSlsoVl+'_'+chonBaiStr+'.js';
        script.src = tepjs;
            // Append to the 'head' element
        document.head.appendChild(script);
            // botAnswer();
        script.addEventListener('load', function() {
            // The script is loaded completely
            document.getElementById("talking").innerHTML=tepjs+" loaded. Click Mic On to talk";
            // alert('Da nap bai talk :'+tepjs+' .Hay bat mic de talk.')   
        });
    }
}
//------------------------
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
        miconoff=1;
        if (miconoff==1){
            recognition.start();
            document.querySelector("#words").innerHTML = "";
        }
    }       
    if(document.getElementById('micoff').checked) {
        miconoff=0;
        if (miconoff==0){  
            recognition.stop();
            document.getElementById('circlein').style.backgroundColor = null;
            document.querySelector("#words").innerHTML = "";
        }    
    }   
}       

//------------Recognition----------

    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    //Ham sau chay khi da recognition.start() 
    recognition.onstart = () => {
        document.querySelector("#circlein").style.backgroundColor = "#6BD6E1";
    };
    //Ham sau lay ket qua khi su kien da chay
    recognition.addEventListener("result", e => {
        for (let i = e.resultIndex, len = e.results.length; i < len; i++) {
            let transcript = e.results[i][0].transcript;
            console.log(transcript);
            if (e.results[i].isFinal) {
                document.querySelector("#words").innerHTML = transcript;
                if (chonSlpaVl=="3"){
                    //tep .js tuong ung voi chonSlsoVl,chonBaiStr da nap se cho Bot tra loi theo transcript
                    botRecAnswer(transcript);
                } 
            }
        }

    })
    recognition.addEventListener('soundend', () => {
        document.querySelector("#circlein").style.backgroundColor = null;
        document.getElementById("micoff").checked=true;
    });

//----------------------
function say(message,giongnoi){
    message=message.replaceAll('<span style="color:blue">', '');
    message=message.replaceAll('<span style="color:red">', '');
    message=message.replaceAll('</span>', '');
    message=message.replaceAll('</strong>','');
    message=message.replaceAll('<strong>','');
    message=message.replaceAll("<em>","");
    message=message.replaceAll("</em>","");
    message=message.replaceAll("<u>","");
    message=message.replaceAll("</u>","");
    message=message.replaceAll('<span style="color:#0070C0"','');
    message=message.replaceAll('<span lang="EN" style="color:#0070C0"','');
    message=message.slice(message.indexOf(":")+1, -1);
    message=message.trim();
    ndluu=message;
    let speech = new SpeechSynthesisUtterance(message);
    speech.lang = giongnoi;
    window.speechSynthesis.speak(speech);
}
//----------------------
function botRecAnswer(message){
    var co =0;
    const giongnoi='en-US';
    for (let i=0; i < aListU.length ; i++ ) {
        if (aListU[i].includes(message)){
            co=1;
            say(aListB[i],giongnoi);
        }    
    }
    if (co==0){
        say("Sorry, I did not understand that.",giongnoi);
    }
}
