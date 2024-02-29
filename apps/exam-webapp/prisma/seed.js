const { PrismaClient, UsersPrimaryRole } = require("@prisma/client");

const prisma = new PrismaClient();

const seedData = async () => {
	await prisma.sessionUser.create({
		data: {
			id: crypto.randomUUID(),
			current_roms_member: true,
			UsersPrimaryRole: UsersPrimaryRole.FARMER
		}
	});
};

seedData()
	.catch(async (e) => {
		console.error(e);
		process.exit();
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
