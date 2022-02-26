Feature: TeachersList
    It displays teachers list with name and attendance

    Scenario: Changing teachers attendance
        Given teachers list currently look like
        When change one of teachers attendance to absent
        Then should update in table
