# check_circular_list.py

class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

def build_list(values, make_circular):
    head = None
    tail = None
    for v in values:
        node = Node(v)
        if head is None:
            head = tail = node
        else:
            tail.next = node
            tail = node
    if make_circular and head is not None:
        tail.next = head
    return head

def is_circular(head):
    if head is None:
        return False
    cur = head.next
    while cur is not None and cur is not head:
        cur = cur.next
    return cur is head

vals = list(map(int, input("Enter list elements: ").split()))
ans = input("Make list circular? (y/n): ").strip().lower()
head = build_list(vals, ans == 'y')
print("Circular?" , is_circular(head))
