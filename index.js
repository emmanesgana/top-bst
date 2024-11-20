import { Tree, randomNum } from "./src/Tree.js";

const array = randomNum(100, 10);
const tree = new Tree(array);

/*
Pretty print from TOP. This was made to visualize the binary tree ina a struture format.
*/
const prettyPrint = (node = tree.root, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};


/* Start of Balanced Tree */

console.log('-- Balanced Tree --');
prettyPrint();

/* inert(value) - find(value) */
tree.insert(111); // Insert should return 111 in find below and added to the tree
console.log('Find (inserted value):\n', tree.find(111)); // Should return the node with the given value
prettyPrint();

/* deleteItem(value) - find(value) */
tree.deleteItem(111); // Should delete 111 from the tree
console.log('Find (deleted value):', tree.find(111)); // Should return null since we deleted the item above
prettyPrint();

/* levelOrder(callback) */
console.log('levelOrder:\n', tree.levelOrder((node) => node));

/* inOrder(callback) */
console.log('inOrder:\n', tree.inOrder((node) => node));

/* preOrder(callback) */
console.log('preOrder:\n', tree.preOrder((node) => node));

/* postOrder(callback) */
console.log('postOrder:\n', tree.postOrder((node) => node));

/* height(node) */
console.log('height:\t', tree.height()); // Should be 4 since the count of layers from bottom to top is 4

/* depth(node) */
console.log('depth:\t', tree.depth()); // Should be 4 since the count of layers from the top is 4

/* isBalanced() */
console.log('isBalanced:', tree.isBalanced()); // Should return false as we

// /* End of Balanced Tree */

// /* ================================= */

/* Start of Unbalanced Tree */

/* Unbalancing tree to test if it woul return false isBlanaced() and rebalance() */
const unbalancer = randomNum(10, 200);

// use insert ot insert numbers into the tree
unbalancer.forEach(number => {
    tree.insert(number);
})

console.log('-- Unbalanced Tree --');
prettyPrint()
/* isBalanced() */
console.log('isBalanced:', tree.isBalanced());

/* rebalance() */
console.log('rebalance():')
tree.rebalance();
prettyPrint();

/* Check again if balanced after rebalancing */
console.log('isBalanced:', tree.isBalanced());

/* End of Unbalanced Tree */