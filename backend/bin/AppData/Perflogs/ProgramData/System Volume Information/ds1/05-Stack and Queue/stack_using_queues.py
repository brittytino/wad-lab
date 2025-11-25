from collections import deque

class MyStack:
    def __init__(self):
        self.q1 = deque()
        self.q2 = deque()

    def push(self, x):
        self.q2.append(x)
        while self.q1:
            self.q2.append(self.q1.popleft())
        self.q1, self.q2 = self.q2, self.q1

    def pop(self):
        if not self.q1:
            print("Stack empty")
            return
        print("Popped:", self.q1.popleft())

    def top(self):
        if not self.q1:
            print("Stack empty")
        else:
            print("Top:", self.q1[0])

    def empty(self):
        print("Empty?", not self.q1)

def menu():
    s = MyStack()
    while True:
        print("\n1.Push 2.Pop 3.Top 4.Empty 5.Exit")
        ch = input("Choice: ")
        if ch == '1':
            v = int(input("Value: "))
            s.push(v)
        elif ch == '2':
            s.pop()
        elif ch == '3':
            s.top()
        elif ch == '4':
            s.empty()
        elif ch == '5':
            break
        else:
            print("Invalid")

if __name__ == "__main__":
    menu()
