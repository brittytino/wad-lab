# sll_pairwise_swap.py

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

def pairwise_swap(head):
    cur = head
    while cur and cur.next:
        cur.data, cur.next.data = cur.next.data, cur.data
        cur = cur.next.next
    return head

vals = list(map(int, input("Enter SLL elements: ").split()))
head = build_list(vals)
head = pairwise_swap(head)
print("After pairwise swap:")
print_list(head)
