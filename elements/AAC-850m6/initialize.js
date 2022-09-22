function(instance, context) {
    instance.data.noscrubs = function no_scrubs(instance, context) {

        // initialize here
        instance.data.initialized = null
        instance.data.system_fields = ['Created By', 'Slug', 'Created Date', 'Modified Date', '_id']
        instance.data.doubles = [/_date_range(?!.*_date_range)/, /_number_range(?!.*_number_range)/, /_geographic_address(?!.*_geographic_address)/]

        instance.data.funcUpdate = function update(instance, props) {
            instance.data.start = Date.now()
            // move properties to instance
            instance.data.funcGetProps(instance, props)

            instance.data.fields = instance.data.things.map(thing => thing && thing.hasOwnProperty('get') && thing.hasOwnProperty('listProperties') && thing.listProperties())
            
            instance.data.funcProcessFields(instance, props)
            instance.data.funcPublishStates(instance)

            instance.data.initialized = true
            instance.publishState('initialized', instance.data.initialized)
            instance.triggerEvent('initialized')

            console.log('init time: ', Date.now() - instance.data.start)

        }

        instance.data.funcPublishStates = function publishStates(instance) {
            instance.data.fields.forEach((fields, i) => {
                instance.publishState('field_names_list_' + (i+1), fields)
            })
        
        }

        instance.data.funcGetProps = function getProps(instance, props) {
            // move main properties into instance
            instance.data.things = Object.getOwnPropertyNames(props).filter(prop => prop.includes('thing')).map(prop => props[prop])
        }
            
        instance.data.funcProcessFields = function processFields(instance, props) {
            const regx = /_[^_]+$/
            const regx2 = /_custom(?!.*_custom)/
            instance.data.fields.forEach((fields, i) => {
                if (!fields)
                    return
                //no_system
                var system_fields = fields.filter(field => instance.data.system_fields.includes(field))
                instance.data.fields[i] = fields.filter(field => !instance.data.system_fields.includes(field))
                //remove_type
                if (props.remove_type) {
                    // remove "doubles"
                    instance.data.fields[i] = instance.data.fields[i].map(field => {
                        instance.data.doubles.forEach(regex => field = field.replace(regex, '_double'))
                        return field
                    })
                    instance.data.fields[i] = instance.data.fields[i].map(field => field.replace(regx, '').replace(regx2, ''))
                }
                //title_case
                if (props.title_case)
                    instance.data.fields[i] = instance.data.fields[i].map(field => field.replaceAll('_', ' ').split(' ').map(word => word.replace(word[0], word[0].toUpperCase())).join(' '))
                //put system fields back, if supposed to
                if (!props.no_system) {
                    instance.data.fields[i] = instance.data.fields[i].concat(system_fields)
                    if (props.title_case) {
                        var idIndex = instance.data.fields[i].indexOf('_id')
                        if (idIndex > -1) instance.data.fields[i][idIndex] = 'Unique ID'
                    }
                }
            })
        }
    } // end noscrubs

    instance.data.noscrubs(instance, context)

} // end init