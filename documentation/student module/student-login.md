#### Student login

##### Overview
The system provides a student login page for any registered student to login using ther ID and password

##### Actors

1. Guest

##### Preconditions

1. The guest have to be A student registered in FCAI

##### Busuness Events

1. the actor enters

##### Sequence Flow

1. The actor enters their ID and password
2. The systems validates the ID and password using the ecom api
   1. if the ID exists and password is correct the actor will be logged in to the system
   2. if the ID exists and password is incorrect the actor will not be entered

##### Termination Outcome
| Outcome          | Condition |
|------------------|-----------|
| Single backticks | 'fun?'    |
| Quotes           | "fun?"    |

##### Notes
none
