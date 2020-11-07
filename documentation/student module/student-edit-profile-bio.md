#### Student edit profile

##### Overview
The system provides a student profile page in which the actor can add/update a bio about them

##### Actors

1. Students

##### Preconditions

1. The actor must be logged in as a student

##### Busuness Events

1. Actor clicks on bio text box and edits then clicks on save button

##### Sequence Flow

1. The actor edits their bio, if there was an old bio, or types a new one if there were none
   1. On success the bio will be updated with the new one
   2. On failure the actor will be notified and can retry again
   
##### Termination Outcome
| Outcome          | Condition |
|------------------|-----------|
| Single backticks | 'fun?'    |
| Quotes           | "fun?"    |

##### Notes
none

