#!/bin/bash
export FIREBASE_TOKEN=$(grep FIREBASE_TOKEN .env | cut -d '=' -f2)
firebase "$@"

