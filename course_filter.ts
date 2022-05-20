export type Price = number | null;

export type Prices = [Price, Price];

export interface Course {
  name: string;
  prices: Prices;
}

export type Sort = "asc" | "des";

export const courseFilter = (
  courses: Course[],
  range: Prices,
  sort?: Sort
): Course[] => {
  const matchingCourses: Course[] = [];
  let [minRangePrice, maxRangePrice] = convertToNumericPrices(range);

  courses.forEach((course) => {
    if (!isValueDefined(minRangePrice) && !isValueDefined(maxRangePrice)) {
      matchingCourses.push(course);
      return;
    }
    const [minCoursePrice, maxCoursePrice] = convertToNumericPrices(
      course.prices
    );

    // With google help
    if (
      (minCoursePrice <= minRangePrice && minRangePrice <= maxCoursePrice) ||
      (minCoursePrice <= maxRangePrice && maxRangePrice <= maxCoursePrice) ||
      (minRangePrice <= minCoursePrice && minCoursePrice <= maxRangePrice) ||
      (minRangePrice <= maxCoursePrice && maxCoursePrice <= maxRangePrice)
    ) {
      matchingCourses.push(course);
    }

    // It's my solution
    // if (maxCoursePrice <= maxRangePrice) {
    //   if (maxCoursePrice >= minRangePrice) {
    //     matchingCourses.push(course);
    //   }
    // } else {
    //   if (minCoursePrice <= maxRangePrice) {
    //     matchingCourses.push(course);
    //   }
    // }
  });

  if (sort) {
    sortMatchingCourses(matchingCourses, sort);
  }

  return matchingCourses;
};

function sortMatchingCourses(matchingCourses: Course[], sort: Sort): Course[] {
  const MIN_INDEX = 0;
  const MAX_INDEX = 1;

  const sortFunctions: { [K in Sort]: (a: Course, b: Course) => number } = {
    asc: (a, b) => {
      const aNumericPrices = convertToNumericPrices(a.prices);
      const bNumericProces = convertToNumericPrices(b.prices);
      return sortPrice(aNumericPrices, bNumericProces);
    },
    des: (a, b) => {
      const aNumericPrices = convertToNumericPrices(a.prices);
      const bNumericProces = convertToNumericPrices(b.prices);
      return sortPrice(bNumericProces, aNumericPrices);
    },
  };

  function sortPrice(a: [number, number], b: [number, number]): number {
    const result = a[MAX_INDEX] - b[MAX_INDEX];
    if (result === 0) {
      return b[MIN_INDEX] - a[MIN_INDEX];
    } else {
      return result;
    }
  }

  return matchingCourses.sort(sortFunctions[sort]);
}

function convertToNumericPrices(prices: Prices): [number, number] {
  const numericPrices: Prices = [...prices];

  if (!isValueDefined(numericPrices[0])) {
    numericPrices[0] = 0;
  }

  if (!isValueDefined(numericPrices[1])) {
    numericPrices[1] = Number.MAX_VALUE;
  }

  return numericPrices as [number, number];
}

function isValueDefined(value: unknown): boolean {
  return value !== null && value !== undefined;
}
