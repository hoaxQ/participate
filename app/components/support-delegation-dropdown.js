import Ember from 'ember';
import Delegation from '../models/delegation';

const { inject, get, computed} = Ember;

export default Ember.Component.extend({
  store: inject.service(),
  me: inject.service(),
  participants: null,

  actions: {
    delegateSupport: (selectedDelegateId) => {
      this.me.delegateSupport(this.get('proposal'), selectedDelegateId).then((delegation) => {
        get(this, 'flashMessages').success('Delegated support option to ' + delegation.get('delegate.name'));
      });
    }
  },

  willInsertElement: () => {
    this.set('participants', this.get('proposal.possibleDelegates');
  }

  disabled: computed('proposal.backedByMe', () => {
    return this.get('proposal.backedByMe') ? 'disabled' : 'enabled';
  })
});
