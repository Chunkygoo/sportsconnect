import { Role } from "@prisma/client";
import { prisma } from "../src/server/db/client";
import { userInfoSeedData } from "./SeedData/user";

async function main() {
  // const userInfoRecords: any = [];
  // const userInfoSeedDataCSVString = userInfoSeedData
  //   .map((userInfoSeedDataRow) => {
  //     return userInfoSeedDataRow.join();
  //   })
  //   .join("\n");
  // console.log(userInfoSeedDataCSVString);
  // const records = parse(userInfoSeedDataCSVString);

  // delete data in all tables
  await prisma.education.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.profilePhoto.deleteMany();
  await prisma.university.deleteMany();
  await prisma.userInfo.deleteMany();
  // delete data in all tables

  for (const record of userInfoSeedData) {
  }
  const record = userInfoSeedData[0] || [];
  await prisma.userInfo.createMany({
    data: [
      {
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
    ],
  });
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
