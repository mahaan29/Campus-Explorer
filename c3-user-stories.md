Please edit this template and commit to the master branch for your user stories submission.   
Make sure to follow the *Role, Goal, Benefit* framework for the user stories and the *Given/When/Then* framework for the Definitions of Done! You can also refer to the examples DoDs in [C3 spec](https://sites.google.com/view/ubc-cpsc310-21w2-intro-to-se/project/checkpoint-3).

## User Story 1
As a Course Administrator, I want to be able to select a dataset and enter one string value(department name), so that Course Sections with the same Department name as the string value can be retrieved and the admin can see all the course offerings in detail.


#### Definitions of Done(s)
Scenario 1: Successful query results
Given: The server needs to be running and must be able to accept user requests and the dataset to be queried is already added to the application.
When: The user selects a database and enters a search string.
Then: The application accepts the query and returns the Response Code: 200 along with a corresponding array with the required results in a tabluar form.

Scenario 2: Unsuccessful query results
Given: The server needs to be running and must be able to accept user requests and the dataset to be queried is already added to the application.
When: The user selects a database and enters a string to search using the "Find Course Section(s) - Department" button.
Then: The application accepts the query and returns the Response Code: 400 along with a corresponding message.

## User Story 2
As a Professor, I want to able to select a dataset and enter two numeric values(two grades defining a range), so that all the Course Sections whose average lies between the given values can be retrieved and extract insights about the class performance, compare with previous classes and analyze important information.


#### Definitions of Done(s)
Scenario 1: Successful query results
Given: The server needs to be running and must be able to accept user requests and the dataset to be queried is already added to the application.
When: The user selects a database and enters two numeric values to search using the "Find Course Section(s) - Average" button.
Then: The application accepts the query and returns the Response Code: 200 along with a corresponding array with the required results in a tabular form.

Scenario 2: Unsuccessful query results
Given: The server needs to be running and must be able to accept user requests and the dataset to be queried is already added to the application.
When: The user selects a database and enters two numeric values to search using the "Find Course Section(s) - Average" button.
Then: The application accepts the query and returns the Response Code: 300 along with a corresponding error message.


## Others
You may provide any additional user stories + DoDs in this section for general TA feedback.  
Note: These will not be graded.
