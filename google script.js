var POST_URL = "PASTE_WEBHOOK_URL_HERE";


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
                    "text": getFooter()
                }
            }]
        })
    };
    UrlFetchApp.fetch(POST_URL, options);
};

function randomFooter(){
  return footers[Math.floor(Math.random() * footers.length)];
}


const secretRareFooters = {
    level_1: "RNGesus has blessed your picks",
    level_2: "the fish gods have blessed your picks",
    level_3: "Timb Kench has blessed your picks"
};

const ultraRareFooters = [
    "I ran out of things to say...",
    "May Timb Kench be with you",
    "TANG GANG!!!!!!!",
    "RNGesus approves"
];

const rareFooters = [
    "Joseuwu",
    "gg noobs",
    "PALAFAKER",
    "Sushi restaurant",
    "Shiro",
    "DREAM on",
    "SC Johnsun",
    "I found a nickel!",
    "Never trust a jelly bean from tricia",
    "can I get a Tripple Cheeseburger with a side of Azir",
];

const uncommonFooters = [
    "¡Eres el número uno",
    "CHA CHAAAAA!!!!!!",
    "these picks are the bees knees",
    "These picks are SPICY!!!!!!",
    "you sure about those picks?",
    "CONSUME",
    "EL TUKI"
];

const commonFooters = [
"¡Puedes hacerlo!",
"Sigue con el buen trabajo!!",
"#FLYWIN",
"These picks gonna be tough to beat",
"Showcase Greatness",
"...really you sure?",
"this is where I would put an emoji if discord would let me"
];

function getFooter(){
    var num = Math.floor(Math.random() * 1001);
    switch(true){
        case(num <= 400):
            return commonFooters[Math.floor(Math.random() * commonFooters.length)];
        case(num <= 700):
            return uncommonFooters[Math.floor(Math.random() * uncommonFooters.length)];
        case(num <= 900):
            return rareFooters[Math.floor(Math.random() * rareFooters.length)];
        case(num <= 995):
            return ultraRareFooters[Math.floor(Math.random() * ultraRareFooters.length)];
        case(num > 995):
            return getSecretRare();
        default:
            return commonFooters[Math.floor(Math.random() * footers.length)];

    }
}

function getSecretRare(){
    var num = Math.floor(Math.random() * 11);
    switch(true){
        case(num < 6):
            return secretRareFooters["level_1"];
        case(num < 9):
            return secretRareFooters["level_2"];
        case(num > 9):
            return secretRareFooters["level_3"];
        default:
            return secretRareFooters["level_1"];
    }
}