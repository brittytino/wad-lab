# sll_sort_0_1_2.py

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

def sort_0_1_2(head):
    c0 = c1 = c2 = 0
    cur = head
    while cur:
        if cur.data == 0:
            c0 += 1
        elif cur.data == 1:
            c1 += 1
        else:
            c2 += 1
        cur = cur.next
    cur = head
    while cur:
        if c0 > 0:
            cur.data = 0
            c0 -= 1
        elif c1 > 0:
            cur.data = 1
            c1 -= 1
        else:
            cur.data = 2
            c2 -= 1
        cur = cur.next
    return head

vals = list(map(int, input("Enter SLL elements (0/1/2): ").split()))
head = build_list(vals)
head = sort_0_1_2(head)
print("Sorted list:")
print_list(head)
