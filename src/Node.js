// Create a class node and export it
export class Node {

    // assign default values in the param of constructor to null
    constructor(data = null, left = null, right = null) {
        // create data that takes data param
        this.data = data;
        // create left tree that takes left param
        this.left = left;
        // create right tree that takes right param
        this.right = right;
    }
}