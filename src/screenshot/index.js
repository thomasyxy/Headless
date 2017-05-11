const exec = require('child_process').exec;

function launchHeadlessChrome(url, callback) {
  // Assuming MacOSx.
  const CHROME = '/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome';
  exec(`${CHROME} --headless --disable-gpu --screenshot ${url}`, callback);
}

launchHeadlessChrome('https://www.chromestatus.com', (err, stdout, stderr) => {
  if(err) {
    console.error(err);
    return false;
  }

  console.log(`stdout: ${stdout}
    stderr: ${stderr}`);
});
