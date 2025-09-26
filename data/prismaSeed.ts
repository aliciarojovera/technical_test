import { Role, ReservationStatus, ReservationFormat } from "@prisma/client";

export const testUserOne = {
  role: Role.ADMIN,
  name: "Alice Johnson",
  email: "alice@example.com",
  image: "https://robohash.org/alice",
  password: "alice123",
};
export const testUserTwo = {
  role: Role.ADMIN,
  name: "Bob Smith",
  email: "bob@example.com",
  image: "https://robohash.org/bob",
  password: "bob123",
};
export const testUserThree = {
  role: Role.CLIENT,
  name: "Charlie Brown",
  email: "charlie@example.com",
  image: "https://robohash.org/charlie",
  password: "charlie123",
};
export const testUserFour = {
  role: Role.CLIENT,
  name: "Diana Prince",
  email: "diana@example.com",
  image: "https://robohash.org/diana",
  password: "diana123",
};
export const testUserFive = {
  role: Role.CLIENT,
  name: "Ethan Hunt",
  email: "ethan@example.com",
  image: "https://robohash.org/ethan",
  password: "ethan123",
};
export const testUserSix = {
  role: Role.CLIENT,
  name: "Fiona Gallagher",
  email: "fiona@example.com",
  image: "https://robohash.org/fiona",
  password: "fiona123",
};
export const testUserSeven = {
  role: Role.CLIENT,
  name: "George Miller",
  email: "george@example.com",
  image: "https://robohash.org/george",
  password: "george123",
};
export const testUserEight = {
  role: Role.CLIENT,
  name: "Hannah Scott",
  email: "hannah@example.com",
  image: "https://robohash.org/hannah",
  password: "hannah123",
};
export const testUserNine = {
  role: Role.CLIENT,
  name: "Irene Adler",
  email: "irene@example.com",
  image: "https://robohash.org/irene",
  password: "irene123",
};
export const testUserTen = {
  role: Role.CLIENT,
  name: "Julia Stone",
  email: "julia@example.com",
  image: "https://robohash.org/julia",
  password: "julia123",
};

export const testClientOne = {
  name: "Acme Corp",
  city: "Sydney",
  address: "123 Business Rd",
  phone: "555-1234",
};
export const testClientTwo = {
  name: "Globex Inc",
  city: "Melbourne",
  address: "456 Corporate Blvd",
  phone: "555-5678",
};

export const testReservationOne = {
  reservationName: "Year-End Party Acme",
  reservationStatus: ReservationStatus.CONFIRMED,
  format: ReservationFormat.COCKTAIL,
  pax: 12,
  reservationDate: new Date("2025-12-20T19:00:00Z"),
};
export const testReservationTwo = {
  reservationName: "Sales Kickoff Acme",
  reservationStatus: ReservationStatus.CONFIRMATION_PENDING,
  format: ReservationFormat.SEATED,
  pax: 11,
  reservationDate: new Date("2025-11-23T19:00:00Z"),
};
export const testReservationThree = {
  reservationName: "Team Building Acme",
  reservationStatus: ReservationStatus.INITIAL_STATUS,
  format: ReservationFormat.SEATED,
  pax: 8,
  reservationDate: new Date("2025-10-15T19:00:00Z"),
};
export const testReservationFour = {
  reservationName: "Quarterly Review Acme",
  reservationStatus: ReservationStatus.CONFIRMED,
  format: ReservationFormat.COCKTAIL,
  pax: 15,
  reservationDate: new Date("2025-11-10T19:00:00Z"),
};
export const testReservationFive = {
  reservationName: "Client Appreciation Acme",
  reservationStatus: ReservationStatus.CANCELLED,
  format: ReservationFormat.SEATED,
  pax: 16,
  reservationDate: new Date("2025-12-20T19:00:00Z"),
};
export const testReservationSix = {
  reservationName: "Strategy Session Acme",
  reservationStatus: ReservationStatus.CONFIRMED,
  format: ReservationFormat.COCKTAIL,
  pax: 10,
  reservationDate: new Date("2025-11-05T19:00:00Z"),
};
export const testReservationSeven = {
  reservationName: "Holiday Party Acme",
  reservationStatus: ReservationStatus.CONFIRMATION_PENDING,
  format: ReservationFormat.SEATED,
  pax: 14,
  reservationDate: new Date("2025-12-22T19:00:00Z"),
};
export const testReservationEight = {
  reservationName: "Strategy Session Globex",
  reservationStatus: ReservationStatus.INITIAL_STATUS,
  format: ReservationFormat.COCKTAIL,
  pax: 11,
  reservationDate: new Date("2025-11-15T19:00:00Z"),
};
export const testReservationNine = {
  reservationName: "Innovation Workshop Globex",
  reservationStatus: ReservationStatus.CONFIRMED,
  format: ReservationFormat.SEATED,
  pax: 9,
  reservationDate: new Date("2025-10-30T19:00:00Z"),
};
export const testReservationTen = {
  reservationName: "Leadership Retreat Globex",
  reservationStatus: ReservationStatus.CANCELLED,
  format: ReservationFormat.COCKTAIL,
  pax: 13,
  reservationDate: new Date("2025-12-05T19:00:00Z"),
};
