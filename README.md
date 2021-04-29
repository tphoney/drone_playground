# drone_trainer

Helping get up to speed with drone via examples. There is a .drone.yml that builds a variety of project types from golang to ??

Fork this repo into your own namespace and have a play. This is the repo you will be using in your drone setup.

***DO NOT CHECK CREDENTIALS INTO THIS REPO***

## Running Drone on your laptop

some steps here. ngrok ? et al

## Running Drone in AWS

The manual steps to run a server and runner on the same instance in AWS.

### AWS setup

bla bla instance type stuff / vpc / arn thingys ?

## The .drone.yml

This contains lots of different kinds of builds as listed below. Just uncomment them to run them on your forked repository.

### Go build

This repo contains a sample go project, it has tests / builds and produces a docker container that we push to docker hub.
Code lives here :

Compile code:
go build ./...
