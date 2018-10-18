#!/bin/bash

if  [ "$1" = "" ] ; then
    echo "Please supply a version"
    exit
fi

git checkout master
git pull upstream master
git reset --hard upstream/master
versiony --version=$1 --to=package.json,bower.json
git commit -am "Publish version $1"
git tag $1
git push
git push --tags
git publish