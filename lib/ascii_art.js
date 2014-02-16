var module_name = require('../package').name;

exports.draw = function() {
  console.log('Make love, not war!\n');
  console.log('   \\\_\/');
  console.log('  \_\/ \\\_');
  console.log('   \\\_\/');
  console.log('   \/ \\                      \_');
  console.log('             \_\_\_\_\_\_\_\_\_\_\_\_\_\_\| \|\_\_\_');
  console.log('            \/\\             \| \|   \\');
  console.log('           \/  \\            \| \|    \\');
  console.log('          \/    \\                   \\');
  console.log('         \/\+\+\+\+\+\+\\\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\\');
  console.log('         \|      \|        \_\_\_        \|');
  console.log('         \|      \|       \| \| \|       \|');
  console.log('         \|      \|       \| \| \|       \|');
  console.log('         \|\_\_\_\_\_\_\|\_\_\_\_\_\_\_\|\_\|\_\|\_\_\_\_\_\_\_\|     \\\\\\%s...', module_name);
};
