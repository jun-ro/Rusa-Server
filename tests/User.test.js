import { User } from "../models/User.js";
import { expect } from "jsr:@std/expect";

const testUserCases = [
  { username: "@googalymoogaly", expected: false },
  { username: "validUser", expected: true },
  { username: "user@domain.com", expected: false }, // invalid because of "@" character
  { username: "simple_user", expected: false },
  { username: "UserWithSpecial$", expected: false }, // special char test
  { username: "test3", expected: false}
];

const testPassCases = [
  { password: "test", expected: false },
  { password: "test123$", expected: true },
];


for (const { username, expected } of testUserCases) {
  Deno.test(`Validate username: ${username}`, () => {
    const result = User.validateUser(username);
    expect(result).toBe(expected);
  });
}


for (const {password, expected} of testPassCases) {
  Deno.test(`Validate password: ${password}`, () => {
    const result = User.validatePassword(password);
    expect(result).toBe(expected);
  });
}