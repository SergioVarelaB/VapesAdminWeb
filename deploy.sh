#!/usr/bin/env sh

set -e

npm run build 

cd dist

git init 
git add .
git commit -m "new deploy"
git push -f git@github.com:SergioVarelaB/VapesAdminWeb.git master:gh-pages

cd -