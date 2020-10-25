CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE chat_user (
    chat_user_uuid uuid DEFAULT uuid_generate_v4 (),
    chat_user_user VARCHAR NOT NULL,
    PRIMARY KEY (chat_user_uuid)
);
