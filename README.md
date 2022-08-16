# Training platform 🎓

You can read more about this project [on our blog 🇫🇷](https://www.premieroctet.com/blog/training-platform-v1)

## Quick start

```bash
pipenv shell

# Start infrastructure (database, local email service)
docker-compose up

# Install all dependencies
yarn install

# Init database
yarn prisma migrate dev

# Create admin user
yarn create-admin-user thibault@premieroctet.com
```

- Then login here with the email you used in the previous script
  http://localhost:3000/auth/signin?callbackUrl=http://localhost:3000.

- You have to check the login email by going to the maildev UI
  http://localhost:1080/

- You can then add users via the admin here http://localhost:3000/admin/users

## Export PDF

Make sure you have `ghostscript` and `make` available :

```bash
apt install make ghostscript
```

Then to export all courses as PDF just run :

```bash
make
```
