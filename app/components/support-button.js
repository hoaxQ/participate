import Ember from 'ember';

const { inject: { service }, computed } = Ember;

export default Ember.Component.extend({
  supportSwitch:  service('support-switch'),

  actions: {
    toggleSupport() {
      this.get('supportSwitch').toggleSupport(this.get('proposal'));
    }
  },

  // TODO: figure out who to handle button text changes.
  // clicks between mouseEnter and mouseLeave complicate things
  // 
  // mouseEnter() {
  //   if(this.get('text') == 'Backing') {
  //     this.set('text', 'Remove support');
  //   }
  // },

  // mouseLeave() {
  //   if(this.get('text') == 'Remove support') {
  //     this.set('text', this.get('originalText'));
  //   }
  // },

  disabled: computed('supportSwitch', 'proposal', function() {
    return this.get('supportSwitch').disabled(this.get('proposal')) ? 'disabled' : '';
  }),

  text: computed('proposal.backedByMe', function() {
    return this.get('proposal.backedByMe') ? 'Backing' : 'Add your support';
  })
});
