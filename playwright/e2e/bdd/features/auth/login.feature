Feature: Login

  Scenario: Admin logs in successfully
    Given I am on the login page
    When I log in as an admin through the UI
    Then I should land on the dashboard