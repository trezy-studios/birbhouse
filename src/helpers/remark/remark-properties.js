// Module imports
// import {
//   html,
//   text,
// } from 'mdast-builder'
// import emojiRegex from 'emoji-regex'
// import emojiToName from 'gemoji/emoji-to-name.json'
// import find from 'unist-util-find'
// import visitWithParents from 'unist-util-visit-parents'
import visitWithParents from 'unist-util-visit-parents'





const properties = () => {
  /* eslint-disable no-param-reassign */
  const visitor = (node, parents) => {
    if (!node.value) {
      return node
    }

    const matchData = /^\{(.+)\}/gu.exec(node.value)

    if (matchData) {
      const {
        index: matchIndex,
      } = matchData
      const [match, propertiesString] = matchData

      const parent = parents[parents.length - 1]
      const childIndex = parent.children.findIndex(child => child === node)
      const targetNode = parent.children[childIndex - 1]

      // Delete node if it only contains properties, otherwise remove the
      // properties string from the node.
      if (match.trim() === matchData.input.trim()) {
        parent.children = parent.children.splice(childIndex, 1)
      } else {
        node.value = node.value.substring(matchIndex + match.length)
      }

      const keyValues = [...propertiesString.matchAll(/([\w-]+)=(\w+|".+")/gui)]
        .reduce((accumulator, [, key, value]) => ({
          ...accumulator,
          [key.trim()]: value.trim().replace(/"(.+)"/u, '$1'),
        }), {})

      targetNode.data = {
        ...keyValues,

        classes: [...propertiesString.matchAll(/\.(-?[_a-z]+[_a-z0-9-]*)/gui)]
          .map(([, className]) => className),

        id: [...propertiesString.matchAll(/#([\w-]+)/gui)].reverse()[0] || null,
      }

      console.log(targetNode)
    }

    return node
  }
  /* eslint-enable no-param-reassign */

  const transformer = tree => {
    visitWithParents(tree, 'text', visitor)
    // visit(tree, visitor)
  }

  return transformer
}





export { properties }
