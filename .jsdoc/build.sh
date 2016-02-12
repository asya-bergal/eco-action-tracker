echo "Generating JSDoc Output. Requires 'npm install -g jsdoc ink-docstrap'."
dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
jsdoc -r .. -R ../README.md -t $(npm config get prefix)/lib/node_modules/ink-docstrap/template -c conf.json
