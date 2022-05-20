import { Course, courseFilter, Prices } from "./course_filter";

// Список курсов
export let courses: Course[] = [
  { name: "Courses in England", prices: [0, 100] },
  { name: "Courses in Germany", prices: [500, null] },
  { name: "Courses in Italy", prices: [100, 200] },
  { name: "Courses in Russia", prices: [null, 400] },
  { name: "Courses in China", prices: [50, 250] },
  { name: "Courses in USA", prices: [200, null] },
  { name: "Courses in Kazakhstan", prices: [56, 324] },
  { name: "Courses in France", prices: [null, null] },
];

// Варианты цен (фильтры), которые ищет пользователь
let requiredRange1: Prices = [null, 200];
let requiredRange2: Prices = [100, 350];
let requiredRange3: Prices = [200, null];

describe("courseFilter test", () => {
  it("course filter works with range: [null, 200]", () => {
    expect(courseFilter(courses, requiredRange1)).toStrictEqual([
      { name: "Courses in England", prices: [0, 100] },
      { name: "Courses in Italy", prices: [100, 200] },
      { name: "Courses in Russia", prices: [null, 400] },
      { name: "Courses in China", prices: [50, 250] },
      { name: "Courses in USA", prices: [200, null] },
      { name: "Courses in Kazakhstan", prices: [56, 324] },
      { name: "Courses in France", prices: [null, null] },
    ]);
  });

  it("course filter works with range: [100, 350]", () => {
    expect(courseFilter(courses, requiredRange2)).toStrictEqual([
      { name: "Courses in England", prices: [0, 100] },
      { name: "Courses in Italy", prices: [100, 200] },
      { name: "Courses in Russia", prices: [null, 400] },
      { name: "Courses in China", prices: [50, 250] },
      { name: "Courses in USA", prices: [200, null] },
      { name: "Courses in Kazakhstan", prices: [56, 324] },
      { name: "Courses in France", prices: [null, null] },
    ]);
  });

  it("course filter works with range: [200, null]", () => {
    expect(courseFilter(courses, requiredRange3)).toStrictEqual([
      { name: "Courses in Germany", prices: [500, null] },
      { name: "Courses in Italy", prices: [100, 200] },
      { name: "Courses in Russia", prices: [null, 400] },
      { name: "Courses in China", prices: [50, 250] },
      { name: "Courses in USA", prices: [200, null] },
      { name: "Courses in Kazakhstan", prices: [56, 324] },
      { name: "Courses in France", prices: [null, null] },
    ]);
  });

  it("course filter with ascend sort", () => {
    expect(courseFilter(courses, requiredRange1, "asc")).toStrictEqual([
      { name: "Courses in England", prices: [0, 100] },
      { name: "Courses in Italy", prices: [100, 200] },
      { name: "Courses in China", prices: [50, 250] },
      { name: "Courses in Kazakhstan", prices: [56, 324] },
      { name: "Courses in Russia", prices: [null, 400] },
      { name: "Courses in USA", prices: [200, null] },
      { name: "Courses in France", prices: [null, null] },
    ]);
  });

  it("course filter with descend sort", () => {
    expect(courseFilter(courses, requiredRange1, "des")).toStrictEqual([
      { name: "Courses in France", prices: [null, null] },
      { name: "Courses in USA", prices: [200, null] },
      { name: "Courses in Russia", prices: [null, 400] },
      { name: "Courses in Kazakhstan", prices: [56, 324] },
      { name: "Courses in China", prices: [50, 250] },
      { name: "Courses in Italy", prices: [100, 200] },
      { name: "Courses in England", prices: [0, 100] },
    ]);
  });
});
