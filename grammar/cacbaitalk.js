function chonHamWith(cuon,bai,message){

    switch(true){
        case (cuon=="1" && bai=="1"):
            bai_1_1(message);
            break;
            
        case (cuon=="1" && bai=="2"):
            bai_1_2(message);
            break;
        case (cuon=="1" && bai=="3"):
            bai_1_3(message);
            break;
        default:
            break;
    }

}




function bai_1_1(message){

const aListU=[];
const aListB=[];

aListU[0]='Hello.';
aListB[0]='Hello.';

aListU[1]='David Clark.';
aListB[1]='Linda Rivera.';

aListU[2]='Are you a teacher';
aListB[2]="No, I'm not.";

aListU[3]='Are you a student';
aListB[3]='Yes, I am.';

aListU[4]='Are you from the United States';
aListB[4]="No, I'm not.";

aListU[5]="Where are you from";
aListB[5]="I'm from Canada.";

aListU[6]="Hello Kenji";
aListB[6]="Hi, John. How are you";

aListU[7]="Fine, thanks. And you";
aListB[7]="Fine thanks.";
var co =0;
const giongnoi='en';
for (let i=0; i<=7;i++ ) {
    if (aListU[i].includes(message)){
        co=1;
        say(aListB[i],giongnoi);

    }    
}
if (co==0){
    say("Sorry, I did not understand that.",giongnoi);

}
}


    // let speech = new SpeechSynthesisUtterance(message);
    // speech.lang = giongnoi;
    // window.speechSynthesis.speak(speech);



