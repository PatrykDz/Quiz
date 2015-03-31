Template.nav.helpers({
    loggedadmin: function() {
        if(Meteor.user().username=="admin"){
            return true;
        }else {
            return false;
        }
    }

});
