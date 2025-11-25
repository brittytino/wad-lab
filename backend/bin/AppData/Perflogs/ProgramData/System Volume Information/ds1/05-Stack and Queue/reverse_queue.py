from collections import deque

def reverse_queue(q):
    stack = []
    while q:
        stack.append(q.popleft())
    while stack:
        q.append(stack.pop())

if __name__ == "__main__":
    arr = list(map(int, input("Enter queue elements (front to rear): ").split()))
    q = deque(arr)
    print("Original queue:", list(q))
    reverse_queue(q)
    print("Reversed queue:", list(q))
