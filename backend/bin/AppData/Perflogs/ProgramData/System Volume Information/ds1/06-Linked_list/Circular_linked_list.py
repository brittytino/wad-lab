class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


class CircularLinkedList:
    def __init__(self):
        self.head = None

    def insert_at_beginning(self, data):
        new_node = Node(data)
        if self.head is None:
            self.head = new_node
            new_node.next = self.head
        else:
            temp = self.head
            while temp.next != self.head:
                temp = temp.next
            new_node.next = self.head
            temp.next = new_node
            self.head = new_node

    def insert_at_end(self, data):
        new_node = Node(data)
        if self.head is None:
            self.head = new_node
            new_node.next = self.head
        else:
            temp = self.head
            while temp.next != self.head:
                temp = temp.next
            temp.next = new_node
            new_node.next = self.head

    def delete_at_beginning(self):
        if self.head is None:
            print("List empty!")
            return
        if self.head.next == self.head:
            print("Deleted:", self.head.data)
            self.head = None
            return
        temp = self.head
        while temp.next != self.head:
            temp = temp.next
        print("Deleted:", self.head.data)
        temp.next = self.head.next
        self.head = self.head.next

    def delete_at_end(self):
        if self.head is None:
            print("List empty!")
            return
        if self.head.next == self.head:
            print("Deleted:", self.head.data)
            self.head = None
            return
        temp = self.head
        prev = None
        while temp.next != self.head:
            prev = temp
            temp = temp.next
        print("Deleted:", temp.data)
        prev.next = self.head

    def search_and_delete(self, key):
        if self.head is None:
            print("List empty!")
            return
        temp = self.head
        prev = None
        while True:
            if temp.data == key:
                if prev:
                    prev.next = temp.next
                else:
                    # deleting head
                    last = self.head
                    while last.next != self.head:
                        last = last.next
                    last.next = temp.next
                    self.head = temp.next
                print(f"Deleted {key}")
                return
            prev = temp
            temp = temp.next
            if temp == self.head:
                break
        print(f"{key} not found!")

    def sort_list(self):
        if self.head is None:
            return
        end = None
        while end != self.head.next:
            p = self.head
            while p.next != end and p.next != self.head:
                if p.data > p.next.data:
                    p.data, p.next.data = p.next.data, p.data
                p = p.next
            end = p
            self.display()

    def display(self):
        if self.head is None:
            print("List empty!")
            return
        temp = self.head
        while True:
            print(temp.data, end=" -> ")
            temp = temp.next
            if temp == self.head:
                break
        print("(head)")


def menu():
    cll = CircularLinkedList()
    while True:
        print("\n--- Circular Linked List Menu ---")
        print("1. Insert at Beginning")
        print("2. Insert at End")
        print("3. Delete at Beginning")
        print("4. Delete at End")
        print("5. Find and Delete")
        print("6. Sort List")
        print("7. Display")
        print("8. Exit")

        choice = input("Enter choice: ")

        if choice == '1':
            cll.insert_at_beginning(int(input("Enter value: ")))
        elif choice == '2':
            cll.insert_at_end(int(input("Enter value: ")))
        elif choice == '3':
            cll.delete_at_beginning()
        elif choice == '4':
            cll.delete_at_end()
        elif choice == '5':
            cll.search_and_delete(int(input("Enter value: ")))
        elif choice == '6':
            cll.sort_list()
        elif choice == '7':
            cll.display()
        elif choice == '8':
            break
        else:
            print("Invalid choice!")

if __name__ == "__main__":
    menu()
