class PrismaFiltersGenerator {
	constructor() {
		this.query;
	}
	// $realtionManyTable|FieldConstraint

	generateRealtionFilter(key, value) {
		key = key.replace("$relation", "");

		if (key.startsWith("Many")) {
      key = key.replace("Many", "")
      const parts = key.split("|")
      return { [parts[0]]: { some: this.generateFilter(parts[1], value) } };
		} else if (key.startsWith("One")) {
      key = key.replace("One", "");

		}
	}

	generateFilter(key, value) {
		if (key.endsWith("GreaterThanEqual")) {
			key = key.replace("GreaterThanEqual", "");
			return {
				[key]: { gte: value },
			};
		} else if (key.endsWith("GreaterThan")) {
			key = key.replace("GreaterThan", "");
			return {
				[key]: { gt: value },
			};
		} else if (key.endsWith("LessThanEqual")) {
			key = key.replace("LessThanEqual", "");
			return {
				[key]: { lte: value },
			};
		} else if (key.endsWith("LessThan")) {
			key = key.replace("LessThan", "");
			return {
				[key]: { lt: value },
			};
		} else if (key.endsWith("Contains")) {
			key = key.replace("Contains", "");
			return {
				[key]: { contains: value },
			};
		} else if (key.endsWith("Equals")) {
			key = key.replace("Equals", "");
			return {
				[key]: { equals: value },
			};
		} else if (key.endsWith("Before")) {
			key = key.replace("Before", "");
			return {
				[key]: { lte: new Date(value) },
			};
		} else if (key.endsWith("After")) {
			key = key.replace("After", "");
			return {
				[key]: { gte: new Date(value) },
			};
		} else if (key.endsWith("EndsWith")) {
			key = key.replace("EndsWith", "");
			return {
				[key]: { endsWith: value },
			};
		} else if (key.endsWith("StartsWith")) {
			key = key.replace("StartsWith", "");
			return {
				[key]: { startsWith: value },
			};
		} else if (key.endsWith("In")) {
			key = key.replace("In", "");
			value = value.split(",");
			return {
				[key]: { in: value },
			};
		} else if (key.endsWith("Has")) {
      key = key.replace("Has", "");
			value = value.split(",");
			return {
				[key]: { has: value },
			};
    }
	}

	generateFilters(querys) {
		const filters = {
			AND: [],
		};

		for (const query in querys) {
			if (query.startsWith("$relation")) {
				filters.AND.push(this.generateRealtionFilter(query, querys[query]));
			} else {
				filters.AND.push(this.generateFilter(query, querys[query]));
			}
		}
		return filters;
	}
}

// realtionManyTableFieldConstraint

const prismaFiltersGenerator = new PrismaFiltersGenerator();

/**
 * Patterns
 * @field numbers
 *
 * @arguments lt{field}(value), lte{field}(value), gt{field}(value), gte{field}(value), equal{field}(value), between{field}(minValue, maxValue), notEqual{field}(value), isNull{field}()
 */

/**
 * Patterns
 * @field text
 *
 * @arguments contains{field}(value), equal{field}(value), startsWith{field}(value), endsWith{field}(value), notEqual{field}(value), isNull{field}()
 */

/**
 * Patterns
 * @field date
 *
 * @arguments equal{field}(value), after{field}(value), before{field}(value), gte{field}(value), lastWeeks{field}(value), lastMonths{field}(value), lastYears{field}(value), lastDays{field}(value), isNull{field}(),
 */

module.exports = prismaFiltersGenerator;
