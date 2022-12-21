var chonSlsoVl='1'; 
themoptions(chonSlsoVl)
var chonBaiStr=0; 
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
var aLu=[];
var aLb=[];

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
        xuliviechoc(chonSlsoVl,chonBaiStr,chonSlpaVl);
    }

    if(document.getElementById('Sl_hai').checked) {   
        chonSlsoVl='2';
        var uchon = document.getElementById("unit_so");
        while (uchon.length > 0) {
            uchon.options[0].remove();
        }
        themoptions(chonSlsoVl);
        chonBaiStr='0';
        xuliviechoc(chonSlsoVl,chonBaiStr,chonSlpaVl);
    }   
    if(document.getElementById('Sl_ba').checked) {   
        chonSlsoVl='3';
        var uchon = document.getElementById("unit_so");
        while (uchon.length > 0) {
            uchon.options[0].remove();
        }
        themoptions(chonSlsoVl);
        chonBaiStr='0';
        xuliviechoc(chonSlsoVl,chonBaiStr,chonSlpaVl);   
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
    xuliviechoc(chonSlsoVl,chonBaiStr,chonSlpaVl);
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
function checkButton() {
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
        userSpeechToText();
    }
           
    if(document.getElementById('micoff').checked) {
        miconoff=0;
        const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
        recognition.addEventListener('audioend', () => {
            console.log('Audio capturing ended');
        });  
        if (chonSlpaVl=='3'){
            botRecAnswer(document.getElementById("words").innerHTML,'en');
        }
        // say(document.getElementById("words").innerHTML,'en');
        document.getElementById('circlein').style.backgroundColor = null;
        document.getElementById("words").innerHTML = "";
    }       
}
//------------Recognition----------
function userSpeechToText(){
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.continuos=false; //neu la true thi Bot khong hd.(co the bo dong nay) 
    recognition.lang="en-US";
    recognition.start();
    document.getElementById("words").innerHTML = "";
    //Ham sau chay khi da recognition.start() bang cach nhap micON
    recognition.onstart = () => {
        document.getElementById("circlein").style.backgroundColor = "#6BD6E1";
    };
    //Ham sau lay ket qua khi su kien da chay
    recognition.addEventListener("result", e => {
        for (let i = e.resultIndex, len = e.results.length; i < len; i++) {
            let transcriptN = e.results[i][0].transcript;
            console.log(transcriptN);
            if (e.results[i].isFinal) {
                document.getElementById("words").innerHTML = transcriptN;
                // alert(document.getElementById("words").innerHTML);
            }
        }

    })
}
//----------------------
function say(message,giongnoi){
    message=catBoTextNoNeed(message);
    ndluu=message;
    let speech = new SpeechSynthesisUtterance(message);
    speech.lang = giongnoi;
    window.speechSynthesis.speak(speech);
}
//----------------------
function botRecAnswer(message){
    let textnoi=message.toLowerCase();
    let co=0;
    const giongnoi='en-US';
    for (let i=0; i < aLu.length ; i++ ) {
        let ndluu=aLu[i].toLowerCase();
        if (danhgiacau(textnoi,ndluu) > 75 && textnoi != ""){
            co=1;
            say(aLb[i],giongnoi);
        }
    }
    if (co==0){
        say("Sorry, I did not understand that.",giongnoi);
    }
}
//-----------------------------
function danhgiacau(textnoi,ndluu){
    var tleptlamtron = 0;
    let chn=ndluu;
    let chd=textnoi;
    const chnList=chn.split(" ");
    const chdList=chd.split(" ");
    if ( (chdList.length)>(chnList.length) || ndluu==''){
        tleptlamtron = 0; //alert('No idea!');    
    }else{
        sotud=0;
        chdList.forEach(hamtien);
        function hamtien(item){
                if (chn.indexOf(item)>=0){
                    sotud= sotud+1;
                }    
            }
        tleptlamtron=(100*sotud/chnList.length).toFixed();
        // alert(tleptlamtron+'%');
        return tleptlamtron;
    }
}
//--------------------------------
function xuliviechoc(chonSlsoVl,chonBaiStr,chonSlpaVl){
    // if (chonBaiStr==0){
    //     const tepmo = "./grammar/b0.html";
    //     if (doesFileExist(tepmo)){
    //         fetch(tepmo)
    //             .then(reponse => reponse.text())
    //             .then(text => document.getElementById("divActive").innerHTML=text);
    //         document.getElementById("divActive").className='tudo';
    //     }
    // }
    if (chonSlpaVl=='1'){
        var tepVideo='./videomp4/s'+chonSlsoVl+'/y_'+chonSlsoVl+'_'+chonBaiStr+'.mp4';
        if (doesFileExist(tepVideo)){
            textvid='<video width="400" height="240" id="myVideo" controls autoplay>'+
                '<source src="'+tepVideo+'" type="video/mp4">'+
                '</video>';
            document.getElementById("divActive").innerHTML=textvid;    
            document.getElementById("divActive").className='cangiua-divActive';
            slrepeat=1;
            slPlayVid();
        }else{
            const tepmo = "./grammar/b0.html";
            if (doesFileExist(tepmo)){
                fetch(tepmo)
                    .then(reponse => reponse.text())
                    .then(text => document.getElementById("divActive").innerHTML=text);
                document.getElementById("divActive").className='tudo';
            }
        }
    }
    if (chonSlpaVl=='2'){
        ndluu='';
        var tepmo="./practice/s"+chonSlsoVl+'/'+chonSlsoVl+'_'+chonBaiStr+".html";
        if (doesFileExist(tepmo)){
            fetch(tepmo)
                .then(reponse => reponse.text())
                .then(text => document.getElementById("divActive").innerHTML=text);
            document.getElementById("divActive").className='tudo';
            iddluu=null;
        }else{
            const tepmo = "./grammar/b0.html";
            if (doesFileExist(tepmo)){
                fetch(tepmo)
                    .then(reponse => reponse.text())
                    .then(text => document.getElementById("divActive").innerHTML=text);
                document.getElementById("divActive").className='tudo';
            }
        }
    }
    if (chonSlpaVl=='3'){
        //let tepjs="./talking/s"+chonSlsoVl+'/talk_'+chonSlsoVl+'_'+chonBaiStr+".js";
        // if (doesFileExist(tepjs)){
        //     //tai vao tep .js tuong ung va thuc hien cac lenh trong do
        //     const script = document.createElement('script');
        //     script.src = tepjs;
        //     // Append to the 'head' element
        //     document.head.appendChild(script);
        //     // botAnswer();
        //     script.addEventListener('load', function() {
        //         // The script is loaded completely
        //         // document.getElementById("talking").innerHTML=tepjs+" loaded. Click Mic On to talk";
        //         // alert('Da nap bai talk :'+tepjs+' .Hay bat mic de talk.')   
        //     });
        // }
        var tepmo="./practice/s"+chonSlsoVl+'/'+chonSlsoVl+'_'+chonBaiStr+".html";
        if (doesFileExist(tepmo) && chonBaiStr != 0){
            fetch(tepmo)
                .then(reponse => reponse.text())
                .then(text => document.getElementById("divActive").innerHTML="<p>Talk folow lesson:</p>"+text);
            document.getElementById("divActive").className='tudo';
            iddluu=null;
            // alert('bd saycbvaoList');
            saycbvaoList();
    
        }else{
            const tepmo = "./grammar/b0.html";
            if (doesFileExist(tepmo)){
                fetch(tepmo)
                    .then(reponse => reponse.text())
                    .then(text => document.getElementById("divActive").innerHTML=text);
                document.getElementById("divActive").className='tudo';
            }
    
        }

    }
}    
//------------------------
function doesFileExist(urlToFile) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();
    if (xhr.status == "404") {
        return false;

    } else {
        return true;
    }
}
//----------------------
function layid(tenidl){
    document.getElementById(tenidl).className='f-grid-colkhac';
    if (iddluu != tenidl && iddluu != null){
      document.getElementById(iddluu).className='f-grid-col';
    }
    iddluu=tenidl;
    var idSo = tenidl.slice(1); //ten id con lai sau khi bo di 1 ki tu. Vd 'b124' bo di 1 ki tu dau thi con lai 124 
    var message=document.getElementById(tenidl).innerHTML;
    ndluu=message=document.getElementById(tenidl).innerHTML;
    for (let i = 1; i <= slrepeat; i++) {
        if (idSo % 2 == 0){giongnoi='en-GB';} else {giongnoi='en';}
            say(message, giongnoi);
    }
}
//------------------------------
function saycb(){
    var i=0;
    let kk=null;
    soptid=0
    while (kk==null){
        i=i+1;
        let kk=document.getElementById("p"+i.toString());
        if ((kk.id).indexOf('p')>=0) {
            var message=kk.innerHTML;
            if (i % 2 == 0){
                giongnoi='en-GB';
            } else {
                giongnoi='en';}
            say(message,giongnoi);
        }
    }
}
//----------------------
function slPlayVid(){
    var vid = document.getElementById("myVideo");
    vid.onended = function() {
        slrepeat=slrepeat-1;
        if (slrepeat>0){
            // alert(bien);
            vid.play();
        }    
    };
}
//------------------------
function saycbvaoList(){
    aLu=[];
    aLb=[];

    let i=0;
    let kk=null;
    soptid=0
    let iList=-1;
    while (kk==null){
        i=i+1;
        let kk=document.getElementById("p"+i.toString());
        if ((kk.id).indexOf('p')>=0) {
            var message=kk.innerHTML;
            message=catBoTextNoNeed(message);

            if (i % 2 != 0){
                iList=iList+1
                aLu[iList]=message;
            } else {
                aLb[iList]=message;
            }
            
        }

    }


}
//-----------------------
function catBoTextNoNeed(message){
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
    message=message.slice(message.indexOf(":")+1,message.lenght);
    message=message.trim();
    return message;
}
//-----------ham chinh ---
xuliviechoc(chonSlsoVl,chonBaiStr,chonSlpaVl);