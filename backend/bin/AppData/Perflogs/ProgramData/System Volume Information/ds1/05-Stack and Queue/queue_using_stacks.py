class MyQueue:
    def __init__(self):
        self.s1 = []
        self.s2 = []

    def _move_s1_to_s2(self):
        while self.s1:
            self.s2.append(self.s1.pop())

    def enqueue(self, x):
        self.s1.append(x)

    def dequeue(self):
        if not self.s1 and not self.s2:
            print("Queue empty")
            return
        if not self.s2:
            self._move_s1_to_s2()
        print("Dequeued:", self.s2.pop())

    def front(self):
        if not self.s1 and not self.s2:
            print("Queue empty")
            return
        if not self.s2:
            self._move_s1_to_s2()
        print("Front:", self.s2[-1])

    def empty(self):
        print("Empty?", not self.s1 and not self.s2)

def menu():
    q = MyQueue()
    while True:
        print("\n1.Enqueue 2.Dequeue 3.Front 4.Empty 5.Exit")
        ch = input("Choice: ")
        if ch == '1':
            v = int(input("Value: "))
            q.enqueue(v)
        elif ch == '2':
            q.dequeue()
        elif ch == '3':
            q.front()
        elif ch == '4':
            q.empty()
        elif ch == '5':
            break
        else:
            print("Invalid")

if __name__ == "__main__":
    menu()
