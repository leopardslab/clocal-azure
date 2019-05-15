#!/bin/bash

source ./compose.env

env | grep FUNCTIONFOLDER
env | grep COSMODBSFOLDER
env | grep APIFOLDER
FUNCTIONFOLDER=env | grep FUNCTIONFOLDER
COSMODBSFOLDER=env | grep COSMODBSFOLDER
APIFOLDER=env | grep APIFOLDER
sudo -E docker-compose config
docker-compose up