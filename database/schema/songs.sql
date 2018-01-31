CREATE TABLE IF NOT EXISTS "songs" (
"id" serial NOT NULL,
"title" varchar(1024) NOT NULL UNIQUE,
"length" int NOT NULL, -- length is in seconds
"artist" varchar(256) NOT NULL,
"genre" varchar(256) NOT NULL,
"popularity" varchar(256), 
"file" varchar(256),
"playcount" int, -- Somehow set default to 0? Probably account for it later
"album" varchar(256),
"track" int,
"art" varchar(256),
"releasedate" date, -- YYYY-MM-DD
"addeddate" date, 
"bpm" int,
CONSTRAINT songs_pk PRIMARY KEY ("id")
) WITH (
  OIDS = FALSE
);


