import Ember from 'ember';

export default Ember.Component.extend({
  supported:       null,

  actions: {
    toggleSupport: function(){
      var self = this;
      this.container.lookup('service:supports').find(this.get('previousSupportQuery')).then(function(resources) {
        if( Ember.isEmpty(resources) ) {
          self.addSupport();
        } else {
          self.removeSupport(resources);
        }
      });
    }
  },

  addSupport: function() {
    var support = this.container.lookupFactory('model:supports').create();
    support.addRelationship('proposal', this.get('proposal.id'));
    support.addRelationship('participant', this.get('participant.id'));

    this.store.createResource('support', support);
    this.set('supported', true);
  },

  removeSupport: function(resources) {
    this.store.deleteResource('support', resources.get('firstObject'));
    this.set('supported', false);
  },

  setSupportedOrNot: function() {
    var self = this;
    this.container.lookup('service:supports').find(this.get('previousSupportQuery')).then(function(resources) {
      if( Ember.isEmpty(resources) ) {
        self.set('supported', false);
      } else {
        self.set('supported', true);
      }
    });
  }.on('didInsertElement'),

  previousSupportQuery: Ember.computed('proposal.id', 'participant.id', function() {
    return {
      query: {
        filter: {
          proposal_id: this.get('proposal.id'),
          participant_id: this.get('participant.id')
        }
      }
    };
  })

  // FIXME: wasn't working before setting up multiple models on the route,
  // might work now. Would clean up the main toggleSupport action and
  // save a request checking for supports
  //
  // alreadySupported: Ember.computed('proposal.id', function() {
  //   return !Ember.isEmpty(this.get('previousSupport'));
  // }),
  //
  // previousSupport: Ember.computed('proposal.id', 'participant.id', function() {
  //   var query = {
  //     query: {
  //       filter: {
  //         proposal_id: this.get('proposal.id'),
  //         participant_id: this.get('participant.id')
  //       }
  //     }
  //   };
  //
  //   var PromiseObject = Ember.ObjectProxy.extend(Ember.PromiseProxyMixin);
  //   return PromiseObject.create({
  //     promise: this.container.lookup('service:supports').find(query)
  //   });
  // })
});
