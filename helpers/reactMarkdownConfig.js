// Local imports
import {
  Code,
  List,
} from 'helpers/markdownRenderers'





const config = {
  disallowedTypes: [
    'heading',
    'html',
    'image',
    'imageReference',
    'linkReference',
    'thematicBreak',
  ],
  renderers: {
    code: Code,
    list: List,
  },
  unwrapDisallowed: true,
}





export default config
