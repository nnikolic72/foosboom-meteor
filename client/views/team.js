/**
 * Created by n.nikolic on 5/11/2015.
 */

Template.team.helpers({
    isEditingTeam: function () {
        return Session.get('editedTeamId') === this._id;
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

        var teamName = tpl.$('input[name="name"]').val();
        if(teamName.length){
            Teams.update(this._id, {$set: {name: teamName}});
            Session.set('editedTeamId', null);
        }
    }
});