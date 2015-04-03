Template.quizmain.helpers({



    Questions: function () {
        return Questions.find({});


    },

    Tests: function(){

        return Questions.find({});
    },

    Test: function() {

/*
        var test = this.test;
        return _.map(Object.keys(test), function(key) {
            var answers = _.map(Object.keys(test[key]), function(question) { // also go ahead and convert this to objects
                return {question: question, answer: test[key][question]};
            });

            return {name: key, testAnswers: answers}; // resulting array looks like [{test: 'T1', testAnswers: [{question: 'Q1', answer: 'A', ...}]}]
        });
        */

        var curTest = Questions.findOne({isCurrentTest:true});

        pos = curTest.questions.map(function(e) { return e.isCurrent; }).indexOf(true);
        console.log(pos);
        return curTest.questions[pos];





    }
});


Template.quizmain.events({

   "click .answer": function(event, template){
        alert(event.currentTarget.id);



   }


});
