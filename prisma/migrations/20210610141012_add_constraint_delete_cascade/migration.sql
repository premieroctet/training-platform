-- This is an empty migration.

ALTER TABLE "Account"
ADD CONSTRAINT "account_user_id"
	FOREIGN KEY ("userId")
	REFERENCES "User"(id)
	ON DELETE CASCADE;

ALTER TABLE "Session"
ADD CONSTRAINT "session_user_id"
	FOREIGN KEY ("userId")
	REFERENCES "User"(id)
	ON DELETE CASCADE;