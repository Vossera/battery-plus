const Store = require( 'electron-store' )
const { log, confirm } = require( './helpers' )
const store = new Store()

const get_force_discharge_setting = () => {
    // Check if force discharge is on
    const force_discharge_if_needed = store.get( 'force_discharge_if_needed', false )
    log( `Force discharge setting: ${ typeof force_discharge_if_needed } ${ force_discharge_if_needed }` )
    return force_discharge_if_needed === true
}

const toggle_force_discharge = () => {
    const status = get_force_discharge_setting()
    log( `Setting force discharge to ${ !status }` )
    store.set( 'force_discharge_if_needed', !status )
}

// Update the force discharge setting
const update_force_discharge_setting = async () => {

    try {

        const currently_allowed = get_force_discharge_setting()
        if( !currently_allowed ) {
            const proceed = await confirm( `This setting allows your battery to drain to the desired maintenance level while plugged in. This does not work well in Clamshell mode (laptop closed with an external monitor).\n\nAllow force-discharging?` )
            if( !proceed ) return false
        }

        // Toggle setting and refresh tray
        toggle_force_discharge()
        return true


    } catch ( e ) {
        log( `Error updating force discharge: `, e )
    }

}

// Maintain percentage settings
const get_maintain_percentage = () => {
    const maintain_percentage = store.get( 'maintain_percentage', 80 )
    log( `Maintain percentage setting: ${ maintain_percentage }%` )
    return maintain_percentage
}

const set_maintain_percentage = ( percentage ) => {
    log( `Setting maintain percentage to ${ percentage }%` )
    store.set( 'maintain_percentage', percentage )
}

// Charging enabled settings
const get_charging_enabled = () => {
    const charging_enabled = store.get( 'charging_enabled', true )
    log( `Charging enabled setting: ${ charging_enabled }` )
    return charging_enabled
}

const set_charging_enabled = ( enabled ) => {
    log( `Setting charging enabled to ${ enabled }` )
    store.set( 'charging_enabled', enabled )
}

module.exports = {
    get_force_discharge_setting,
    toggle_force_discharge,
    update_force_discharge_setting,
    get_maintain_percentage,
    set_maintain_percentage,
    get_charging_enabled,
    set_charging_enabled
}