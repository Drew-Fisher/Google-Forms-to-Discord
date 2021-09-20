var POST_URL = "PASTE_WEBHOOK_URL_HERE";

const footers =  [
  "These picks are SPICY!!!!!!",
  "RNGesus approves",
 "I ran out of things to say...",
 "Showcase Greatness",
 "May Timb Kench be with you",
 "you sure about those picks?",
 "These picks gonna be tough to beat",
 "CHA CHAAAAA!!!!!!",
 "these picks are blessed by the fish gods",
 "gg noobs",
 "these picks are the bees knees",
 "this is where I would put an emoji if discord would let me",
 "...really you sure?",
 "TANG GANG!!!!!!!"
 ];

function onSubmit(e) {
    var form = FormApp.getActiveForm();
    var allResponses = form.getResponses();
    var latestResponse = allResponses[allResponses.length - 1];
    var response = latestResponse.getItemResponses();
    var items = [];
    var name = form.getTitle();
    var question;

    for (var i = 0; i < response.length; i++) {
        if(i == 0){
            question = "Name:";
        }
        else{
            question = response[i].getItem().getTitle();
        }
        
        var answer = response[i].getResponse();
        try {
            var parts = answer.match(/[\s\S]{1,1024}/g) || [];
        } catch (e) {
            var parts = answer;
        }

        if (answer == "") {
            continue;
        }
        for (var j = 0; j < parts.length; j++) {
            if (j == 0) {
                items.push({
                    "name": question,
                    "value": parts[j],
                    "inline": false
                });
            } else {
                items.push({
                    "name": question.concat(" (cont.)"),
                    "value": parts[j],
                    "inline": false
                });
            }
        }
    }

    var options = {
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
        },
        "payload": JSON.stringify({
            "content": "‌",
            "embeds": [{
                "title": name,
              "color": 238644,
                "fields": items,
                "footer": {
                    "text": randomFooter()
                }
            }]
        })
    };
    UrlFetchApp.fetch(POST_URL, options);
};

function randomFooter(){
  return footers[Math.floor(Math.random() * footers.length)];
}