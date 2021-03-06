#!/bin/bash
set -e
user="ubuntu"

rm -rf .git
rm -rf .gitignore
git config --global user.email "ahu8867@gmail.com"
git config --global user.name "Hyeonguk Ahn"
mv .gitignore_cicd .gitignore
git init .
git add .
git commit -m "Deploying"
git remote add production ssh://$user@$AWS_HOST/~/codedamn/graphql
git push --force production master

# ssh $user@$AWS_HOST "cd ~/codedamn/graphql && \
# docker-compose -f ./docker/compose/common.yml -f ./docker/compose/prod.yml build && \
# docker-compose -f ./docker/compose/common.yml -f ./docker/compose/prod.yml up --detach && \
# exit" 