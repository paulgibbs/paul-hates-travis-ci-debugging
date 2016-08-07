module.exports = function( grunt ) {
	require( 'matchdep' ).filterDev( ['grunt-*', '!grunt-legacy-util'] ).forEach( grunt.loadNpmTasks );
	grunt.util = require( 'grunt-legacy-util' );

	grunt.initConfig( {
		pkg: grunt.file.readJSON( 'package.json' ),
		phpunit: {
			'codecoverage': {
				cmd: 'phpdbg',
				args: ['-qrr', grunt.config.get( 'BP_PHPUNIT' ), '-c', 'codecoverage.xml', '--coverage-clover', 'clover.xml' ]
			}
		},

		exec: {
			debug: {
				command: 'which phpunit',
				stdout: false,
				callback: function (error, stdout) {
					grunt.config.log( 'which phpunit: ' + stdout );
				}
			}
		}
	});

	// Register tasks.
	grunt.registerTask( 'default', ['exec:debug'] );
};
