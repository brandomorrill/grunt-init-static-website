'use strict';

// Basic template description.
exports.description = 'Create a basic static website.';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'This template sets you up with everything you need to build a simple static website.';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = 'Gruntfile.js';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({}, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('version'),
    init.prompt('description'),
    {
        name: 'pageTitle',
        message: 'What should go in the title tag?',
        default: 'My Project',
    },
    {
        name: 'authorName',
        message: 'What is your name?'
    },
    {
        name: 'authorEmail',
        message: 'What is your email address?'
    },
  ], function(err, props) {

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // All done!
    done();
  });

};
