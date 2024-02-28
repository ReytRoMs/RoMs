const prismaClient = require("../prismaClient");
const { UsersPrimaryRole } = require("@prisma/client");

const seedData = async () => {
	await prismaClient.sessionUser.create({
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
		await prismaClient.$disconnect();
	});
