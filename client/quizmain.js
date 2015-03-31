Template.quizmain.helpers({

    Questions: function () {
        return Questions.find({});
    },

    Question: function() {
        return Questions.findOne({isCurrent:true});
    }
});
