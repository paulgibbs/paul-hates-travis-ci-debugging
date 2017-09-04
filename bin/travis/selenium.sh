#!/bin/bash

# Exit if anything fails AND echo each command before executing
# http://www.peterbe.com/plog/set-ex
set -ex

WH_WORDPRESS_DIR=${WH_WORDPRESS_DIR-/tmp/wordpress}
NAP_LENGTH=1
SELENIUM_PORT=4444

# Wait for a specific port to respond to connections.
wait_for_port() {
  local PORT=$1
  while echo | telnet localhost $PORT 2>&1 | grep -qe 'Connection refused'; do
    echo "Connection refused on port $PORT. Waiting $NAP_LENGTH seconds..."
    sleep $NAP_LENGTH
  done
}

export DISPLAY=:99.0
sh -e /etc/init.d/xvfb start
sleep 5

# Start Selenium
wget -O selenium.jar https://selenium-release.storage.googleapis.com/3.5/selenium-server-standalone-3.5.3.jar
java -jar selenium.jar -port $SELENIUM_PORT > /dev/null 2>&1 &
wait_for_port $SELENIUM_PORT

# Start Chrome.
google-chrome-stable --headless --disable-gpu --remote-debugging-port=9222 &

sleep 5
