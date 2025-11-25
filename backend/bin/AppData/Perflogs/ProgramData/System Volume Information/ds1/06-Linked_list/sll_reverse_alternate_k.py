# sll_reverse_alternate_k.py

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

def reverse_alternate_k(head, k, do_reverse=True):
    if head is None or k <= 1:
        return head
    if do_reverse:
        cur = head
        prev = None
        count = 0
        while cur and count < k:
            nxt = cur.next
            cur.next = prev
            prev = cur
            cur = nxt
            count += 1
        head.next = reverse_alternate_k(cur, k, False)
        return prev
    else:
        cur = head
        count = 1
        while cur.next and count < k:
            cur = cur.next
            count += 1
        cur.next = reverse_alternate_k(cur.next, k, True)
        return head

vals = list(map(int, input("Enter SLL elements: ").split()))
k = int(input("Enter k: "))
head = build_list(vals)
head = reverse_alternate_k(head, k, True)
print("List after reversing alternate k nodes:")
print_list(head)
