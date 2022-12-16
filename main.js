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
//-----------------------------
// function xuliviechoc(){
//     if (chonBaiStr=='0'){
//         ndpdf='<iframe src="./grammar/'+'b0.pdf" width="100%" height="500px"></iframe>';
//         document.getElementById("divActive").innerHTML=ndpdf;
//         // alert('GT');
//     }else{
//     if (chonSlpaVl=='1'){
//         document.querySelector(".para").innerHTML='';
//         detrong2br();
//         ndluu='';
//         var tepVideo='./videomp4/s'+chonSlsoVl+'/y_'+chonSlsoVl+'_'+chonBaiStr+'.mp4';
//         if (doesFileExist(tepVideo)){
//             textvid='<video width="400" height="240" id="myVideo" controls autoplay>'+
//                 '<source src="'+tepVideo+'" type="video/mp4">'+
//                 '</video>';
//             document.getElementById("divActive").innerHTML=textvid;    
//             document.getElementById("divActive").className='cangiua-divActive';
//             iddluu=null;
//             slrepeat=1;
//             slPlayVid();
//         }else{
//             ndpdf='<iframe src="./grammar/s'+chonSlsoVl+'/'+'b0.pdf" width="100%" height="500px"></iframe>';
//             document.getElementById("divActive").innerHTML=ndpdf;
//             alert("Sorry! File does not exist.");
//         }
//     }

//     if (chonSlpaVl=='2'){
//         document.querySelector(".para").innerHTML="";
//         detrong2br();
//         ndluu='';
//         var tepmo="./practice/s"+chonSlsoVl+'/'+chonSlsoVl+'_'+chonBaiStr+".html";
//         if (doesFileExist(tepmo)){
//             fetch(tepmo)
//                 .then(reponse => reponse.text())
//                 .then(text => document.getElementById("divActive").innerHTML=text);
//             document.getElementById("divActive").className='tudo';
//             iddluu=null;
//             slrepeat=1;
//         }else{
//             ndpdf='<iframe src="./grammar/s'+chonSlsoVl+'/'+'b0.pdf" width="100%" height="500px"></iframe>';
//             document.getElementById("divActive").innerHTML=ndpdf;
//             alert("Sorry! File does not exist.");
//         }
//     }
//     if (chonSlpaVl=='3'){
//         document.querySelector(".para").innerHTML="";
//         detrong2br();
//         ndluu='';
//         iddluu=null;
//         slrepeat=1;
//         ndpdf='<div class="center"><p><br><br><br><br>Hay nhap vao micro de talking theo bai<br></p></div>';
//         document.getElementById("divActive").innerHTML=ndpdf;
        
//     }
// }
// }     
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
function kichHoatMic(){
    //doi mau vong tron va mic
    let mic = document.querySelector("#circlein");
    mic.style.backgroundColor = "#6BD6E1";
    //khoi dong SpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recorder = new SpeechRecognition();
    
    recorder.onstart = () => {
        document.getElementById("words").innerHTML="";
        console.log('Voice activated');
    };
    
    recorder.onresult = (event) => {
        const resultIndex = event.resultIndex;
        const transcript = event.results[resultIndex][0].transcript;
        document.getElementById("words").innerHTML=transcript;
        // botVoice(transcript);
    };
    
    mic.addEventListener('click', () =>{
        recorder.start();
    });
    recorder.addEventListener('soundend', () => {
        mic.style.backgroundColor = null;
    });
}
//-------------------
function xuliviechoc(){ 
    document.getElementById("words").innerHTML="";
}
