import srcConfig from 'src/config'
import { getRequestRoots } from 'service/utils'

const { getRoot, postRoot, postRootXForm } = getRequestRoots(srcConfig.APIS.root)

const autoLoading = true

// export const WX_GET_SHARE_CONFIG = postRootXForm('app/wx_share_config', {}, {
//   autoLoading
// })
 