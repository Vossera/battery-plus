const { app } = require( 'electron' )
const { alert, log } = require( './modules/helpers' )
const { set_initial_interface } = require( './modules/interface' )

// Enable auto-updates
require( 'update-electron-app' )( {
    logger: {
        log: ( ...data ) => log( `[ update-electron-app ] `, ...data )
    }
} )

/* ///////////////////////////////
// Event listeners
// /////////////////////////////*/

/* ///////////////////////////////
// Global config
// /////////////////////////////*/

// Show dock icon with default high-resolution icon
if (app.dock) {
  app.dock.show()
}

/* ///////////////////////////////
// Event listeners
// /////////////////////////////*/

app.whenReady().then( set_initial_interface )

/* ///////////////////////////////
// Debugging
// /////////////////////////////*/
const debug = false
if( debug ) app.whenReady().then( async () => {

    await alert( __dirname )

    await alert( Object.keys( process.env ).join( '\n' ) )

    const { HOME, PATH, USER } = process.env
    await alert( `HOME: ${ HOME }\n\nPATH: ${ PATH }\n\nUSER: ${ USER }` )

} )
