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
			pathpath: {
				command: 'echo $PATH',
				stdout: false,
				callback: function (error, stdout) {
					grunt.log.write( 'echo path: ' + stdout );
				}
			},
			phpunit: {
				command: 'which phpunit',
				stdout: false,
				callback: function (error, stdout) {
					grunt.log.write( 'which phpunit: ' + stdout );
				}
			},
			codecoverage: {
				cmd: 'phpdbg',
				args: ['-qrr', 'phpunit', '-c', 'codecoverage.xml', '--coverage-clover', 'clover.xml' ],
				callback: function (error, stdout) {
					grunt.log.write( 'codecoverage: ' + stdout );
				}
			}
		}
	});

	// Register tasks.
	grunt.registerTask( 'default', ['exec'] );
};
