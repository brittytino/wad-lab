# min_stack.py

class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []  # keeps current minimums

    def push(self, val):
        self.stack.append(val)
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)

    def pop(self):
        if not self.stack:
            print("Stack is empty, cannot pop")
            return
        val = self.stack.pop()
        if val == self.min_stack[-1]:
            self.min_stack.pop()
        print("Popped:", val)

    def top(self):
        if not self.stack:
            print("Stack is empty")
        else:
            print("Top:", self.stack[-1])

    def getMin(self):
        if not self.min_stack:
            print("Stack is empty")
        else:
            print("Min:", self.min_stack[-1])


print("MinStack operations:")
print("Commands: push X | pop | top | getMin | exit")
ms = MinStack()

while True:
    cmd = input("Enter command: ").strip().split()

    if not cmd:
        continue

    if cmd[0].lower() == "push":
        if len(cmd) < 2:
            print("Usage: push <int>")
        else:
            ms.push(int(cmd[1]))
    elif cmd[0].lower() == "pop":
        ms.pop()
    elif cmd[0].lower() == "top":
        ms.top()
    elif cmd[0].lower() == "getmin":
        ms.getMin()
    elif cmd[0].lower() == "exit":
        break
    else:
        print("Unknown command")
