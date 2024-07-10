const { execFile } = require('child_process');

const files = ['matchId.js', 'message.js', 'player.js', 'recent.js'];

files.forEach(file => {
  execFile('node', [file], (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing ${file}:`, error);
      return;
    }

    console.log(`Output of ${file}:\n`, stdout);
    if (stderr) {
      console.error(`Error output of ${file}:\n`, stderr);
    }
  });
});
