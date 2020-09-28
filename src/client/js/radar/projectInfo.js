//
// IMPORTS
//
// libraries
import axios from 'axios'
// app modules
import { getModel } from '../util/localStore'
import { createMTRLPerfScale } from '../../../common/util/svg'
//
// EXPORTS
//
export { showProjectData as default }

const showProjectData = async (blip) => {
    // fetch project info
    const response = await (await axios.get('/api/v1/project/prj_id/' + blip.cw_id)).data
    // TODO add error message to footer in red

    const model = await getModel()
    // compile HTML from the template
    const modalString = projectinfoTemplate({
        modalID: 'projectInfo',
        header: blip.prj_name,
        footer: '',
        project: response.data,
        blip,
        scale: createMTRLPerfScale(blip.score, blip.performance, blip.min, blip.max),
        model,
    })
    // add to DOM and display
    d3.select('#modals').html(modalString)
    // link up the close button - DELETES the modal! (it is recreated anyway)
    d3.select('#projectInfo .closeBtn').on('click', () => {
        d3.select('#projectInfo').remove()
    })
}

const setFailureFooter = (cont, res) => {
    cont.append('div').style('color: red;').html('Failed to load project data')
    console.log('FAILED TO LOAD PROJECT DATA!')
    console.log(res)
    console.og('argh')
}
