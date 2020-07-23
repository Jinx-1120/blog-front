#!/bin/bash

WEB_PATH=$(dirname $0)
# WEB_USER='root'
# WEB_USERGROUP='root'

echo "[deploy] Fetch and rebuilding..."
cd $WEB_PATH
cd ..
echo "[deploy] path:" $(pwd)
echo "[deploy] pulling source code..."
git fetch --all && git reset --hard origin/master && git pull
git checkout master
echo "[deploy] building..."
npm install
npm run build
echo "[deploy] Rebuild done."
