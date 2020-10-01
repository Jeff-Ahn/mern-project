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
git remote add production ssh://$user@$AWS_HOST/~/webapp
git push --force production master

# ssh $user@$AWS_HOST "cd ~/webapp && \
# pm2 kill
# NODE_ENV=production pm2 start /home/ubuntu/webapp/server/build/server.js
# exit"