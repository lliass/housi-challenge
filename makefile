CONATAINER_NAME_DB=housi-challenge-container
HOST_DB=localhost
USER_DB=root
PASS_DB=root
PORT_DB=27017
DATABASE_NAME=housi-challenge
NEW_COLLECTION=property

# Create developmenpt enviroment
up:
	docker-compose up -d

# Delete developmenpt enviroment
down:
	docker-compose down --volumes --rmi all

up-images:
	docker-compose build --no-cache

# Create mongo container
create_docker_mongodb_container:
	docker run -d --name ${CONATAINER_NAME_DB} -e MONGO_INITDB_ROOT_USERNAME=${USER_DB} -e MONGO_INITDB_ROOT_PASSWORD=${PASS_DB} -p ${PORT_DB}:${PORT_DB} -v ./.volumes/.mongodb-storage:/data/db mongo

# Populate the database with an existing dump
restore-dump-db:
	mongorestore --host ${HOST_DB}:${PORT_DB} --username ${USER_DB} --password ${PASS_DB} --authenticationDatabase admin ./dump

# Create a database dump
create-dump-db:
	mongodump --host ${HOST_DB}:${PORT_DB} --username ${USER_DB} --password ${PASS_DB} --db ${DATABASE_NAME} --authenticationDatabase admin

# Import the Json/Array into the database
import-seed-db:
	mongoimport --host ${HOST_DB}:${PORT_DB} --username ${USER_DB} --password ${PASS_DB} --db ${DATABASE_NAME} --collection ${NEW_COLLECTION} --authenticationDatabase admin --file ./seed.json --jsonArray