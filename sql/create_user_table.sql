CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    users_uuid uuid DEFAULT uuid_generate_v4 (),
    users_user VARCHAR NOT NULL,
    PRIMARY KEY (users_uuid)
);
