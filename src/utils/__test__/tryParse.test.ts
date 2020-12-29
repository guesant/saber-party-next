import { tryParse } from "../tryParse";

test("tryParse", () => {
  expect(tryParse("123123")).toBe(123123);
  expect(tryParse("Test")).toBe("Test");
  expect(tryParse('"Test"')).toBe("Test");
});

test("tryParse: defaultTransformer", () => {
  expect(tryParse("Test", (a: string) => a.toLocaleUpperCase())).toBe("TEST");
});
