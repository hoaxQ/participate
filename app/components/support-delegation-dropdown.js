import Ember from 'ember';

export default Ember.Component.extend({
  participants: null,

  actions: {
    delegateSupport: function(participantName) {
      const flashMessages = Ember.get(this, 'flashMessages');
      flashMessages.success('Delegated support option to' + participantName);
    }
  },

  _fetchParticipants: function() {
    let self = this;
    this.container.lookup('service:participants').find().then(function(resources) {
      self.set('participants', resources);
    });
  }.on('didInsertElement')
});
