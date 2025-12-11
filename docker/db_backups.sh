#!/bin/bash

basePath=$(dirname "$0")
export $(grep -v '^#' "$basePath/.env" | xargs)

if [ -z "$BACKUPS_DIR" ]; then
  echo "❌ ERROR: BACKUPS_DIR is not set in .env file. Exiting..."
  exit 1
fi

today=$(date '+%Y_%m_%d')
backupsDir="$BACKUPS_DIR/$today/"
#googleDriveDir="gdrive:$GOOGLE_DRIVE_FOLDER_NAME/$today"

echo "🚀 Creating backups directory $backupsDir"
/bin/mkdir -p "$backupsDir"
cd "$backupsDir" || { echo "❌ ERROR: Failed to enter backup directory"; exit 1; }

echo "Backing up Postgres: $POSTGRES_DB_NAME database to $backupsDir"
docker exec -i "$PG_CONTAINER_NAME" pg_dump -U "$DB_USER" "$POSTGRES_DB_NAME" | gzip -9 > "$POSTGRES_DB_NAME.sql.gz"

echo "🚀 Backing up Mongo: $MONGO_DB database to $backupsDir"
docker exec -i "$MONGO_CONTAINER" mongodump --db "$MONGO_DB" \
  --excludeCollection traffic_survey_features \
  --gzip --archive > "$MONGO_DB.gz"

echo "Removing old backups"
find "$BACKUPS_DIR" -type d -mtime +7 -exec rm -rf {} \;

#echo "🚀 Rclone to $googleDriveDir"
#rclone copy "$backupsDir" "$googleDriveDir"

echo "✅ Database backups completed successfully."
