# multiply_linked_numbers.py

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

def list_to_number(head):
    num = 0
    cur = head
    while cur:
        num = num * 10 + cur.data
        cur = cur.next
    return num

def number_to_list(num):
    if num == 0:
        return Node(0)
    digits = list(str(num))
    head = None
    tail = None
    for d in digits:
        node = Node(int(d))
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

vals1 = list(map(int, input("Enter first number digits (space separated): ").split()))
vals2 = list(map(int, input("Enter second number digits (space separated): ").split()))

head1 = build_list(vals1)
head2 = build_list(vals2)

n1 = list_to_number(head1)
n2 = list_to_number(head2)

product = n1 * n2
result_head = number_to_list(product)

print("Product as linked list:")
print_list(result_head)
print("Numeric product:", product)
