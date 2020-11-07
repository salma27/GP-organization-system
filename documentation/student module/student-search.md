#### Student search

##### Overview
The system provides a search bar on student home page to search for other students using their ID or name

##### Actors

1. Students

##### Preconditions

1. The actor must be logged in as a student

##### Busuness Events

1. The actor taps on the search bar on the home page and enters an ID or a name

##### Sequence Flow

1. The actor enters an ID or a name
2. The respondes with a list of students which their ID/name matches the actor's input
3. if there is no matches the page will show *no matches found*

##### Termination Outcome
| Outcome          | Condition |
|------------------|-----------|
| Single backticks | 'fun?'    |
| Quotes           | "fun?"    |

##### Notes
none
