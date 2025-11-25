# dll_pair_sum.py

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
    return head, tail

vals = list(map(int, input("Enter sorted DLL elements: ").split()))
x = int(input("Enter target sum x: "))
head, tail = build_dll(vals)

pairs = []
front = head
rear = tail

while front and rear and front is not rear and rear.next is not front:
    s = front.data + rear.data
    if s == x:
        pairs.append((front.data, rear.data))
        front = front.next
        rear = rear.prev
    elif s < x:
        front = front.next
    else:
        rear = rear.prev

if not pairs:
    print("No pairs found.")
else:
    print("Pairs with sum", x, ":")
    for a, b in pairs:
        print(a, b)
