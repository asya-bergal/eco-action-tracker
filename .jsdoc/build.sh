echo "Generating JSDoc Output. Requires 'npm install -g jsdoc ink-docstrap'."
cd "$(dirname "$0")"
jsdoc -r .. -R ../README.md -t $(npm config get prefix)/lib/node_modules/ink-docstrap/template -c conf.json
