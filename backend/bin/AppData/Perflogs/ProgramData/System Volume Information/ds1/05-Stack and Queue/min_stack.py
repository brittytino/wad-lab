class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []  # keeps track of current mins

    def push(self, val):
        self.stack.append(val)
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)

    def pop(self):
        if not self.stack:
            print("Stack empty")
            return
        val = self.stack.pop()
        if val == self.min_stack[-1]:
            self.min_stack.pop()
        print("Popped:", val)

    def top(self):
        if not self.stack:
            print("Stack empty")
        else:
            print("Top:", self.stack[-1])

    def getMin(self):
        if not self.min_stack:
            print("Stack empty")
        else:
            print("Min:", self.min_stack[-1])


def menu():
    ms = MinStack()
    while True:
        print("\n1.Push 2.Pop 3.Top 4.GetMin 5.Exit")
        ch = input("Choice: ")
        if ch == '1':
            v = int(input("Value: "))
            ms.push(v)
        elif ch == '2':
            ms.pop()
        elif ch == '3':
            ms.top()
        elif ch == '4':
            ms.getMin()
        elif ch == '5':
            break
        else:
            print("Invalid")

if __name__ == "__main__":
    menu()
