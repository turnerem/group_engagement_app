# TDD for Python and Flask

Implementing TDD to test whether our MongoDB endpoints are returning what we expect them to return.

## /api
### POST
- returns 201 if new account created successfully
- returns 409 if user already exists on database
- returns 400 if username contains forbidden characters

## /api/\<user\_name\>
### GET
- returns all sessions for user as an array on a key of sessions
- returns empty array if there are no sessions
- returns 404 if user\_name does not exist

### POST
- returns 200 if post successful
- returns 400 if bad data provided
- returns 404 is user\_name does not exist

### DELETE
- returns 204 if request processed successfully
- returns 400 if user\_name contains forbidden characters
- returns 404 if user\_name does not exist

## /api/\<user\_name\>/\<session\_name\>
### GET
- returns 200 if request successful
- returns 404 if session name does not exist
- returns 400 if session name contains forbidden characters

### PATCH
- returns 200 if new question posted successfully
- returns 400 if patch contained invalid data
- returns 400 if session name contains forbidden characters
- returns 404 if session name does not exist

### DELETE
- returns 204 if request processed successfully
- returns 400 if session name contains forbidden characters
- returns 404 if session name doesn't exist
