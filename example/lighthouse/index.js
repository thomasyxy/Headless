const lighthouse = require('lighthouse');
const ChromeLauncher = require('lighthouse/lighthouse-cli/chrome-launcher.js').ChromeLauncher;
const Printer = require('lighthouse/lighthouse-cli/printer');

function launchChromeAndRunLighthouse(url, flags, config) {
  const launcher = new ChromeLauncher({port: 9222, autoSelectChrome: true});

  return launcher.run() // Launch Chrome.
    .then(() => lighthouse(url, flags, config)) // Run Lighthouse.
    .then(results => launcher.kill().then(() => results)) // Kill Chrome and return results.
    .catch(err => {
      // Kill Chrome if there's an error.
      return launcher.kill().then(() => {
        throw err;
      });
    });
}

// Use an existing config or create a custom one.
const config = require('lighthouse/lighthouse-core/config/perf.json');
const url = 'https://example.com';
const flags = {output: 'html'};

launchChromeAndRunLighthouse(url, flags, config).then(lighthouseResults => {
  lighthouseResults.artifacts = undefined; // You can save the artifacts separately if so desired
  return Printer.write(lighthouseResults, flags.output);
}).catch(err => console.error(err));
