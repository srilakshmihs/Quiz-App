const express = require('express');
const xlsx = require('xlsx')
const path = require('path');
const cookieParser = require('cookie-parser')
// const bodyParser = require('body-parser');
// var bodyParser = require('body-parser')

const app = express();

// app.use(express.json());
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser())
// var jsonParser = bodyParser.json()

// var urlencodedParser = bodyParser.urlencoded({ extended: false })

// app.use(bodyParser.json());

// app.use(express.urlencoded({ extended: false }))

const xl = xlsx.readFile('Data.xlsx')

const user = xl.Sheets['Users']

const bank = xl.Sheets['Bank']

const data = xlsx.utils.sheet_to_json(user)

const ques = xlsx.utils.sheet_to_json(bank)

app.use("/public", express.static(__dirname+'/public'));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, './index.html'))
});

app.get("/questions", (req, res) => {
    res.sendFile(path.resolve(__dirname, './ques.html'))
});

app.get("/getName", (req, res) => {
    res.json({name : req.cookies.name})
});

app.get("/final", (req, res) => {
    res.sendFile(path.resolve(__dirname, './acknowledgement.html'))
});

app.get("/getQues", (req, res) => {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>");
    console.log(ques);
    console.log(ques.length);
    var ran1 = Math.floor((Math.random() * ques.length) + 1)
    var ran2 = Math.floor((Math.random() * ques.length) + 1)
    while(ran2 == ran1){
        ran2 = Math.floor((Math.random() * ques.length) + 1)
    }
    console.log(ran1+"  "+ ran2);
    question = {
        One : {
            qID : ques[ran1-1].QuestionID,
            qText : ques[ran1-1].QuestionText,
            qA : ques[ran1-1].OptionA,
            qB : ques[ran1-1].OptionB,
            qC : ques[ran1-1].OptionC,
            qD : ques[ran1-1].OptionD,
            qType : ques[ran1-1].QuestionType
        },
        Two : {
            qID : ques[ran2-1].QuestionID,
            qText : ques[ran2-1].QuestionText,
            qA : ques[ran2-2].OptionA,
            qB : ques[ran2-2].OptionB,
            qC : ques[ran2-2].OptionC,
            qD : ques[ran2-2].OptionD,
            qType : ques[ran2-1].QuestionType
        }
    }
    res.json(question)
});


app.post("/me", (req, res) => {
    console.log("===================")
    const mail = req.body.mail;
    console.log(req.body.mail);
    console.log(data)
    var result = false
    data.forEach(e => {
        if (e.Email == mail && !result) {
            result = true;
            res.cookie('name', e.Name)
            // res.send(result)
        }
    });
    res.send(result)
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, (req, res) => {
    console.log(`Server Started at PORT 3000`);
});
