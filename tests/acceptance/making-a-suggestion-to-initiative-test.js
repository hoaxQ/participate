import startApp from 'participate-frontend/tests/helpers/start-app';
import Resolver from 'participate-frontend/tests/helpers/resolver';

var App;

var expect = chai.expect

suite('Making a suggestion to an initiative', {
  setup: function(){
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('Successfully', function(){
  visit('/initiatives/1').then(function() {
    expect( $("a:contains('Make a suggestion')").length ).to.equal(0);
    expect(find('.new_suggestion').text()).to.equal('Note: To make suggestions for an initiative, you must first support it');
    click( $("a:contains('Support this initiative')") ).then(function() {
      click( $("a:contains('Make a suggestion')") ).then(function() {
        expect($(':submit').attr('disabled')).to.equal('disabled');
        expect(currentURL()).to.equal('/initiatives/1/suggestions/new');
        fillIn('div.details textarea', "Make sure there's a doctor available for house calls");
        click('form input[type=submit]').then(function() {
          expect(currentURL()).to.equal('/initiatives/1');
          expect(find('.suggestion').first().text()).to.equal("Make sure there's a doctor available for house calls");
        });
      });
    });     
  });
});
