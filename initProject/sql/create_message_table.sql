CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE chat_message (
    chat_message_uuid uuid DEFAULT uuid_generate_v4 (),
    chat_message_message VARCHAR NOT NULL,
    chat_message_sender VARCHAR NOT NULL,
    chat_message_receiver VARCHAR NOT NULL,
    chat_message_send_date VARCHAR NOT NULL,
    chat_message_date_offset INTEGER NOT NULL,
    PRIMARY KEY (chat_message_uuid)
);
