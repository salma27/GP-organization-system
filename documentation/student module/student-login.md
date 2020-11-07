#### Student login

##### Overview
The system provides a student login page for any registered student to login using ther ID and password

##### Actors

1. Guest

##### Preconditions

1. The guest have to be A student registered in FCAI

##### Busuness Events

1. the actor taps on the login button which is located on the navigation bar

##### Sequence Flow

1. The actor enters their ID and password
2. The systems validates the ID and password using the ecom api
   1. if the validation succeeds the actor will be logged in to the system and
   2. if the validation fails the actor will re-enter their ID and password

##### Termination Outcome
| Outcome          | Condition |
|------------------|-----------|
| Single backticks | 'fun?'    |
| Quotes           | "fun?"    |

##### Notes
none
