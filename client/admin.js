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
        return Questions.find({});
    },
    Answers: function() {
        return Answers.find({});
    },
    Questions: function(){

        var curTest = Questions.findOne({isCurrentTest:true});
        return curTest.questions;

    }

});





Template.questionsList.helpers({
    quest: function(){
        return "Quest";
    }

});


Template.usernamesList.helpers({
    usersTests: function() { // Convert the `test` object into an array of objects:
        var test = this.test;
        return _.map(Object.keys(test), function(key) {
            var answers = _.map(Object.keys(test[key]), function(question) { // also go ahead and convert this to objects
                return {question: question, answer: test[key][question]};
            });

            return {name: key, testAnswers: answers}; // resulting array looks like [{test: 'T1', testAnswers: [{question: 'Q1', answer: 'A', ...}]}]
        });
    }
});



Template.newquestionsList.helpers({


});






Template.admin.events({
    "click .next": function (event, template) {

        var q = Questions.findOne({isCurrent:true});
            var v = Questions.findOne({nr: q.nr + 1});
        if(v) {
            Questions.update({_id: q._id}, {$set: {isCurrent: false}});
            Questions.update({_id: v._id}, {$set: {isCurrent: true}});
        }

    },
    "click .previous": function (event, template) {

        var q = Questions.findOne({isCurrent:true});
        var v = Questions.findOne({nr: q.nr - 1});
        if(v) {
            Questions.update({_id: q._id}, {$set: {isCurrent: false}});
            Questions.update({_id: v._id}, {$set: {isCurrent: true}});
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
        var t = Questions.findOne({isCurrentTest: true});
        if (t) {
            Questions.update({_id: t._id}, {$set: {isCurrentTest: false}});
        }
        Questions.update({_id: this._id}, {$set:{isCurrentTest:true}});

    }
});