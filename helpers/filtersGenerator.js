class PrismaFiltersGenerator {
	constructor() {
		this.query;
	}

	generateFilters(querys) {
		const filters = {
			AND: [],
		};

		for (const query in querys) {
			if (query.endsWith("GreaterThanEqual")) {
				const key = query.replace("GreaterThanEqual", "");
				const value = querys[query];
				filters.AND.push({
					[key]: { gte: value },
				});
			} else if (query.endsWith("GreaterThan")) {
				const key = query.replace("GreaterThan", "");
				const value = querys[query];
				filters.AND.push({
					[key]: { gt: value },
				});
			} else if (query.endsWith("LessThanEqual")) {
				const key = query.replace("LessThanEqual", "");
				const value = querys[query];
				filters.AND.push({
					[key]: { lte: value },
				});
			} else if (query.endsWith("LessThan")) {
				const key = query.replace("LessThan", "");
				const value = querys[query];
				filters.AND.push({
					[key]: { lt: value },
				});
			} else if (query.endsWith("Contains")) {
				const key = query.replace("Contains", "");
				const value = querys[query];
				filters.AND.push({
					[key]: { contains: value },
				});
			} else if (query.endsWith("Equal")) {
				const key = query.replace("Equal", "");
				const value = querys[query];
				filters.AND.push({
					[key]: { equal: value },
				});
			} else if (query.endsWith("Before")) {
				const key = query.replace("Before", "");
				const value = querys[query];
				filters.AND.push({
					[key]: { lte: new Date(value) },
				});
			} else if (query.endsWith("After")) {
				const key = query.replace("After", "");
				const value = querys[query];
				filters.AND.push({
					[key]: { gte: new Date(value) },
				});
			} else if (query.endsWith("EndsWith")) {
				const key = query.replace("EndsWith", "");
				const value = querys[query];
				filters.AND.push({
					[key]: { endsWith: value },
				});
			} else if (query.endsWith("StartsWith")) {
				const key = query.replace("StartsWith", "");
				const value = querys[query];
				filters.AND.push({
					[key]: { startsWith: value },
				});
			} else if (query.endsWith("In")) {
				const key = query.replace("In", "");
				const value = querys[query].split(",");
				filters.AND.push({
					[key]: { in: value },
				});
			}
		}
		return filters;
	}
}

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
