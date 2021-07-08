# drone_trainer

Helping get up to speed with drone via examples.

Fork this repository into your own namespace and have a play. 

***DO NOT CHECK CREDENTIALS INTO THIS REPO***

## This repository

This contains lots of different kinds of builds as listed below. Just follow their instructions to try them out.

## Drone Basics

### Conditionals

Here is a concrete example of conditional usage in drone. For more complex usage look here. `https://docs.drone.io/pipeline/conditions/`
To try this build. In the settings of this repo in you drone ui. Set the path for the drone file to `./basic/conditional.yml`

### Parallelism

Here is a concrete example of parallel builds in drone. For more complex usage look here. `https://docs.drone.io/pipeline/docker/syntax/parallelism/`
To try this build. In the settings of this repo in you drone ui. Set the path for the drone file to `./basic/parallel.yml`

### Triggers and multiple pipelines

Here is a concrete example of triggers and multiple pipelines in drone.
To try this build. In the settings of this repo in you drone ui. Set the path for the drone file to `./basic/triggers_and_pipelines.yml`

### Further reading into what is possible

For more complex usage docker usage look here. `https://docs.drone.io/quickstart/docker/`

## Language specific build examples

### Golang build

Code lives here in the `golang` folder, it contains an example go project and a basic `.drone.yaml` file that:

- go vet
- go test
- builds a binary

To try this build. In the settings of this repo in you drone ui. Set the path for the drone file to `./golang/.drone.yml`

For more advanced information on golang builds go here `https://docs.drone.io/pipeline/kubernetes/examples/language/golang/`

### Java build

Code lives here in the `java` folder, it contains an example project and a basic `.drone.yaml` file that:

- builds a class
- runs the class

To try this build. In the settings of this repo in you drone ui. Set the path for the drone file to `./java/.drone.yml`

For more advanced information on Java builds go here `https://docs.drone.io/pipeline/kubernetes/examples/language/java/`

## Running Drone in AWS

The manual steps to run a server and runner on the same instance in AWS.
The cloud init file below will install docker for you and give you a docker compose file and get the latest drone images.

### Pre-requisites

- Set up a key pair SSH or putty `https://us-east-2.console.aws.amazon.com/ec2/v2/home?region=us-east-2#KeyPairs`
- set up a security group to allow 8080 and 22

### AWS setup

- On screen `1` Ubuntu 20.04
- On screen `2` t2.medium 4gb mem
- on screen `3` select your network
- In advanced details - inside 'user data' paste in the following

```BASH
#cloud-config
users:
- default
- name: root
  sudo: ALL=(ALL) NOPASSWD:ALL
  groups: sudo

apt:
  sources:
    docker.list:
      source: deb [arch=amd64] https://download.docker.com/linux/ubuntu $RELEASE stable
      keyid: 9DC858229FC7DD38854AE2D88D81803C0EBFCD88
      
packages:
- docker-ce
- docker-ce-cli
- vim

write_files:
- path: /root/docker-compose.yml
  content: |
    version: "3.8"
    services:
        drone:
            image: drone/drone:latest
            ports:
            - "8080:80"
            environment:
            - DRONE_SERVER_HOST=localhost:8080
            - DRONE_SERVER_PROTO=http
            - DRONE_SERVER_PROXY_HOST=${DRONE_SERVER_PROXY_HOST}
            - DRONE_SERVER_PROXY_PROTO=https
            - DRONE_RPC_SECRET=bea26a2221fd8090ea38720fc445eca6
            - DRONE_COOKIE_SECRET=e8206356c843d81e05ab6735e7ebf075
            - DRONE_COOKIE_TIMEOUT=720h
            - DRONE_GITHUB_CLIENT_ID=${DRONE_GITHUB_CLIENT_ID}
            - DRONE_GITHUB_CLIENT_SECRET=${DRONE_GITHUB_CLIENT_SECRET}
            - DRONE_LOGS_DEBUG=true
            - DRONE_CRON_DISABLED=true
            volumes:
            - ./data:/data
        runner:
            image: drone/drone-runner-docker:latest
            environment:
            - DRONE_RPC_HOST=drone
            - DRONE_RPC_PROTO=http
            - DRONE_RPC_SECRET=bea26a2221fd8090ea38720fc445eca6
            - DRONE_TMATE_ENABLED=true
            volumes:
            - /var/run/docker.sock:/var/run/docker.sock
runcmd:
  - [ systemctl, daemon-reload ]
  - [ systemctl, restart, docker ]

output: {all: '| tee -a /var/log/cloud-init-output.log'}
```

- On screen `6` select the existing security group you created.
- Review your settings, finally select your key pair you have created.
- SSH into the box as ubuntu `ssh -i /home/tp/workspace/test_key_pair.pem ubuntu@3.16.108.11` and change to the root user `sudo su`.

### Installing drone

## Set up Github Oauth Apps

Go here `https://github.com/settings/developers`

- Copy this docker compose file `https://github.com/drone/drone/blob/master/docker/compose/drone-github/docker-compose.yml`

Changing the following 3 settings

```BASH
DRONE_SERVER_PROXY_HOST=${DRONE_SERVER_PROXY_HOST}         # your aws instance hostname
DRONE_GITHUB_CLIENT_ID=${DRONE_GITHUB_CLIENT_ID}           # taken from your Github oauth application
DRONE_GITHUB_CLIENT_SECRET=${DRONE_GITHUB_CLIENT_SECRET}   # taken from your Github oauth application
```

- install docker
- run the following command `docker-compose up`

## TODO's

- Add workspace setting for golang .drone.yml, to remove cd hack.
