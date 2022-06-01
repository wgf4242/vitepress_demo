#!/bin/bash

for num in {1..254};
  do
    ip=192.168.22.num
    ping -c1 $ip>/dev/null 2>&1
    if [$? = 0];
    then
        echo "$ip" ok
    else
        echo "$ip" fail
    fi
  done