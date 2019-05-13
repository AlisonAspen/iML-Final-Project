//word to vec translator
let inputWords = [];
let w2vOutput = [];

const wordVec = ml5.word2vec('data/wordvecs5000.json', modelReady);
let modelStatus;

function setup(){
     noCanvas();
     titleHolder = createDiv();
     titleHolder.id("holder");
     title = createElement("h1", "COPYCAT");
     titleHolder.child(title);
     title.class("titleText");

     inputHolder = createDiv();
     inputHolder.id("holder");
     userInput = createInput();
     inputButton = createButton("Enter");
     inputButton.mousePressed(processInput);
     inputButton.position(userInput.x + userInput.width, userInput.y);
     inputHolder.child(userInput);
     inputHolder.child(inputButton);

}
function modelReady(){
     console.log("ready!");


}
function keyPressed(){
     if(keyCode === RETURN){
          processInput();
     }

}
function processInput(){
     sentence = userInput.value().toLowerCase();
     userWords = sentence.split(',');
     userWords = sentence.split(',');
     userWords = sentence.split(' ');
     userInput.value('');

     for(var i = 0; i < userWords.length; i++){
          inputWords.push(userWords[i]);
     }
     chat();
}
function chat(){
     console.log(inputWords);
     let resultHolder = createDiv();
     resultHolder.id('resultHolder');
     for(var i = 0; i < userWords.length; i++){
          wordVec.nearest(userWords[i], function(err, results){
               if(err){
                    console.log(err);
               }
               for(var i = 0; i < results.length; i++){
                    console.log(results[i].word);
                    console.log(results[i].distance);

                    if(results[i].distance <= 0.7){
                         let vecResults = createP(results[i].word);
                         vecResults.id('vecResults');
                         resultHolder.child(vecResults);
                         break;
                    }
                    else if(results[i].distance > 0.7 && results[i].distance < 0.8){
                         let vecResults = createP(results[i].word);
                         resultHolder.child(vecResults);
                         vecResults.id('vecResults');
                         break;
                    }
                    else if(results[i].distance >= 0.8 && results[i].distance < 1.5){
                         let vecResults = createP(results[i].word);
                         resultHolder.child(vecResults);
                         vecResults.id('vecResults');
                         break;
                    }

               }
          });
     }
     let spacer = createElement('br');

}
