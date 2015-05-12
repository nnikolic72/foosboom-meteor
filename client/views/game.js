/**
 * Created by n.nikolic on 5/12/2015.
 */

Template.game.helpers({
    isEditingGame: function () {
        return this._id == Session.get('gameEditingID');

    }
});

Template.game.events({
   'click a.edit-game': function(e, tpl) {
       e.preventDefault();
       Session.set('gameEditingID', this._id);
   },
    'click a.cancel': function(e, tpl) {
        e.preventDefault();
        Session.set('gameEditingID', null);
    },
    'click a.delete-game': function(e, tpl) {
        e.preventDefault();

        var l_teams = this.teams;
        var gameId = this._id;

        // remove gameIds from teams
        Games.remove( gameId, function removeGameIds(error) {
                if (!error) {
                    Teams.update( { _id : l_teams[0].id }, { $pull: { gameIds: gameId } } );
                    Teams.update( { _id : l_teams[1].id }, { $pull: { gameIds: gameId } } );
                } else {
                    return error;
                }
            }
        );

    },
    "click a.score": function(e, tpl){
        e.preventDefault();
        var data = $(e.currentTarget).data();
        var update = {$inc: {}};
        var selector = "teams." + data.index + ".score";
        update.$inc[selector] = data.inc;
        Games.update({_id: this._id}, update);
    },
    "click a.finish-game": function(e, tpl){
        e.preventDefault();
        Games.update({_id: this._id}, {$set: {completed: true}});
    },
});