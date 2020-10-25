CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE chat_message (
    chat_message_uuid uuid DEFAULT uuid_generate_v4 (),
    chat_message_message VARCHAR NOT NULL,
    chat_message_sender VARCHAR NOT NULL,
    chat_message_receiver VARCHAR NOT NULL,
    chat_message_send_date TIMESTAMP WITH TIME ZONE NOT NULL,
    PRIMARY KEY (chat_message_uuid)
);
