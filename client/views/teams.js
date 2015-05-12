/**
 * Created by n.nikolic on 5/11/2015.
 */

Template.teams.helpers({
    title: 'Teams',
    teams: function () {
        return Teams.find();
    },
    isCreatingTeam: function () {
        return Session.get('isCreatingTeam');
    }
});

Template.teams.events({
    'click .create': function (e, tpl) {
        e.preventDefault();
        Session.set('isCreatingTeam', true);

    },
    'submit form.create-team': function (e, tpl) {
        e.preventDefault();
        var teamName = tpl.$('input[name=name]').val();
        Teams.insert({name: teamName, ownerId: Meteor.userId()},
            function (error, _id) {
                if (error) {
                    alert(error);
                    Session.set('isCreatingTeam', true);
                    Tracker.afterFlush( function() {
                        tpl.$('input[name=name]').val(teamName);
                    })

                }
            })
    },
    'click .cancel': function (e, tpl) {
        e.preventDefault();
        Session.set('isCreatingTeam', false);

    }

});