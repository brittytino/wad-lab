# dll_insert_sorted.py

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

def insert_sorted(head, data):
    node = DNode(data)
    if head is None:
        return node
    if data <= head.data:
        node.next = head
        head.prev = node
        return node
    cur = head
    while cur.next and cur.next.data < data:
        cur = cur.next
    node.next = cur.next
    node.prev = cur
    cur.next = node
    if node.next:
        node.next.prev = node
    return head

vals = list(map(int, input("Enter sorted DLL elements: ").split()))
data = int(input("Enter value to insert: "))
head = build_dll(vals)
head = insert_sorted(head, data)
print("DLL after insertion:")
print_dll(head)
