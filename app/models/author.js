import Ember from 'ember';
import Resource from './resource';
import { attr, hasOne, hasMany } from 'ember-jsonapi-resources/models/resource';

export default Resource.extend({
  type: 'authors',
  service: Ember.inject.service('authors'),

  name: attr(),

  proposals: hasMany('proposals'),
  supports: hasMany('supports'),
  suggestions: hasMany('suggestions')
});
