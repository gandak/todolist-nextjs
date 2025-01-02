class BinaryTree {
  constructor(value, left, right) {
    (this.value = value), (this.left = left), (this.right = right);
  }
}

const root = new BinaryTree(9);
const v1 = new BinaryTree(1);
const v3 = new BinaryTree(3);
const v4 = new BinaryTree(4);
const v5 = new BinaryTree(5);
const v6 = new BinaryTree(6);
const v8 = new BinaryTree(8);

root.left = v4;
root.right = v6;
v4.left = v3;
v6.left = v1;
v6.right = v5;
v5.right = v8;

console.log(root);
