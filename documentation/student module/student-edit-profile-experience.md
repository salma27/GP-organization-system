#### Student edit profile

##### Overview
The system provides a student profile page in which the student can add and remove technologies their experienced in from their list of technologies

##### Actors

1. Students

##### Preconditions

1. The actor must be logged in as a student

##### Busuness Events

1. Actor selects a technology from dropdown list and clicks add to add
2. Actor clicks on existing technologu in list to delete

##### Sequence Flow

1. Actor wants to add a technology
   1. Actor selects a technology and adds it
   2. On operation success the list of technologies will be updated with the new technology
   3. On failure there will be a feedback of failure reason and the actor can retry adding again
2. Actor wants to delete a technology
   1. Actor clicks on existing technology in their technologies list to delete
   2. On operation success the list of technologies will be updated without the deleted technology
   3. On failure there will be a feedback of failure reason and the actor can retry deleting again

##### Termination Outcome
| Outcome          | Condition |
|------------------|-----------|
| Single backticks | 'fun?'    |
| Quotes           | "fun?"    |

##### Notes
none

