module.exports = function( grunt ) {
	require( 'matchdep' ).filterDev( ['grunt-*', '!grunt-legacy-util'] ).forEach( grunt.loadNpmTasks );
	grunt.util = require( 'grunt-legacy-util' );

	grunt.initConfig( {
		pkg: grunt.file.readJSON( 'package.json' ),

		exec: {
			pathpath: {
				command: 'echo $PATH',
				stdout: false,
				callback: function (error, stdout) {
					grunt.log.write( 'echo path: ' + stdout );
				}
			}
			/*phpunit: {
				command: 'phpunit -v',
				stdout: false,
				callback: function (error, stdout) {
					grunt.log.write( 'which phpunit: ' + stdout );
				}
			},*/
		}
	});

	// Register tasks.
	grunt.registerTask( 'default', ['exec'] );
};
