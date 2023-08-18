import uniqueArray from "../utils/uniqueArray.js";

describe("uniqueArray.js", () => {
  test("중복 제거 확인 Number", () => {
    expect(uniqueArray([1, 2, 2, 3])).toStrictEqual([1, 2, 3]);
  });

  test("중복 제거 확인 String", () => {
    expect(uniqueArray(["가", "밤", "테일", "밤"])).toStrictEqual([
      "가",
      "밤",
      "테일",
    ]);
  });
});
