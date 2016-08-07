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
			/*pathpath: {
				cmd: 'echo $PATH',
				stdout: false,
				callback: function (error, stdout) {
					grunt.log.write( 'echo path: ' + stdout );
				}
			},
			phpunit: {
				cmd: 'which phpunit',
				stdout: false,
				callback: function (error, stdout) {
					grunt.log.write( 'which phpunit: ' + stdout );
				}
			},*/
			codecoverage: {
				cmd: 'phpdbg',
				args: ['-qrr', 'phpunit', '-c', 'codecoverage.xml', '--coverage-clover', 'clover.xml' ],
				callback: function (error, stdout) {
					grunt.log.write( 'codecoverage: ' + error + ' <--> ' + stdout );
				}
			}
		}
	});

	grunt.registerMultiTask( 'exec', 'Runs PHPUnit tests, including the ajax and multisite tests.', function() {
		grunt.util.spawn( {
			args: this.data.args,
			cmd:  this.data.cmd,
			opts: { stdio: 'inherit' }
		}, this.async() );
	});

	// Register tasks.
	grunt.registerTask( 'default', ['exec'] );
};
