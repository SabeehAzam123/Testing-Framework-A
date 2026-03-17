Feature: Users RBAC

  Scenario: Staff is read-only on users page
    Given I am logged in as a staff user through the UI
    When I open the users page
    Then the create user button should be disabled
    And the RBAC hint should be visible
    And the edit and delete actions should be disabled for the first user row