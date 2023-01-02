#!/bin/bash

filename="index.html"
local_url="<script src=\"..\/playkit-plugin-example.js\"><\/script>"
prod_url="<script src=\"https:\/\/raw.githack.com\/kaltura\/playkit-js-plugin-example\/master\/dist\/playkit-plugin-example.js\"><\/script>"

search="$local_url"
replace="$prod_url"

if [ "$1" = "dev" ]; then
  search="$prod_url"
  replace="$local_url"
fi

cd 'demo' || exit
perl -i -pe"s/$search/$replace/" $filename