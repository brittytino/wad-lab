# binary_tree_ops.py

# Simple binary tree node
class Node:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

# --- Building a tree from level-order input ---
# Example input: 1 2 3 -1 -1 4 5   (use -1 for "no node")
def build_tree_level_order():
    vals = input("Enter node values in level order (use -1 for null): ").split()
    if not vals:
        return None

    # convert to ints
    arr = [int(x) for x in vals]

    if arr[0] == -1:
        return None

    root = Node(arr[0])
    queue = [root]
    i = 1

    while queue and i < len(arr):
        current = queue.pop(0)

        # left child
        if i < len(arr) and arr[i] != -1:
            current.left = Node(arr[i])
            queue.append(current.left)
        i += 1

        # right child
        if i < len(arr) and arr[i] != -1:
            current.right = Node(arr[i])
            queue.append(current.right)
        i += 1

    return root

# --- Traversals (DFS) ---
def inorder(root):
    if root is None:
        return
    inorder(root.left)
    print(root.data, end=" ")
    inorder(root.right)

def preorder(root):
    if root is None:
        return
    print(root.data, end=" ")
    preorder(root.left)
    preorder(root.right)

def postorder(root):
    if root is None:
        return
    postorder(root.left)
    postorder(root.right)
    print(root.data, end=" ")

# --- BFS (level-order) ---
def bfs(root):
    if root is None:
        return
    queue = [root]
    while queue:
        node = queue.pop(0)
        print(node.data, end=" ")
        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)

# --- Count total nodes ---
def count_nodes(root):
    if root is None:
        return 0
    return 1 + count_nodes(root.left) + count_nodes(root.right)

# --- Count leaf nodes (no children) ---
def count_leaf_nodes(root):
    if root is None:
        return 0
    if root.left is None and root.right is None:
        return 1
    return count_leaf_nodes(root.left) + count_leaf_nodes(root.right)

# --- Height / depth of tree (number of levels) ---
def tree_height(root):
    if root is None:
        return 0
    left_h = tree_height(root.left)
    right_h = tree_height(root.right)
    return 1 + (left_h if left_h > right_h else right_h)

# --- Find level (1-based) of node with given value ---
def find_level(root, value, level=1):
    if root is None:
        return -1
    if root.data == value:
        return level
    left = find_level(root.left, value, level + 1)
    if left != -1:
        return left
    return find_level(root.right, value, level + 1)

# --- Check if two trees are structurally identical ---
def structurally_identical(r1, r2):
    if r1 is None and r2 is None:
        return True
    if r1 is None or r2 is None:
        return False
    # we only care about structure, not data
    return (structurally_identical(r1.left, r2.left) and
            structurally_identical(r1.right, r2.right))

# ---------- MAIN INTERACTIVE PART ----------
print("Build first binary tree:")
root1 = build_tree_level_order()

while True:
    print("\n--- Binary Tree Menu ---")
    print("1. Inorder traversal")
    print("2. Preorder traversal")
    print("3. Postorder traversal")
    print("4. BFS (level-order)")
    print("5. Count total nodes")
    print("6. Count leaf nodes")
    print("7. Height of tree")
    print("8. Find level of a value")
    print("9. Build second tree and check structural identity")
    print("0. Exit")
    choice = input("Enter your choice: ").strip()

    if choice == '1':
        print("Inorder:", end=" ")
        inorder(root1)
        print()
    elif choice == '2':
        print("Preorder:", end=" ")
        preorder(root1)
        print()
    elif choice == '3':
        print("Postorder:", end=" ")
        postorder(root1)
        print()
    elif choice == '4':
        print("BFS:", end=" ")
        bfs(root1)
        print()
    elif choice == '5':
        print("Total nodes:", count_nodes(root1))
    elif choice == '6':
        print("Leaf nodes:", count_leaf_nodes(root1))
    elif choice == '7':
        print("Height (number of levels):", tree_height(root1))
    elif choice == '8':
        v = int(input("Enter value to find level: "))
        lvl = find_level(root1, v)
        if lvl == -1:
            print("Value not found in tree.")
        else:
            print("Level of", v, "is:", lvl)
    elif choice == '9':
        print("Build second binary tree:")
        root2 = build_tree_level_order()
        same = structurally_identical(root1, root2)
        print("Structurally identical?", same)
    elif choice == '0':
        break
    else:
        print("Invalid choice")
