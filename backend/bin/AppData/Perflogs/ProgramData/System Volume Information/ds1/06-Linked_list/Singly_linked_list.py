class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


class SinglyLinkedList:
    def __init__(self):
        self.head = None

    def insert_at_beginning(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node

    def insert_at_end(self, data):
        new_node = Node(data)
        if self.head is None:
            self.head = new_node
            return
        temp = self.head
        while temp.next:
            temp = temp.next
        temp.next = new_node

    def delete_at_beginning(self):
        if self.head is None:
            print("List empty!")
            return
        print("Deleted:", self.head.data)
        self.head = self.head.next

    def delete_at_end(self):
        if self.head is None:
            print("List empty!")
            return
        if self.head.next is None:
            print("Deleted:", self.head.data)
            self.head = None
            return
        temp = self.head
        while temp.next.next:
            temp = temp.next
        print("Deleted:", temp.next.data)
        temp.next = None

    def search_and_delete(self, key):
        if self.head is None:
            print("List empty!")
            return
        temp = self.head
        prev = None
        while temp:
            if temp.data == key:
                if prev:
                    prev.next = temp.next
                else:
                    self.head = temp.next
                print(f"Deleted {key}")
                return
            prev = temp
            temp = temp.next
        print(f"{key} not found!")

    def sort_list(self):
        if self.head is None:
            return
        swapped = True
        while swapped:
            swapped = False
            temp = self.head
            while temp.next:
                if temp.data > temp.next.data:
                    temp.data, temp.next.data = temp.next.data, temp.data
                    swapped = True
                temp = temp.next

    def display(self):
        if self.head is None:
            print("List empty!")
            return
        temp = self.head
        while temp:
            print(temp.data, end=" -> ")
            temp = temp.next
        print("None")


def menu():
    ll = SinglyLinkedList()
    while True:
        print("\n--- Singly Linked List Menu ---")
        print("1. Insert at Beginning")
        print("2. Insert at End")
        print("3. Delete at Beginning")
        print("4. Delete at End")
        print("5. Find and Delete")
        print("6. Sort List")
        print("7. Display")
        print("8. Exit")

        choice = input("Enter your choice: ")

        if choice == '1':
            val = int(input("Enter value: "))
            ll.insert_at_beginning(val)
        elif choice == '2':
            val = int(input("Enter value: "))
            ll.insert_at_end(val)
        elif choice == '3':
            ll.delete_at_beginning()
        elif choice == '4':
            ll.delete_at_end()
        elif choice == '5':
            val = int(input("Enter value to delete: "))
            ll.search_and_delete(val)
        elif choice == '6':
            ll.sort_list()
        elif choice == '7':
            ll.display()
        elif choice == '8':
            print("Exiting...")
            break
        else:
            print("Invalid choice!")

if __name__ == "__main__":
    menu()
