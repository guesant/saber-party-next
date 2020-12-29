import { tryParse } from "../tryParse";

test("tryParse", () => {
  expect(tryParse("123123")).toBe(123123);
  expect(tryParse("Test")).toBe("Test");
  expect(tryParse('"Test"')).toBe("Test");
});

test("tryParse: defaultTransformer", () => {
  const upperCaseTransformer = (a: any) => String(a).toLocaleUpperCase();
  expect(tryParse("Test", upperCaseTransformer)).toBe("TEST");
  expect(tryParse('"Test"', upperCaseTransformer)).toBe("Test");
});
