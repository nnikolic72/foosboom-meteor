/**
 * Created by n.nikolic on 5/11/2015.
 */

Template.team.helpers({
    editedTeamId: function () {
        return Session.get('editedTeamId') === this._id;
    },
    isEditingTeam: function () {
        return Session.get('isEditingTeam');
    }
});

Template.team.events({
    'click a.remove': function(e, tpl) {
        e.preventDefault();
        //console.log(this);
        Teams.remove({_id: this._id});
    },
    'click a.edit': function (e, tpl) {
        e.preventDefault();
        Session.set('editedTeamId', this._id);
    },
    'click a.cancel': function (e, tpl) {
        e.preventDefault();
        Session.set('editedTeamId', null);
    },
    'submit form.edit-team': function (e, tpl) {
        e.preventDefault();

        var teamName = tpl.$("input[name='name']").val();
        var self = this;

        if(teamName.length){
            Meteor.call("teamUpdate", this._id, teamName, function(error){
                if(error){
                    alert(error.reason);
                    Session.set('editedTeamId', self._id);
                    Tracker.afterFlush(function(){
                        tpl.$("input[name='name']").val(teamName);
                        tpl.$("input[name='name']").focus();
                    });
                }
            });

            Session.set('isEditingTeam', null);
            Session.set('editedTeamId', null);

        }
    }
});