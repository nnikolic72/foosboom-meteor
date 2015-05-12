/**
 * Created by n.nikolic on 5/12/2015.
 */

Template.games.helpers({
    games: function () {
        return Games.find();
    },
    isCreatingGame: function () {
        return Session.get('isCreatingGame');
    },
    teams: function () {
        return Teams.find();
    }
});

Template.games.events({
   'submit form.form-create': function (e, tpl) {
       e.preventDefault();
       var teamOneId = tpl.$("select[name='teamOne']").val();
       var teamTwoId = tpl.$("select[name='teamTwo']").val();

       Meteor.call('gamesInsert', teamOneId, teamTwoId, function(error, response){
           if(error){
               alert(error.reason);
               Session.set('isCreatingGame', true);
               Tracker.afterFlush(function(){
                   tpl.$("select[name='teamOne']").val(teamOneId);
                   tpl.$("select[name='teamTwo']").val(teamTwoId);
               });
           }
       });

       Session.set('isCreatingGame', null);
   },
    'click a.create': function (e, tpl) {
        e.preventDefault();
        Session.set('isCreatingGame', true);
    },
    'click a.cancel': function (e, tpl) {
        e.preventDefault();
        Session.set('isCreatingGame', null);
    }
});