Router.route('admin',
    {
        path:'/admin',
        template:'admin'
    });

Handlebars.registerHelper('arrayify',function(obj){
    result = [];
    for (var key in obj) result.push({name:key,value:obj[key]});
    return result;
});


Template.admin.helpers({
    Tests: function() {
        return Tests.find({});
    },
    UserAnswers: function() {
        return UserAnswers.find({});
    },
    Questions: function(){

        var curTest = Tests.findOne({"isCurrent":true});

        return Questions.find({"test_id":curTest._id});
    },
    Answers: function() {
        var curTest = Tests.findOne({"isCurrent":true});
        //console.log(curTest._id);

        var curQuestion = Questions.findOne({"test_id":curTest._id, "isCurrent":true});

        return Answers.findOne({"question_id":curQuestion._id});

    }

});


Template.admin.events({
    "click .next": function (event, template) {

        var curTest = Tests.findOne({"isCurrent":true});
        var curQuestion = Questions.findOne({"test_id": curTest._id, "isCurrent":true});

        var next = Questions.findOne({question_nr: curQuestion.question_nr + 1});

        if(next) {
            Questions.update({_id: curQuestion._id}, {$set: {isCurrent: false}});
            Questions.update({_id: next._id}, {$set: {isCurrent: true}});
        }

    },
    "click .previous": function (event, template) {

        var curTest = Tests.findOne({"isCurrent":true});
        var curQuestion = Questions.findOne({"test_id": curTest._id, "isCurrent":true});

        var prev = Questions.findOne({question_nr: curQuestion.question_nr - 1});

        if(prev) {
            Questions.update({_id: curQuestion._id}, {$set: {isCurrent: false}});
            Questions.update({_id: prev._id}, {$set: {isCurrent: true}});
        }

    },
    "click .question": function (event, template) {
        //alert("My q was clicked!"+this._id);
        var q = Questions.findOne({isCurrent: true});
        if (q) {
        Questions.update({_id: q._id}, {$set: {isCurrent: false}});
      }
        Questions.update({_id: this._id}, {$set:{isCurrent:true}});

    },
    "click .test": function (event, template) {
       //alert("My q was clicked!"+this._id);
        var t = Tests.findOne({isCurrent: true});
        if (t) {
            Tests.update({_id: t._id}, {$set: {isCurrent: false}});
        }
        Tests.update({_id: this._id}, {$set:{isCurrent:true}});

    },

    "submit .addTest": function(events, template){

        events.preventDefault();

        if(Tests.findOne({}, {sort: {test_nr: -1}, limit: 1}) !== undefined) {

            var lastTest_nr = Tests.findOne({}, {sort: {test_nr: -1}, limit: 1}).test_nr;
        }else{
            lastTest_nr = 0;
        }
        console.log(lastTest_nr);
        console.log(events.target.testName.value);
        Tests.insert({"test_nr":lastTest_nr+1, "name":events.target.testName.value, "isCurrent":false});

        events.target.testName.value="";


    },
    "submit .addQuestion": function(events, template){
        events.preventDefault();
        var curTest = Tests.findOne({"isCurrent":true});
        //var lastTest = Tests.findOne({}, {sort: {test_nr: -1}, limit: 1});
        if(Questions.findOne({"test_id":curTest._id}, {sort: {question_nr: -1}, limit: 1}) !== undefined) {
            var lastQuestion_nr = Questions.findOne({"test_id": curTest._id}, {
                sort: {question_nr: -1},
                limit: 1
            }).question_nr;
        }else{
            lastQuestion_nr=0;
        }
        console.log(lastQuestion_nr);
        Questions.insert({"test_id":curTest._id, "question_nr":lastQuestion_nr+1, "question":events.target.question.value, "isCurrent":false});
        events.target.question.value="";
    },
    "submit .addAnswers": function(events, template){
        events.preventDefault();
        var curTest = Tests.findOne({"isCurrent":true});
        var curQuestion = Questions.findOne({"test_id": curTest._id, "isCurrent":true});

        Answers.insert({
                "question_id":curQuestion._id,
                "A":events.target.A.value,
                "B":events.target.B.value,
                "C":events.target.C.value,
                "D":events.target.D.value
        });
    },
    "click .delete_question": function(events,template){

        //alert(this.question);


        if(Answers.findOne({"question_id":this._id}) !== undefined) {

            var answer = Answers.findOne({"question_id": this._id});

            Answers.remove(answer._id);

        }else{
            Questions.remove({"_id":this._id});
        }


    },

    "keypress": function(e) { console.log('key', e); }





});



Template.UAnswers.helpers({

    UserAnswered: function(){

        var curTest = Tests.findOne({"isCurrent":true});
        var curQuestion = Questions.findOne({"test_id": curTest._id, "isCurrent":true});

        console.log(curQuestion);

        return UserAnswers.find({"question_id":curQuestion._id});


    }

});
