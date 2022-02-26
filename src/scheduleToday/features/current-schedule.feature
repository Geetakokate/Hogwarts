Feature: CurrentSchedule
    It displays students current schedule

    Scenario: Horace Slughorn is allocated to Harry Potter for Potions Master
        Given Harry Potter is studying from Horace Slughorn
        When Horace Slughorn is allocated to Harry Potter
        * Horace is Present
        Then Harry is assigned to Horace

    Scenario: No teacher is allocated to Harry Potter for Potions Master
        Given Harry is studying from Rubeus Hagrid
        When Rubeus is higher up in priority
        * Rubeus is present
        Then Harry is assigned to Rubeus

    Scenario: Horace Slughorn is allocated to Harry Potter but he is absent
        Given Harry is studying from Rubeus Hagrid
        When Horace is absent
        * Rubeus is higher up in priority
        * Rubeus is present
        Then Harry is assigned to Rubeus

    Scenario: Horace Slughorn is allocated to Harry Potter for Potions Master. But Horace and standby teacher is absent
        Given Harry is studying from Minerva McGonagall
        When Horace is absent
        * standby teacher is absent
        * Minerva is present
        Then Harry is assigned to Minerva

    Scenario: Horace Slughorn is allocated to Harry Potter. He was absent but he is present now
        Given Harry is studying from Horace
        When Horace was absent and changed attendance to present
        Then Harry is assigned to Horace Slughorn