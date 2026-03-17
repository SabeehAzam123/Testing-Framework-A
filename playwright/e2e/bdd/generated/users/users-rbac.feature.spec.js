// Generated from: ..\e2e\bdd\features\users\users-rbac.feature
import { test } from "../../../../support/bdd.fixtures.ts";

test.describe('Users RBAC', () => {

  test('Staff is read-only on users page', async ({ Given, When, Then, And, page }) => { 
    await Given('I am logged in as a staff user through the UI', null, { page }); 
    await When('I open the users page', null, { page }); 
    await Then('the create user button should be disabled', null, { page }); 
    await And('the RBAC hint should be visible', null, { page }); 
    await And('the edit and delete actions should be disabled for the first user row', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('..\\e2e\\bdd\\features\\users\\users-rbac.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":3,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am logged in as a staff user through the UI","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When I open the users page","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then the create user button should be disabled","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"And the RBAC hint should be visible","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"And the edit and delete actions should be disabled for the first user row","stepMatchArguments":[]}]},
]; // bdd-data-end