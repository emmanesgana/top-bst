import { Node } from "./Node.js";

export class Tree {

    // constructor takes array as param
    constructor(array) {
        // create sortedarray which sorts the array to remove duplicates beofre passing it to the tree;
        const sortedArray = [...new Set(array.sort((a, b) => a - b))];
        this.root = this.buildTree(sortedArray);
    }

    // buildTree(array) takes an array of data and turns it into a balanced binary tree full of node objects
    buildTree(array) {
        // create a guard clause if array is empty
        if (array.length === 0) return null;

        // locate the middle of the array
        const mid = Math.floor(array.length / 2);
        // create new nod starting from the mid
        const node = new Node(array[mid]);
        // create left array using slice which starts on index 0 and ends at mid
        const leftSubtree = array.slice(0, mid);
        // create right array which starts after mid until the end of the array's length
        const rightSubtree = array.slice(mid + 1, array.length);

        // create node for left array
        node.left = this.buildTree(leftSubtree);
        // create node for right array
        node.right = this.buildTree(rightSubtree);

        return node;
    }

    // create insert(value) which inserts a given value into the tree
    insert(value, root = this.root) {
        // base case
        if (!root) return new Node(value);
        // check if root.data is the same as value, if so return root
        if (root.data === value) return root;

        /* 
        create a condition where if value is less than the root.data we insert the value to the leftsubtree
        otherwise add it to the right subtree
        */
        if (value < root.data) {
            root.left = this.insert(value, root.left);
        } else if (value > root.data) {
            root.right = this.insert(value, root.right);
        }

        return root;
    }

    // create getSuccessor(root) helper for delete item
    getSuccessor(root) {
        while (root.right !== null && root.left !== null) {
            root = root.left;
        }

        return root;
    }

    // create delete(value) which delete a given value from the tree
    deleteItem(value, root = this.root) {
        // create base case
        if (!root) return root;

        // If the value to be searched is in a subtree
        if (value > root.data) {
            root.right = this.deleteItem(value, root.right);
        } else if (value < root.data) {
            root.left = this.deleteItem(value, root.left);
        } else {
            // If root matches with the given value

            // Cases when root has 0 children or only right child
            if (!root.left) {
                return root.right;
            }

            // When root only has left child
            if (!root.right) {
                return root.left;
            }

            // When both children are present
            let successor = this.getSuccessor(root);
            root.data = successor.data;
            root.right = this.deleteItem(successor.data, root.right);
        }
        return root;
    }

    // create find(value) which returns the node with the given value
    find(value, root = this.root) {
        // if root is empty return null
        if (!root) return null;
        // condition to avoid duplicates
        if (root.data === value) return root;

        // check both sides if value exists, return it to root
        if (root.data > value) {
            root = this.find(value, root.left);
        } else if (root.data < value) {
            root = this.find(value, root.right);
        }

        return root;
    }

    /* 
    Write a levelOrder(callback) function that accepts a callback function as its parameter. levelOrder should traverse the tree in 
    breadth-first level order and call the callback on each node as it traverses, passing the whole node as an argument, similarly to how     
    */

    levelOrder(callback, queue = [this.root], array = []) {
        // throw an error if callback is null
        if (!callback) throw new Error('Callback function is requred.')
        // base case
        if (queue.length === 0) return queue[0];

        // starting point
        const currentNode = queue[0];

        // if callback has value
        if (callback(currentNode)) {

            //from the root we traverse from left to right

            // check if there's data from the left
            if (currentNode.left) {
                // push left data to the queue
                queue.push(currentNode.left);
            }

            //check if there's data from the right
            if (currentNode.right) {
                //push right data to the queue
                queue.push(currentNode.right);
            }

            // remove the data from the queue first by using shift and return it to be pushed inside the array
            array.push(queue.shift().data);

            // use recursion until we reach the base case
            this.levelOrder(callback, queue, array)
        }

        return array;
    }

    /* 
    Write inOrder(callback), preOrder(callback), and postOrder(callback) functions that also accept a callback as a parameter. 
    Each of these functions should traverse the tree in their respective depth-first order and pass each node to the provided callback. 
    The functions should throw an Error if no callback is given as an argument, like with levelOrder.
    
    Used Yicheng Gong's guide as mentioned in additional resources. This is a great weay to visualize what TOP wants here.
    */

    inOrder(callback, root = this.root, array = []) {
        // throw an error if callback is null
        if (!callback) throw new Error('Callback function is required.');
        // early return if root is null
        if (!root) return null;


        // inOrder-left -> root -> inOrder-right
        this.inOrder(callback, root.left, array);
        array.push(callback(root).data);
        this.inOrder(callback, root.right, array);

        return array;
    }

    preOrder(callback, root = this.root, array = []) {
        // throw an error if callback is null
        if (!callback) throw new Error('Callback function is required.');
        // early return if root is null
        if (!root) return null;

        // root -> preOrder-left -> preOrder-right
        array.push(callback(root).data);
        this.preOrder(callback, root.left, array);
        this.preOrder(callback, root.right, array);

        return array;
    }

    postOrder(callback, root = this.root, array = []) {
        // throw an error if callback is null
        if (!callback) throw new Error('Callback function is required.');
        // early return if root is null
        if (!root) return null;

        // preOrder-left -> preOrder-right -> root
        this.preOrder(callback, root.left, array);
        this.preOrder(callback, root.right, array);
        array.push(callback(root).data);

        return array;
    }

    /* 
    Write a height(node) function that returns the given node’s height. 
    Height is defined as the number of edges in the longest path from a given node to a leaf node.
    
    Mainly used the article from geeks for geeks as guide: https://www.geeksforgeeks.org/find-the-maximum-depth-or-height-of-a-tree/
    */

    height(node = this.root) {
        // check if the tree is empty - base case for recursion
        if (node === null) return 0;

        // create a counter variable and empty queue
        let count = 0;
        let queue = [];

        // push the first level element along with null
        queue.push(node);
        queue.push(null);

        // loop through queue's elements
        while (queue.length > 0) {

            // remove current node from queue
            let currentNode = queue.shift();

            // when null is encountered increase counter
            if (currentNode === null) {
                count++;

                // if queue still has elements push null again to the queue
                if (queue.length > 0) {
                    queue.push(null);
                }
            } else {

                // if null is not encountered then keep moving
                if (currentNode.left) queue.push(currentNode.left);
                if (currentNode.right) queue.push(currentNode.right);
            }
        }

        return count;
    }

    /* 
    Write a depth(node) function that returns the given node’s depth. 
    Depth is defined as the number of edges in the path from a given node to the tree’s root node.
    */
    depth(node = this.root) {
        // check if the tree is empty - base case for recursion
        if (node === null) return 0;

        const ldepth = this.depth(node.left);
        const rdepth = this.depth(node.right);

        return Math.max(ldepth, rdepth) + 1;
    }

    /* 
    Write an isBalanced() function that checks if the tree is balanced. A balanced tree is one where the difference 
    between heights of the left subtree and the right subtree of every node is not more than 1.
    */

    isBalanced(root = this.root) {
        // check if the tree is empty - base case for recursion
        if (root == null) return true

        // calculate height for left and right subtree height
        let leftHeight = this.height(root.left)
        let rightHeight = this.height(root.right)

        // allowed values for (lh - rh) are 1, -1, 0
        if (Math.abs(leftHeight - rightHeight) <= 1 &&
            this.isBalanced(root.left) == true &&
            this.isBalanced(root.right) == true)
            return true

        // returns false if the tree is unabalanced 
        return false
    }

    /* 
    Write a rebalance() function that rebalances an unbalanced tree. Tip: You’ll want to use a traversal method 
    to provide a new array to the buildTree function.
    */

    rebalance() {
        // re-using inOrder to sort the array first
        const sortedArray = this.inOrder((node) => node);
        // then use buildTree to rebuild the tree from the sortedArray as we know that buildTree always returns a balanced array
        this.root = this.buildTree(sortedArray)
    }
}

export function randomNum(max, amount) {
    let array = [];

    while (array.length < amount) {
        array.push(Math.floor(Math.random() * max));
    }

    return array;
}