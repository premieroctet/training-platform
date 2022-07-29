const { PrismaClient } = require("@prisma/client")

const email = process.argv[2]

if (!email) {
    console.error('Please provide an email as first argument');
    process.exit(1)
}

const main = async () => {
    const prisma = new PrismaClient();
    await prisma.user.create({
        data: {
            email,
            isAdmin: true
        },
    })

    console.log(`Admin user ${email} created.`);
    process.exit(0)
}

main()

