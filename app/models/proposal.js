import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
import _ from 'lodash/lodash';

const { inject: { service }, computed } = Ember;

export default Model.extend({
  title: attr(),
  body:  attr(),
  'support-count': attr(),

  author:   hasOne(),
  supports: hasMany(),

  authoredByMe: computed('author.id', 'me.id', function() {
    return this.get('author.id') === this.get('me.id');
  }),

  backedByMe: computed('supports.[]', 'me.supports.[]', function() {
    return this.get('me').supporting(this);
  })
});
