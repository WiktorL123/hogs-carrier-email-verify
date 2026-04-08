#!/bin/bash
set -e  # Exit immediately if any command fails

echo "Starting environment update"

git reset --hard
git pull

# Store the root directory of the project
APP_ROOT_DIR=$(pwd)

# Function to update a given service directory
update_service () {
  local dir=$1

  echo "Updating service in $dir..."

  # Navigate to the service directory, exit if it doesn't exist
  cd "$APP_ROOT_DIR/$dir" || {
    echo "Directory $dir not found!"
    exit 1
  }
  # Rebuild and restart containers in detached mode
  docker compose up -d --build
}

# Update backend service
update_service "backend/email-verify"

# Update frontend service
update_service "frontend/email"

echo "Environment successfully updated"