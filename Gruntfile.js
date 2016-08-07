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
			},
			/*phpunit: {
				command: 'phpunit -v',
				stdout: false,
				callback: function (error, stdout) {
					grunt.log.write( 'which phpunit: ' + stdout );
				}
			},*/

			codecoverage: {
				command: 'phpdbg -qrr phpunit -c /tmp/wordpress/codecoverage.xml --coverage-clover /tmp/wordpress/clover.xml'
			}
		}
	});

	// Register tasks.
	grunt.registerTask( 'default', ['exec'] );
};
