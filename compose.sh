#!/bin/bash

. ./compose.env

env | grep FUNCTIONFOLDER
env | grep COSMOSFOLDER
env | grep APIFOLDER
FUNCTIONFOLDER=env | grep FUNCTIONFOLDER
COSMOSFOLDER=env | grep COSMODBSFOLDER
APIFOLDER=env | grep APIFOLDER
sudo -E docker-compose config
docker-compose up