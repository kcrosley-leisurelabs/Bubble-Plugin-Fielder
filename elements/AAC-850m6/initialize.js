function(instance, context) {
    instance.data.noscrubs = function no_scrubs(instance, context) {

        // initialize here
        instance.data.initialized = null
        instance.data.system_fields = ['Created By', 'Slug', 'Created Date', 'Modified Date', '_id', 'email', 'logged_in']
    instance.data.doubles = [/_date_range(?!.*_date_range)/, /_number_range(?!.*_number_range)/, /_geographic_address(?!.*_geographic_address)/, /_option(?!.*_list_option).*/]
        instance.data.underscores = /_+/g

        instance.data.funcUpdate = function update(instance, props) {
            if (instance.data.debug) instance.data.start = Date.now()
            // move properties to instance
            instance.data.funcGetProps(instance, props)
            console.log(instance.data.things)
            instance.data.fields = instance.data.things.map(thing => thing && thing.get && thing.listProperties && thing.listProperties())
            instance.data.debug && console.log('Before processing Bubble fields are as follows: ', JSON.stringify(instance.data.fields))

            instance.data.funcProcessFields(instance, props)
            instance.data.funcPublishStates(instance)

            instance.data.initialized = true
            instance.publishState('initialized', instance.data.initialized)
            instance.triggerEvent('initialized')

            instance.data.debug && console.log('Processing time: ', Date.now() - instance.data.start)

        }

        instance.data.funcPublishStates = function publishStates(instance) {
            instance.data.fields.forEach((fields, i) => {
                instance.publishState('field_names_list_' + (i+1), fields)
            })
        
        }

        instance.data.funcGetProps = function getProps(instance, props) {
            // move main properties into instance
            instance.data.things = Object.getOwnPropertyNames(props).filter(prop => prop.includes('thing')).map(prop => props[prop])
            instance.data.debug = props.debug
        }
            
        instance.data.funcProcessFields = function processFields(instance, props) {
            const regx = /_[^_]+$/ // matches last _something
            const regx2 = /_custom(?!.*_custom).*/
            const regx3 = /_doublz(?!.*_doublz).*/
            const regx4 = /_list(?!.*_list).*/
            instance.data.fields.forEach((fields, i) => {
                if (!fields)
                    return
                //no_system
                var system_fields = []
                system_fields[i] = fields.filter(field => instance.data.system_fields.includes(field))
                instance.data.fields[i] = fields.filter(field => !instance.data.system_fields.includes(field))
                //remove_type
                if (props.remove_type) {
                    // remove "doubles"
                    instance.data.fields[i] = instance.data.fields[i].map(field => {
                        instance.data.doubles.forEach(regex => field = field.replace(regex, '_doublz'))
                        return field
                    })
                    // remove _custom and any remaining _list
                    instance.data.fields[i] = instance.data.fields[i].map(field => {
                        var newfield = field.replace(regx2, '_custom').replace(regx, '')
                        if (newfield.endsWith('_list')) newfield = newfield.replace(regx4, '')
                        return newfield
                    })
                }
                //title_case
                if (props.title_case) {
                    instance.data.fields[i] = instance.data.fields[i].map(field => field.replaceAll(instance.data.underscores, '_').replaceAll(instance.data.underscores, ' ').trim().split(' ').map(word => word.replace(word[0], word[0].toUpperCase())).join(' '))
                }
                instance.data.debug && console.log('After processing, custom fields have become: ', JSON.stringify(instance.data.fields))
                //put system fields back, if supposed to
                if (!props.no_system) {
                    instance.data.fields[i] = instance.data.fields[i].concat(system_fields[i])
                    if (props.title_case) {
                        var idIndex = instance.data.fields[i].indexOf('_id')
                        if (idIndex > -1) instance.data.fields[i][idIndex] = 'Unique ID'
                        var emailIndex = instance.data.fields[i].indexOf('email')
                        if (emailIndex > -1) instance.data.fields[i][emailIndex] = 'Email'
                        var loggedIndex = instance.data.fields[i].indexOf('logged_in')
                        if (loggedIndex > -1) instance.data.fields[i][loggedIndex] = 'Logged In'
                    }
                }
            })
        }
    } // end noscrubs

    instance.data.noscrubs(instance, context)

} // end init