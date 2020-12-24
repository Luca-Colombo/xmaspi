BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "songs" (
	"ID"	INTEGER NOT NULL UNIQUE,
	"NAME"	TEXT NOT NULL,
	"ENCODING_FILE"	TEXT NOT NULL,
	"FILE_AUDIO"	TEXT NOT NULL,
	PRIMARY KEY("ID" AUTOINCREMENT)
);
INSERT INTO "songs" VALUES (2,'Santatown','songEncoding/santatown.csv','songs/santatown.mp3');
INSERT INTO "songs" VALUES (3,'Dio ci Benedira','songEncoding/diocibenedira.csv','songs/diocibenedira.mp3');
INSERT INTO "songs" VALUES (4,'Sara Natale','songEncoding/saranatale.csv','songs/saranatale.mp3');
INSERT INTO "songs" VALUES (5,'Jingle Bells','songEncoding/jinglebells.csv','songs/jinglebells.wav');
INSERT INTO "songs" VALUES (6,'We wish you a merry xmas','songEncoding/merryxmas.csv','songs/merryxmas.wav');
INSERT INTO "songs" VALUES (7,'Deck the halls','songEncoding/deckthehalls.csv','songs/deckthehalls.wav');
INSERT INTO "songs" VALUES (8,'Jingle Bocelli','songEncoding/jinglebocelli.csv','songs/jinglebocelli.mp3');
INSERT INTO "songs" VALUES (9,'Imperial march','songEncoding/imperial.csv','songs/imperial.mp3');
INSERT INTO "songs" VALUES (10,'Sarà Natale 2','songEncoding/saranatale2.csv','songs/saranatale.mp3');
INSERT INTO "songs" VALUES (11,'Les cloches','songEncoding/lescloches.csv','songs/lescloches.mp3');
COMMIT;
