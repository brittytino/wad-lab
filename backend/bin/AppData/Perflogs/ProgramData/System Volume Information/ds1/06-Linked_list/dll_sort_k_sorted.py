# dll_sort_k_sorted.py

class DNode:
    def __init__(self, data):
        self.data = data
        self.prev = None
        self.next = None

def build_dll(values):
    head = None
    tail = None
    for v in values:
        node = DNode(v)
        if head is None:
            head = tail = node
        else:
            tail.next = node
            node.prev = tail
            tail = node
    return head

def dll_to_list(head):
    vals = []
    cur = head
    while cur:
        vals.append(cur.data)
        cur = cur.next
    return vals

def list_to_dll(values):
    head = None
    tail = None
    for v in values:
        node = DNode(v)
        if head is None:
            head = tail = node
        else:
            tail.next = node
            node.prev = tail
            tail = node
    return head

def print_dll(head):
    cur = head
    while cur:
        print(cur.data, end=" ")
        cur = cur.next
    print()

vals = list(map(int, input("Enter DLL elements (k-sorted): ").split()))
k = int(input("Enter k (max distance from sorted position): "))

head = build_dll(vals)
arr = dll_to_list(head)
arr.sort()
head = list_to_dll(arr)

print("Sorted DLL:")
print_dll(head)
