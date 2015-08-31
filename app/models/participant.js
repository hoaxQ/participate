import Ember from 'ember';
import Resource from './resource';
import { attr, hasOne, hasMany } from 'ember-jsonapi-resources/models/resource';

export default Resource.extend({
  type: 'participants',
  service: Ember.inject.service('participants'),

  /*
  title: attr(),
  date: attr(),

  author: hasOne('author'),
  comments: hasMany('comments')
  */
});
