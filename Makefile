install:
	npm ci
gendiff:
	node bin/gendiff.js
publish:
	npm publish --dry-run
lint:
	npx eslint .
test:
	npx -n --experimental-vm-modules jest --watch
test-coverage:
	npm test -- --coverage --coverageProvider=v8

