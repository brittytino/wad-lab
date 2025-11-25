# bst_operations.py

class BSTNode:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

def insert(root, key):
    if root is None:
        return BSTNode(key)
    if key < root.key:
        root.left = insert(root.left, key)
    elif key > root.key:
        root.right = insert(root.right, key)
    else:
        # duplicate: ignore or handle as you like
        print("Key", key, "already in BST, ignoring.")
    return root

def inorder(root):
    if root is None:
        return
    inorder(root.left)
    print(root.key, end=" ")
    inorder(root.right)

def find_min_node(root):
    if root is None:
        return None
    current = root
    while current.left:
        current = current.left
    return current

def find_max_node(root):
    if root is None:
        return None
    current = root
    while current.right:
        current = current.right
    return current

def delete(root, key):
    if root is None:
        print("Key not found.")
        return None

    if key < root.key:
        root.left = delete(root.left, key)
    elif key > root.key:
        root.right = delete(root.right, key)
    else:
        # Node found
        # Case 1: no child or one child
        if root.left is None:
            temp = root.right
            return temp
        elif root.right is None:
            temp = root.left
            return temp
        else:
            # Case 2: two children -> inorder successor
            successor = find_min_node(root.right)
            root.key = successor.key
            root.right = delete(root.right, successor.key)
    return root

# -------- Interactive BST ----------
root = None

print("Enter initial keys for BST (space separated):")
vals = input().split()
for v in vals:
    root = insert(root, int(v))

while True:
    print("\n--- BST Menu ---")
    print("1. Insert key")
    print("2. Delete key")
    print("3. Inorder traversal (sorted)")
    print("4. Find min")
    print("5. Find max")
    print("0. Exit")
    ch = input("Choice: ").strip()

    if ch == '1':
        k = int(input("Enter key to insert: "))
        root = insert(root, k)
    elif ch == '2':
        k = int(input("Enter key to delete: "))
        root = delete(root, k)
    elif ch == '3':
        print("Inorder:", end=" ")
        inorder(root)
        print()
    elif ch == '4':
        node = find_min_node(root)
        if node:
            print("Min key:", node.key)
        else:
            print("Tree is empty.")
    elif ch == '5':
        node = find_max_node(root)
        if node:
            print("Max key:", node.key)
        else:
            print("Tree is empty.")
    elif ch == '0':
        break
    else:
        print("Invalid choice")
