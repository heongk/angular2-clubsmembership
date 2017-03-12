#!/usr/bin/bash
if [[ $1 == 'start' ]]
then
	nginx -p `realpath deployment` -c nginx.conf;
	read -s -N1 -p 'press anykey to kill nginx'
	nginx -p `realpath deployment` -c nginx.conf -s stop;


elif [[ $1 == 'kill' ]]
then
	nginx -p `realpath deployment` -c nginx.conf -s stop;
fi
