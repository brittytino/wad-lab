# partition_list.py

class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

def build_list(values):
    head = None
    tail = None
    for v in values:
        node = Node(v)
        if head is None:
            head = tail = node
        else:
            tail.next = node
            tail = node
    return head

def print_list(head):
    cur = head
    while cur:
        print(cur.data, end=" ")
        cur = cur.next
    print()

def partition(head, x):
    before_head = before_tail = None
    after_head = after_tail = None
    cur = head
    while cur:
        nxt = cur.next
        cur.next = None
        if cur.data < x:
            if before_head is None:
                before_head = before_tail = cur
            else:
                before_tail.next = cur
                before_tail = cur
        else:
            if after_head is None:
                after_head = after_tail = cur
            else:
                after_tail.next = cur
                after_tail = cur
        cur = nxt
    if before_head is None:
        return after_head
    before_tail.next = after_head
    return before_head

vals = list(map(int, input("Enter list elements: ").split()))
x = int(input("Enter x: "))
head = build_list(vals)
new_head = partition(head, x)
print("Partitioned list:")
print_list(new_head)
