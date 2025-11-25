class CircularQueue:
    def __init__(self, k):
        self.size = k
        self.q = [None] * k
        self.front = -1
        self.rear = -1

    def is_full(self):
        return (self.rear + 1) % self.size == self.front

    def is_empty(self):
        return self.front == -1

    def enqueue(self, x):
        if self.is_full():
            print("Queue full")
            return
        if self.is_empty():
            self.front = self.rear = 0
        else:
            self.rear = (self.rear + 1) % self.size
        self.q[self.rear] = x
        print("Enqueued:", x)

    def dequeue(self):
        if self.is_empty():
            print("Queue empty")
            return
        val = self.q[self.front]
        if self.front == self.rear:
            self.front = self.rear = -1
        else:
            self.front = (self.front + 1) % self.size
        print("Dequeued:", val)

    def display(self):
        if self.is_empty():
            print("Queue empty")
            return
        i = self.front
        out = []
        while True:
            out.append(str(self.q[i]))
            if i == self.rear:
                break
            i = (i + 1) % self.size
        print("Queue:", " ".join(out))

if __name__ == "__main__":
    k = int(input("Enter size of circular queue: "))
    cq = CircularQueue(k)
    while True:
        print("\n1.Enqueue 2.Dequeue 3.Display 4.Exit")
        ch = input("Choice: ")
        if ch == '1':
            v = int(input("Value: "))
            cq.enqueue(v)
        elif ch == '2':
            cq.dequeue()
        elif ch == '3':
            cq.display()
        elif ch == '4':
            break
        else:
            print("Invalid")
