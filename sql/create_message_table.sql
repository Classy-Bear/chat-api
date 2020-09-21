CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE messages (
    messages_uuid uuid DEFAULT uuid_generate_v4 (),
    messages_message VARCHAR NOT NULL,
    messages_sender VARCHAR NOT NULL,
    messages_receiver VARCHAR NOT NULL,
    messages_send_date TIMESTAMP WITH TIME ZONE NOT NULL,
    PRIMARY KEY (messages_uuid)
);