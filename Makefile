install:
	npm ci
gendiff:
	node bin/gendiff.js
test:
	npx -n jest
test-coverage:
	npm test -- --coverage --coverageProvider=v8
lint:
	npx eslint .
publish:
	npm publish --dry-run
