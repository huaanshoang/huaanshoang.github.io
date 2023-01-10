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
var aLu=[];
var aLb=[];
var nStartTalk=0;
var sotalk=1;
var indexOfaLu=-1;

var solanusertalk=0;
var solanrobottalk=0;
var diem=0;
var tleptlamtron=0;
var textnoi="";
var soptaLu=0;
var textdadich="";
var nDocDich=0;
//-------------------
function chonSlso() {    
    if(document.getElementById('Sl_mot').checked) {   
        chonSlsoVl='1';
        themoptions(chonSlsoVl);
        chonBaiStr='0';
        xuliviechoc(chonSlsoVl,chonBaiStr,chonSlpaVl);
    }

    if(document.getElementById('Sl_hai').checked) {   
        chonSlsoVl='2';
        themoptions(chonSlsoVl);
        chonBaiStr='0';
        xuliviechoc(chonSlsoVl,chonBaiStr,chonSlpaVl);
    }   
    if(document.getElementById('Sl_ba').checked) {   
        chonSlsoVl='3';
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
    while (bselect.length > 0) {
        bselect.options[0].remove();
    }
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
//------------Recognition----------
function userSpeechToText(){
    var message = document.querySelector('#words');
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; //'vi-VN';
    recognition.interimResults = false;

    recognition.start();
    message.textContent = "";
    document.querySelector("#circlein").style.backgroundColor = "#6BD6E1";

    recognition.onresult = function(event) {
        var lastResult = event.results.length - 1;
        var content = event.results[lastResult][0].transcript;
        message.textContent = content;
        textnoi=message.textContent;
        recognition.stop();
        document.querySelector("#circlein").style.backgroundColor = null;

        if (sotalk==1 && chonSlpaVl=='3'){
            document.getElementById('user-icon').style.opacity = 0.5;
            document.getElementById('user-icon').style.filter= "alpha(opacity=50)";
            botRecAnswer(textnoi); //ham nay xu li textnoi cua user trong talk 1
        }
        if (sotalk==2 && chonSlpaVl=='3'){
            document.getElementById('user-icon').style.opacity = 0.5;
            document.getElementById('user-icon').style.filter= "alpha(opacity=50)";
            userRecAnswer(textnoi); //ham nay xu li textnoi cua user trong talk 1
        }

    };
    
    // recognition.onspeechend = function() {
    //     recognition.stop();
    //     document.querySelector("#circlein").style.backgroundColor = null;
    //     document.getElementById('user-icon').style.opacity = 0.5;
    //     document.getElementById('user-icon').style.filter= "alpha(opacity=50)";
    //     document.getElementById('robot-icon').style.opacity = 0.5;
    //     document.getElementById('robot-icon').style.filter= "alpha(opacity=50)";
    //     };
    
    recognition.onerror = function(event) {
        message.textContent = 'Error occurred in recognition: ' + event.error;
    }
    document.querySelector('#robot-icon').addEventListener('click', function(){
        recognition.stop();
        document.querySelector("#circlein").style.backgroundColor = null;
    
    });
//ham nay tu dong lviec khi click vao circlein, phai dat no trong userSpeechToText()
document.querySelector('#circlein').addEventListener('click', function(){
    recognition.stop();
    // document.getElementById('words').innerHTML="";
    document.querySelector("#circlein").style.backgroundColor = null;
    document.getElementById('user-icon').style.opacity = 0.5;
    document.getElementById('user-icon').style.filter= "alpha(opacity=50)";
    document.getElementById('robot-icon').style.opacity = 0.5;
    document.getElementById('robot-icon').style.filter= "alpha(opacity=50)";
});
//ham nay tu dong lviec khi click vao words, phai dat no trong userSpeechToText()
document.querySelector('#words').addEventListener('click', function(){
    recognition.stop();
    document.getElementById('words').innerHTML="";
    document.querySelector("#circlein").style.backgroundColor = null;
    document.getElementById('user-icon').style.opacity = 0.5;
    document.getElementById('user-icon').style.filter= "alpha(opacity=50)";
    document.getElementById('robot-icon').style.opacity = 0.5;
    document.getElementById('robot-icon').style.filter= "alpha(opacity=50)";
});
}

//----------------------
function say(textnoi,giongnoi){
    textnoi=catBoTextNoNeed(textnoi);
    // ndluu=message;
    let speech = new SpeechSynthesisUtterance(textnoi);
    speech.lang = giongnoi;
    window.speechSynthesis.speak(speech);
}
//----------------------
function botRecAnswer(textnoi){
    if (sotalk==1){ //bot tu dong tra loi khi nguoi da noi 1 cau ma khong can click vao bot-icon bang cach duyet list tim tra loi
        textnoi=textnoi.toLowerCase();
        let co=0;
        const giongnoi='en-US';
        for (let i=0; i < aLu.length ; i++ ) {
            let ndluui=aLu[i].toLowerCase();
            if (danhgiacau(textnoi,ndluui) > 75 && textnoi != ""){
                co=1;
                say(aLb[i],giongnoi);
            }
        }
        if (co==0){
            say("Sorry, I did not understand that.",giongnoi);
        }
    }
}

//-----------------------------
function userRecAnswer(message){
     textnoi=message.toLowerCase();
     ndluu=ndluu.toLowerCase();
     if (danhgiacau(textnoi,ndluu) > 75 && textnoi != ""){
         diem=diem+1;
        //  alert(diem);
     }
     if (aLu.length==0){
        let tbao="Marks you got : "+(100*diem/soptaLu).toFixed()+"%";
        document.getElementById('words').innerHTML=tbao;
        diem=0;
        solanusertalk=0;
        solanrobottalk=0;
        soptaLu=0;
        document.getElementById('ntalking').innerHTML="&ensp;";

        saycbvaoList();
     }

}

//-----------------------------
function danhgiacau(textnoi,ndluu){
    textnoi=catBoTextNoNeed(textnoi);
    ndluu=catBoTextNoNeed(ndluu);
    // alert(textnoi+' : '+ndluu);
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
     if (chonBaiStr==0){
        document.getElementById('words').innerHTML="";
        document.getElementById("robot-icon").style.display = "none";
        document.getElementById("user-icon").style.display = "none";
        document.getElementById("circlein").style.display = "none";

         const tepmo = "./talking/b0.html";
         if (doesFileExist(tepmo)){
             fetch(tepmo)
                 .then(reponse => reponse.text())
                 .then(text => document.getElementById("divActive").innerHTML=text);
             document.getElementById("divActive").className='tudo';
         }
     }
    if (chonSlpaVl=='1'){
        document.getElementById('words').innerHTML="";
        document.getElementById('ntalking').innerHTML="&ensp;";
        document.getElementById("robot-icon").style.display = "none";
        document.getElementById("user-icon").style.display = "none";
        document.getElementById("circlein").style.display = "none";

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
            const tepmo = "./talking/b0.html";
            if (doesFileExist(tepmo)){
                fetch(tepmo)
                    .then(reponse => reponse.text())
                    .then(text => document.getElementById("divActive").innerHTML=text);
                document.getElementById("divActive").className='tudo';
            }
        }
    }
    if (chonSlpaVl=='2'){
        document.getElementById('words').innerHTML="";
        document.getElementById('ntalking').innerHTML="&ensp;";
        var tepmo="./practice/s"+chonSlsoVl+'/'+chonSlsoVl+'_'+chonBaiStr+".html";
        if (doesFileExist(tepmo) && chonBaiStr !== '0'){
            fetch(tepmo)
                .then(reponse => reponse.text())
                .then(text => document.getElementById("divActive").innerHTML="<p id='docdich' onclick='chondochaydich()'>Click here to select Reading or Translating</p>"+text);
            document.getElementById("divActive").className='tudo';
            //doi mau lai f-grid-col
            var r = document.querySelector(':root');
            r.style.setProperty('--mau-f-grid-col', 'rgba(184,245,114,0.883)');
            document.getElementById("robot-icon").style.display = "none";
            document.getElementById("user-icon").style.display = "none";
            document.getElementById("circlein").style.display = "none";
            // userSpeechToText();
            iddluu=null;
            // alert('bd saycbvaoList');
            // saycbvaoList();
        }else{
            const tepmo = "./talking/b0.html";
            if (doesFileExist(tepmo)){
                fetch(tepmo)
                    .then(reponse => reponse.text())
                    .then(text => document.getElementById("divActive").innerHTML=text);
                document.getElementById("divActive").className='tudo';
            }
    
        }

    }
    if (chonSlpaVl=='3'){
        //doi mau f-grid-col
        //lay tep vao
        var tepmo="./practice/s"+chonSlsoVl+'/'+chonSlsoVl+'_'+chonBaiStr+".html";
        if (doesFileExist(tepmo) && chonBaiStr !== '0'){
            fetch(tepmo)
                .then(reponse => reponse.text())
                .then(text => document.getElementById("divActive").innerHTML="<p id='khoidongtalk' onclick='startTalk()'>Click here to select Speak 1 or 2</p>"+text);
            document.getElementById("divActive").className='tudo';
            iddluu=null;
            var r = document.querySelector(':root');
            r.style.setProperty('--mau-f-grid-col', 'lightgrey');
            document.getElementById("robot-icon").style.display = "none";
            document.getElementById("user-icon").style.display = "none";
            document.getElementById("circlein").style.display = "none";
            // userSpeechToText();
            iddluu=null;
            // alert('bd saycbvaoList');
            
            // saycbvaoList();
        }else{
            const tepmo = "./talking/b0.html";
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
    ndluu=message

    message=catBoSpan(message);
    if ((nDocDich % 2) == 1 && nDocDich>0){
        translate_av(message);
    }
    
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
                soptaLu=soptaLu+1;
                // alert(soptaLu);
                aLu[iList]=message;
                indexOfaLu=indexOfaLu+1

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

    message=message.replaceAll('.', '');
    message=message.replaceAll('?', '');
    message=message.replaceAll(':', '');
    message=message.replaceAll(';', '');
    message=message.replaceAll(',', '');
    message=message.toLowerCase();
    return message;
}
//---------------------
function startTalk(){   //khoi dong lai talkUB/BU ham nay co khi lay bai text vao
if (chonSlpaVl=='3'){    
    if ((nStartTalk % 2) == 0){
        nStartTalk = nStartTalk + 1;
        document.getElementById("khoidongtalk").innerHTML="Talk: User & Bot (Click to select others)";
        document.getElementById("khoidongtalk").style.color = "blue";

        var r = document.querySelector(':root');
        r.style.setProperty('--mau-f-grid-col', 'lightgrey');
        document.getElementById("robot-icon").style.display = "none";
        document.getElementById("user-icon").style.display = "inline";
        document.getElementById("circlein").style.display = "block";
        // userSpeechToText();
        iddluu=null;

        document.getElementById("ntalking").innerHTML="&ensp;";

        document.getElementById("words").innerHTML="";

        document.getElementById('user-icon').style.opacity = 0.5;
        document.getElementById('user-icon').style.filter= "alpha(opacity=50)";
        
        sotalk=1;  
        solanusertalk=0;
        solanrobottalk=0;
        soptaLu=0;
        diem=0;
        saycbvaoList(); //aLu,aLb da dc cap nhat trong ham nay
    }else{
        nStartTalk = nStartTalk + 1;
        document.getElementById("khoidongtalk").innerHTML="Talk: Bot & User (Click to select others)";
        document.getElementById("khoidongtalk").style.color = "green";
        //cho mo 2 nut user va robot
        var r = document.querySelector(':root');
        r.style.setProperty('--mau-f-grid-col', 'lightgrey');
        document.getElementById("robot-icon").style.display = "inline";
        document.getElementById("user-icon").style.display = "inline";
        document.getElementById("circlein").style.display = "block";
        // userSpeechToText();
        // iddluu=null;

        document.getElementById("words").innerHTML="";
        document.getElementById("ntalking").innerHTML="&ensp;";

        document.getElementById('robot-icon').style.opacity = 0.5;
        document.getElementById('robot-icon').style.filter= "alpha(opacity=50)";
        document.getElementById('user-icon').style.opacity = 0.5;
        document.getElementById('user-icon').style.filter= "alpha(opacity=50)";

        sotalk=2;
        solanusertalk=0;
        solanrobottalk=0;
        soptaLu=0;
        diem=0;
        saycbvaoList(); //aLu,aLb da dc cap nhat trong ham nay
    }
}
}
//-----------------
function userIconClicked(){
    //cu moi lan click userIconClicked thi tu dong ham reccognition.star hdong va lang nghe userv phat am
    userSpeechToText();
    document.getElementById('user-icon').style.opacity = 1;
    document.getElementById('user-icon').style.filter= "alpha(opacity=100)";

    document.getElementById('robot-icon').style.opacity = 0.5;
    document.getElementById('robot-icon').style.filter= "alpha(opacity=50)";

}
//-----------------
function robotIconClicked(){
    document.getElementById('robot-icon').style.opacity = 1;
    document.getElementById('robot-icon').style.filter= "alpha(opacity=100)";

    document.getElementById('user-icon').style.opacity = 0.5;
    document.getElementById('user-icon').style.filter= "alpha(opacity=50)";
    solanrobottalk=solanrobottalk+1;
    // alert(soptaLu);
    document.getElementById('ntalking').innerHTML=solanrobottalk.toString()+'/'+soptaLu.toString();
    //lay 1 so nn trong [0,aLu.lenght]
    
    let nrand = Math.floor(Math.random()*aLu.length);
    // alert(ndluu);
    say(aLu[nrand],giongnoi);
    ndluu=aLb[nrand]
    //lay ra bo di pt tai nrand
    aLu.splice(nrand,1);
    aLb.splice(nrand,1);

    //user nhan nut de tra loi
}
//-----------------------
function translate_av(message){
    let text=message;
    // if(!message) return;
    // const countries = {"en-GB": "English","vi-VN": "Vietnamese"};   
    const toText = document.querySelector("#words");
    // translateBtn = document.querySelector("button");
    
    // translateBtn.addEventListener("click", () => {
    //     text = document.querySelector("#p1").textContent;
    let translateFrom = "en-GB";
    let translateTo = "vi-VN";
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;

    fetch(apiUrl).then(res => res.json()).then(data => {
        toText.textContent = data.responseData.translatedText;
        data.matches.forEach(data => {
            if(data.id === 0) {
                toText.textContent = data.translation;
            }
        });
        // alert(toText.textContent); //thong bao text da dich ra
    });

}
//--------------------------
function catBoSpan(message){

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
//------------------------
function chondochaydich(){
    if (chonSlpaVl=='2'){    
        if ((nDocDich % 2) == 0){
            nDocDich = nDocDich + 1;
            document.getElementById("docdich").innerHTML="For Reading & Translating (click on rows)";
            document.getElementById("docdich").style.color = "blue";
            document.getElementById("words").innerHTML="";
        }else{
            nDocDich = nDocDich + 1;
            document.getElementById("docdich").innerHTML="Only for Reading (click on rows)";
            document.getElementById("docdich").style.color = "green";
            document.getElementById("words").innerHTML="";
        }    
    }
}
    
//-----------ham chinh ---
themoptions(chonSlsoVl)
xuliviechoc(chonSlsoVl,chonBaiStr,chonSlpaVl);
// document.getElementById('listen-icon').style.opacity = .7;
// document.getElementById('listen-icon').style.filter= "alpha(opacity=50)";
document.getElementById('speak-icon').style.opacity = .7;
document.getElementById('speak-icon').style.filter= "alpha(opacity=50)";

document.getElementById("robot-icon").style.display = "none";
document.getElementById("user-icon").style.display = "none";
document.getElementById("circlein").style.display = "none";
//api key for chatbot python 29-12-22
//6872f5ecb8f26fe4bb0bd2cb0945ed08364d984f
