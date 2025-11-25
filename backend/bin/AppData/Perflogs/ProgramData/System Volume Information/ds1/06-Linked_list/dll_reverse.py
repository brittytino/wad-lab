# dll_reverse.py

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

def print_dll(head):
    cur = head
    while cur:
        print(cur.data, end=" ")
        cur = cur.next
    print()

def reverse_dll(head):
    if head is None:
        return None
    cur = head
    new_head = None
    while cur:
        cur.prev, cur.next = cur.next, cur.prev
        new_head = cur
        cur = cur.prev
    return new_head

vals = list(map(int, input("Enter DLL elements: ").split()))
head = build_dll(vals)
head = reverse_dll(head)
print("Reversed DLL:")
print_dll(head)
