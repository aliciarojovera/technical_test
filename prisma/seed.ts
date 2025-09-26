import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import {
  testUserOne,
  testUserTwo,
  testUserThree,
  testUserFour,
  testUserFive,
  testUserSix,
  testUserSeven,
  testUserEight,
  testUserNine,
  testUserTen,
  testClientOne,
  testClientTwo,
  testReservationOne,
  testReservationTwo,
  testReservationThree,
  testReservationFour,
  testReservationFive,
  testReservationSix,
  testReservationSeven,
  testReservationEight,
  testReservationNine,
  testReservationTen,
} from "../data/prismaSeed";

const prisma = new PrismaClient();

const cleanUp = async () => {
  await prisma.user.deleteMany();
  await prisma.client.deleteMany();
  await prisma.reservation.deleteMany();
};

async function seed() {
  await cleanUp();

  const clientOne = await prisma.client.create({
    data: testClientOne,
  });
  const clientTwo = await prisma.client.create({
    data: testClientTwo,
  });

  const passwordTestUserOne = await hash(testUserOne.password, 12);
  const userOne = await prisma.user.create({
    data: {
      ...testUserOne,
      password: passwordTestUserOne,
    },
  });
  const passwordTestUserTwo = await hash(testUserTwo.password, 12);
  const userTwo = await prisma.user.create({
    data: {
      ...testUserTwo,
      password: passwordTestUserTwo,
    },
  });
  const passwordTestUserThree = await hash(testUserThree.password, 12);
  const userThree = await prisma.user.create({
    data: {
      ...testUserThree,
      password: passwordTestUserThree,
      clientId: clientOne.id,
    },
  });
  const passwordTestUserFour = await hash(testUserFour.password, 12);
  const userFour = await prisma.user.create({
    data: {
      ...testUserFour,
      password: passwordTestUserFour,
      clientId: clientOne.id,
    },
  });
  const passwordTestUserFive = await hash(testUserFive.password, 12);
  const userFive = await prisma.user.create({
    data: {
      ...testUserFive,
      password: passwordTestUserFive,
      clientId: clientOne.id,
    },
  });
  const passwordTestUserSix = await hash(testUserSix.password, 12);
  const userSix = await prisma.user.create({
    data: {
      ...testUserSix,
      password: passwordTestUserSix,
      clientId: clientOne.id,
    },
  });
  const passwordTestUserSeven = await hash(testUserSeven.password, 12);
  const userSeven = await prisma.user.create({
    data: {
      ...testUserSeven,
      password: passwordTestUserSeven,
      clientId: clientOne.id,
    },
  });
  const passwordTestUserEight = await hash(testUserEight.password, 12);
  const userEight = await prisma.user.create({
    data: {
      ...testUserEight,
      password: passwordTestUserEight,
      clientId: clientOne.id,
    },
  });
  const passwordTestUserNine = await hash(testUserNine.password, 12);
  const userNine = await prisma.user.create({
    data: {
      ...testUserNine,
      password: passwordTestUserNine,
      clientId: clientTwo.id,
    },
  });
  const passwordTestUserTen = await hash(testUserTen.password, 12);
  const userTen = await prisma.user.create({
    data: {
      ...testUserTen,
      password: passwordTestUserTen,
      clientId: clientTwo.id,
    },
  });

  const reservationOne = await prisma.reservation.create({
    data: {
      ...testReservationOne,
      userId: userThree.id,
      clientId: clientOne.id,
    },
  });
  const reservationTwo = await prisma.reservation.create({
    data: {
      ...testReservationTwo,
      userId: userThree.id,
      clientId: clientOne.id,
    },
  });
  const reservationThree = await prisma.reservation.create({
    data: {
      ...testReservationThree,
      userId: userThree.id,
      clientId: clientOne.id,
    },
  });
  const reservationFour = await prisma.reservation.create({
    data: {
      ...testReservationFour,
      userId: userThree.id,
      clientId: clientOne.id,
    },
  });
  const reservationFive = await prisma.reservation.create({
    data: {
      ...testReservationFive,
      userId: userFour.id,
      clientId: clientOne.id,
    },
  });
  const reservationSix = await prisma.reservation.create({
    data: {
      ...testReservationSix,
      userId: userFour.id,
      clientId: clientOne.id,
    },
  });
  const reservationSeven = await prisma.reservation.create({
    data: {
      ...testReservationSeven,
      userId: userFour.id,
      clientId: clientOne.id,
    },
  });
  const reservationEight = await prisma.reservation.create({
    data: {
      ...testReservationEight,
      userId: userNine.id,
      clientId: clientTwo.id,
    },
  });
  const reservationNine = await prisma.reservation.create({
    data: {
      ...testReservationNine,
      userId: userNine.id,
      clientId: clientTwo.id,
    },
  });
  const reservationTen = await prisma.reservation.create({
    data: {
      ...testReservationTen,
      userId: userTen.id,
      clientId: clientTwo.id,
    },
  });

  console.log("Clients created:", {
    clientOne: clientOne.name,
    clientTwo: clientTwo.name,
  });
  console.log("Users created:", {
    userOne: userOne.name,
    userTwo: userTwo.name,
    userThree: userThree.name,
    userFour: userFour.name,
    userFive: userFive.name,
    userSix: userSix.name,
    userSeven: userSeven.name,
    userEight: userEight.name,
    userNine: userNine.name,
    userTen: userTen.name,
  });
  console.log("Reservations created:", {
    reservationOne: reservationOne.reservationName,
    reservationTwo: reservationTwo.reservationName,
    reservationThree: reservationThree.reservationName,
    reservationFour: reservationFour.reservationName,
    reservationFive: reservationFive.reservationName,
    reservationSix: reservationSix.reservationName,
    reservationSeven: reservationSeven.reservationName,
    reservationEight: reservationEight.reservationName,
    reservationNine: reservationNine.reservationName,
    reservationTen: reservationTen.reservationName,
  });
}

seed()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
