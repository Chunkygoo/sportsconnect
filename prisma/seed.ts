import { Role } from "@prisma/client";
import cuid from "cuid";
import { prisma } from "../src/server/db/client";
import { universitySeedData } from "./SeedData/universities";
import { userInfoSeedData } from "./SeedData/user";

async function main() {
  // delete data in all tables
  await prisma.education.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.profilePhoto.deleteMany();
  await prisma.university.deleteMany();
  await prisma.userInfo.deleteMany();
  // delete data in all tables

  // This does not create users in supertokens dev database
  for (const record of userInfoSeedData) {
    await prisma.userInfo.create({
      data: {
        id: record[1] as string,
        email: record[0] as string,
        name: record[2] as string,
        wechatId: record[3] as string,
        preferredName: record[4] as string,
        bio: record[5] as string,
        gender: record[6] as string,
        contactNumber: record[7] as string,
        currentAddress: record[8] as string,
        permanentAddress: record[9] as string,
        birthday: new Date(record[10] as string),
        public: record[11] === "True" ? true : false,
        role: record[12] === "user" ? Role.USER : Role.ADMIN,
      },
    });
  }

  for (const record of universitySeedData) {
    await prisma.university.create({
      data: {
        id: cuid(),
        name: record[0] as string,
        city: record[1] as string,
        state: record[2] as string,
        conference: record[3] as string,
        division: record[4] as string,
        category: record[5] as string,
        region: record[6] as string,
        link: record[7] as string,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
