import { prisma } from "../src/server/db/client";
// import { userInfoSeedData } from "./SeedData/user";

async function main() {
  // delete data in all tables
  // await prisma.education.deleteMany();
  // await prisma.experience.deleteMany();
  // await prisma.profilePhoto.deleteMany();
  // await prisma.university.deleteMany();
  await prisma.userInfo.deleteMany();
  // await prisma.coach.deleteMany();

  // Don't run this for supertokens dev database. Instead, just clear the dev database from the Supertokens console
  // for (const record of userInfoSeedData) {
  //   await prisma.userInfo.create({
  //     data: {
  //       id: record[1] as string,
  //       email: record[0] as string,
  //       name: record[2] as string,
  //       wechatId: record[3] as string,
  //       preferredName: record[4] as string,
  //       bio: record[5] as string,
  //       gender: record[6] as string,
  //       contactNumber: record[7] as string,
  //       currentAddress: record[8] as string,
  //       permanentAddress: record[9] as string,
  //       birthday: new Date(record[10] as string),
  //       public: record[11] === "True" ? true : false,
  //       role: record[12] === "user" ? Role.USER : Role.ADMIN,
  //     },
  //   });
  // }

  // for (const record of universitySeedData) {
  //   await prisma.university.create({
  //     data: {
  //       id: cuid(),
  //       name: record[0] as string,
  //       city: record[1] as string,
  //       state: record[2] as string,
  //       conference: record[3] as string,
  //       division: record[4] as string,
  //       category: record[5] as string,
  //       region: record[6] as string,
  //       link: record[7] as string,
  //     },
  //   });
  // }

  // const universities = await prisma.university.findMany({
  //   include: {
  //     coaches: true,
  //   },
  // });
  // const uniObject: Record<string, Record<string, string>> = {
  //   Men: {},
  //   Women: {},
  // };

  // for (const uni of universities) {
  //   if (uniObject["Men"] && uniObject["Women"]) {
  //     if (uni.category === "Men") {
  //       if (uni.name) {
  //         uniObject["Men"][uni.name] = uni.id;
  //       }
  //     } else if (uni.category === "Women") {
  //       uniObject["Women"][uni.name] = uni.id;
  //     } else {
  //       console.log("Unexpected error!");
  //       throw new Error("An Unexpected Error has occured!");
  //     }
  //   }
  // }

  // for (const record of coachesSeedData) {
  //   if (uniObject["Men"] && uniObject["Women"] && record[0]) {
  //     const coachLevel =
  //       record[5] === "HEAD" ? CoachLevel.HEAD : CoachLevel.ASSISTANT;
  //     if (record[4] === "MEN") {
  //       const uniId = uniObject["Men"][record[0]];
  //       await prisma.coach.create({
  //         data: {
  //           name: record[1] || "",
  //           email: record[2],
  //           contactNumber: record[3],
  //           category: record[4],
  //           level: coachLevel,
  //           university: {
  //             connect: { id: uniId },
  //           },
  //         },
  //       });
  //     } else if (record[4] === "WOMEN") {
  //       const uniId = uniObject["Women"][record[0]];
  //       await prisma.coach.create({
  //         data: {
  //           name: record[1] || "",
  //           email: record[2],
  //           contactNumber: record[3],
  //           category: record[4],
  //           level: coachLevel,
  //           university: {
  //             connect: { id: uniId },
  //           },
  //         },
  //       });
  //     } else {
  //       console.log("Unexpected error!");
  //       throw new Error("An Unexpected Error has occured!");
  //     }
  //   }
  // }
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
