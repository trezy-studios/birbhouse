// Module imports
// import {
//   html,
//   text,
// } from 'mdast-builder'
// import emojiRegex from 'emoji-regex'
// import emojiToName from 'gemoji/emoji-to-name.json'
// import find from 'unist-util-find'
// import visitWithParents from 'unist-util-visit-parents'
import visit from 'unist-util-visit'





const a11yEmoji = () => {
	/* eslint-disable no-param-reassign */
	// const visitor = (node, parents) => {
	const visitor = node => {
		if (node?.type === 'shortcode') {
			console.log('node', node)
		}

		if (!node || !node.value) {
			return node
		}

		// const emojiMatches = [...node.value.matchAll(emojiRegex())].reverse()

		// if (emojiMatches.length) {
		//   const parent = parents[parents.length - 1]
		//   const childIndex = parent.children.findIndex(child => child === node)

		//   const newChildren = emojiMatches.reduce((accumulator, match) => {
		//     const {
		//       index,
		//       length,
		//     } = match
		//     const [emoji] = match
		//     const emojiDescription = emojiToName[emoji] || ''

		//     console.log('emojiDescription', emojiDescription)

		//     if (accumulator.length) {
		//       const replacementRegex = new RegExp(`^.{${index + length}}`, 'u')

		//       accumulator[0].value = accumulator[0].value.replace(replacementRegex, '')
		//     }

		//     accumulator.unshift({
		//       type: 'text',
		//       value: emoji,
		//     })
		//     accumulator.unshift({
		//       type: 'html',
		//       value: `<span aria-label="${emojiDescription}" role="img">${emoji}</span>`,
		//     })

		//     return accumulator
		//   }, [])

		//   if (parent.children.length > 1) {
		//     const postChildren = parent.children.slice(childIndex, 1)
		//     const preChildren = parent.children
		//     parent.children = [
		//       ...preChildren,
		//       ...newChildren,
		//       ...postChildren,
		//     ]
		//   } else {
		//     parent.children = newChildren
		//   }
		// }

		// delete node.value

		// emojiMatches.reduce((accumulator, emojiMatch) => {

		// }, )

		// node.value = node.value.replace(emojiRegex(), match => {
		//   node.type = 'text'

		//   // const emojiMatch = gemoji.unicode?.[match]
		//   // const description = emojiMatch ? emojiMatch.description : ''

		//   // return `<span role="img" aria-label="${description}">${match}</span>`
		//   return node.value
		// })

		// return null
		return node
	}
	/* eslint-enable no-param-reassign */

	const transformer = tree => {
		// console.log('tree', tree)
		// visitWithParents(tree, visitor)
		visit(tree, visitor)
	}

	return transformer
}





export default a11yEmoji
