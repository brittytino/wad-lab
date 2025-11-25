# special_max_stack.py

class MaxStack:
    def __init__(self):
        self.stack = []
        self.current_max = None

    def push(self, x):
        if not self.stack:
            self.stack.append(x)
            self.current_max = x
        else:
            if x > self.current_max:
                # store encoded value
                encoded = 2 * x - self.current_max
                self.stack.append(encoded)
                self.current_max = x
            else:
                self.stack.append(x)
        print("Pushed:", x)

    def pop(self):
        if not self.stack:
            print("Stack is empty, cannot pop")
            return
        top = self.stack.pop()
        if top > self.current_max:
            # encoded value: recover previous max
            original = self.current_max
            prev_max = 2 * self.current_max - top
            self.current_max = prev_max
            print("Popped:", original)
        else:
            print("Popped:", top)
        if not self.stack:
            self.current_max = None

    def getMax(self):
        if not self.stack:
            print("Stack is empty")
        else:
            print("Current max:", self.current_max)

    def top(self):
        if not self.stack:
            print("Stack is empty")
            return
        top = self.stack[-1]
        if top > self.current_max:
            # encoded, so actual top is current_max
            print("Top:", self.current_max)
        else:
            print("Top:", top)


print("MaxStack operations:")
print("Commands: push X | pop | top | getMax | exit")
ms = MaxStack()

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
    elif cmd[0].lower() == "getmax":
        ms.getMax()
    elif cmd[0].lower() == "exit":
        break
    else:
        print("Unknown command")
