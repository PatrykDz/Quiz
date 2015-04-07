Template.quizmain.helpers({



    Questions: function () {

        var curTest = Tests.findOne({"isCurrent":true});
        //console.log(curTest._id);

        return Questions.findOne({"test_id":curTest._id, "isCurrent":true});


    },

    Answers: function() {
        var curTest = Tests.findOne({"isCurrent":true});
        //console.log(curTest._id);

        var curQuestion = Questions.findOne({"test_id":curTest._id, "isCurrent":true});

        return Answers.findOne({"question_id":curQuestion._id});

    },



    Tests: function(){

        return Tests.find({});
    },

    Test: function() {

        return Tests.findOne({"isCurrent":true});




/*
        var test = this.test;
        return _.map(Object.keys(test), function(key) {
            var answers = _.map(Object.keys(test[key]), function(question) { // also go ahead and convert this to objects
                return {question: question, answer: test[key][question]};
            });

            return {name: key, testAnswers: answers}; // resulting array looks like [{test: 'T1', testAnswers: [{question: 'Q1', answer: 'A', ...}]}]
        });










        var curTest = Questions.findOne({isCurrentTest:true});

        pos = curTest.questions.map(function(e) { return e.isCurrent; }).indexOf(true);
        console.log(pos);
        return curTest.questions[pos];



 */

    }
});


Template.quizmain.events({

   "click .answer": function(event, template){
        alert(event.currentTarget.id);



   }


});
