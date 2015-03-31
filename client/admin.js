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
    Questions: function() {
        return Questions.find({});
    },
    Answers: function() {
        return Answers.find({});
    }
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

    }
});