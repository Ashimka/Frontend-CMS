export const getReviewWordWithEnding = (reviewCount: number) => {
	const reviewEnding = ['отзыв', 'отзыва', 'отзывов']

	const result = new Intl.PluralRules('ru-Ru').select(reviewCount)
	switch (result) {
		case 'one':
			return `${reviewCount} ${reviewEnding[0]}`
		case 'few':
			return `${reviewCount} ${reviewEnding[1]}`
		default:
			return `${reviewCount} ${reviewEnding[2]}`
	}
}
