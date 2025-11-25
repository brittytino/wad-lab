#!/usr/bin/env python3
"""
dll.py - Simple Doubly Linked List with many basic operations.

Operations included:
- insert at beginning
- insert at end
- insert at specific position (1-based; if pos > length+1, inserts at end)
- delete at beginning
- delete at end
- delete at specific position (1-based)
- insert into a sorted DLL (assumes ascending order)
- insert after a given element (first occurrence)
- insert before a given element (first occurrence)
- delete a given element (first occurrence)
- delete a given element in a sorted DLL (stops early if possible)
- insert after value if found; otherwise insert at end

Simple, naive implementations designed for learning. Uses integers for values (you can change).
"""

class Node:
    def __init__(self, data):
        self.data = data
        self.prev = None
        self.next = None

class DoublyLinkedList:
    def __init__(self):
        self.head = None

    # ---------- Utilities ----------
    def is_empty(self):
        return self.head is None

    def display_forward(self):
        if self.head is None:
            print("List empty!")
            return
        out = []
        cur = self.head
        while cur:
            out.append(str(cur.data))
            cur = cur.next
        print("Forward: " + " <-> ".join(out))

    def display_backward(self):
        if self.head is None:
            print("List empty!")
            return
        cur = self.head
        while cur.next:
            cur = cur.next
        out = []
        while cur:
            out.append(str(cur.data))
            cur = cur.prev
        print("Backward: " + " <-> ".join(out))

    def length(self):
        cnt = 0
        cur = self.head
        while cur:
            cnt += 1
            cur = cur.next
        return cnt

    # ---------- Insertions ----------
    def insert_at_beginning(self, value):
        node = Node(value)
        if self.head is None:
            self.head = node
            return
        node.next = self.head
        self.head.prev = node
        self.head = node

    def insert_at_end(self, value):
        node = Node(value)
        if self.head is None:
            self.head = node
            return
        cur = self.head
        while cur.next:
            cur = cur.next
        cur.next = node
        node.prev = cur

    def insert_at_position(self, pos, value):
        """1-based position. pos=1 => insert at beginning.
           If pos > length+1, inserts at end."""
        if pos <= 1 or self.head is None:
            self.insert_at_beginning(value)
            return
        node = Node(value)
        cur = self.head
        idx = 1
        # move to node at position pos-1 or last node
        while cur.next and idx < pos - 1:
            cur = cur.next
            idx += 1
        # insert after cur
        node.next = cur.next
        node.prev = cur
        cur.next = node
        if node.next:
            node.next.prev = node

    def insert_sorted(self, value):
        """Insert into an ascending sorted doubly linked list."""
        node = Node(value)
        if self.head is None:
            self.head = node
            return
        # if should be new head
        if value <= self.head.data:
            node.next = self.head
            self.head.prev = node
            self.head = node
            return
        cur = self.head
        while cur.next and cur.next.data < value:
            cur = cur.next
        # insert after cur
        node.next = cur.next
        node.prev = cur
        cur.next = node
        if node.next:
            node.next.prev = node

    def insert_after_value(self, target, value):
        """Insert after first occurrence of target. If not found, do nothing."""
        cur = self.head
        while cur:
            if cur.data == target:
                node = Node(value)
                node.next = cur.next
                node.prev = cur
                cur.next = node
                if node.next:
                    node.next.prev = node
                print(f"Inserted {value} after first {target}.")
                return
            cur = cur.next
        print(f"Value {target} not found; nothing inserted.")

    def insert_before_value(self, target, value):
        """Insert before first occurrence of target. If not found, do nothing."""
        cur = self.head
        while cur:
            if cur.data == target:
                node = Node(value)
                node.next = cur
                node.prev = cur.prev
                cur.prev = node
                if node.prev:
                    node.prev.next = node
                else:
                    # inserting before head
                    self.head = node
                print(f"Inserted {value} before first {target}.")
                return
            cur = cur.next
        print(f"Value {target} not found; nothing inserted.")

    def insert_after_value_or_end(self, target, value):
        """If target found (first occurrence), insert after it; otherwise insert at end."""
        cur = self.head
        while cur:
            if cur.data == target:
                node = Node(value)
                node.next = cur.next
                node.prev = cur
                cur.next = node
                if node.next:
                    node.next.prev = node
                print(f"Inserted {value} after first {target}.")
                return
            if cur.next is None:
                # reached last node and target not found yet
                break
            cur = cur.next
        # either list empty or reached last
        if self.head is None:
            self.insert_at_beginning(value)
            print(f"List was empty; inserted {value} as head.")
        else:
            # cur is last node
            node = Node(value)
            cur.next = node
            node.prev = cur
            print(f"Target {target} not found; inserted {value} at end.")

    # ---------- Deletions ----------
    def delete_at_beginning(self):
        if self.head is None:
            print("List empty! Nothing to delete.")
            return
        val = self.head.data
        if self.head.next is None:
            self.head = None
            print(f"Deleted {val} (only node).")
            return
        self.head = self.head.next
        self.head.prev.next = None  # remove reference from old head (safe)
        self.head.prev = None
        print(f"Deleted {val} from beginning.")

    def delete_at_end(self):
        if self.head is None:
            print("List empty! Nothing to delete.")
            return
        cur = self.head
        if cur.next is None:
            val = cur.data
            self.head = None
            print(f"Deleted {val} (only node).")
            return
        while cur.next:
            cur = cur.next
        val = cur.data
        cur.prev.next = None
        cur.prev = None
        print(f"Deleted {val} from end.")

    def delete_at_position(self, pos):
        """1-based position. If position out of range, prints message."""
        if self.head is None:
            print("List empty!")
            return
        if pos <= 1:
            self.delete_at_beginning()
            return
        cur = self.head
        idx = 1
        while cur and idx < pos:
            cur = cur.next
            idx += 1
        if cur is None:
            print("Position out of range; nothing deleted.")
            return
        # cur is node to delete
        val = cur.data
        if cur.next:
            cur.next.prev = cur.prev
        if cur.prev:
            cur.prev.next = cur.next
        print(f"Deleted {val} at position {pos}.")

    def delete_given_element(self, key):
        """Delete first occurrence of key."""
        if self.head is None:
            print("List empty!")
            return
        cur = self.head
        while cur:
            if cur.data == key:
                if cur.prev:
                    cur.prev.next = cur.next
                else:
                    self.head = cur.next
                if cur.next:
                    cur.next.prev = cur.prev
                print(f"Deleted first occurrence of {key}.")
                return
            cur = cur.next
        print(f"{key} not found; nothing deleted.")

    def delete_given_element_sorted(self, key):
        """Deletes first occurrence in a sorted list; stops early if current > key."""
        if self.head is None:
            print("List empty!")
            return
        cur = self.head
        while cur:
            if cur.data == key:
                if cur.prev:
                    cur.prev.next = cur.next
                else:
                    self.head = cur.next
                if cur.next:
                    cur.next.prev = cur.prev
                print(f"Deleted {key} (from sorted list).")
                return
            if cur.data > key:
                # since sorted ascending, key not present beyond this
                print(f"{key} not found (stopped early because list is sorted).")
                return
            cur = cur.next
        print(f"{key} not found in list.")

# ---------- Simple menu to test all operations ----------
def menu():
    dll = DoublyLinkedList()
    while True:
        print("\n--- Doubly Linked List Menu ---")
        print("1  Insert at beginning")
        print("2  Insert at end")
        print("3  Insert at position (1-based)")
        print("4  Delete at beginning")
        print("5  Delete at end")
        print("6  Delete at position (1-based)")
        print("7  Insert into sorted DLL (ascending)")
        print("8  Insert after given element (first occurrence)")
        print("9  Insert before given element (first occurrence)")
        print("10 Insert after value if found; otherwise insert at end")
        print("11 Delete given element (first occurrence)")
        print("12 Delete given element in sorted DLL (stops early)")
        print("13 Display forward")
        print("14 Display backward")
        print("15 Length")
        print("0  Exit")
        choice = input("Enter choice: ").strip()

        if choice == '0':
            print("Bye.")
            break
        elif choice == '1':
            v = _read_int("Value to insert at beginning: ")
            dll.insert_at_beginning(v)
        elif choice == '2':
            v = _read_int("Value to insert at end: ")
            dll.insert_at_end(v)
        elif choice == '3':
            pos = _read_int("Position (1-based): ")
            v = _read_int("Value: ")
            dll.insert_at_position(pos, v)
        elif choice == '4':
            dll.delete_at_beginning()
        elif choice == '5':
            dll.delete_at_end()
        elif choice == '6':
            pos = _read_int("Position (1-based) to delete: ")
            dll.delete_at_position(pos)
        elif choice == '7':
            v = _read_int("Value to insert into sorted list: ")
            dll.insert_sorted(v)
        elif choice == '8':
            target = _read_int("Insert after which value? ")
            v = _read_int("Value to insert: ")
            dll.insert_after_value(target, v)
        elif choice == '9':
            target = _read_int("Insert before which value? ")
            v = _read_int("Value to insert: ")
            dll.insert_before_value(target, v)
        elif choice == '10':
            target = _read_int("Try to insert after which value? ")
            v = _read_int("Value to insert: ")
            dll.insert_after_value_or_end(target, v)
        elif choice == '11':
            key = _read_int("Value to delete (first occurrence): ")
            dll.delete_given_element(key)
        elif choice == '12':
            key = _read_int("Value to delete from sorted list: ")
            dll.delete_given_element_sorted(key)
        elif choice == '13':
            dll.display_forward()
        elif choice == '14':
            dll.display_backward()
        elif choice == '15':
            print("Length:", dll.length())
        else:
            print("Invalid choice. Try again.")

def _read_int(prompt):
    while True:
        s = input(prompt).strip()
        try:
            return int(s)
        except ValueError:
            print("Please enter a valid integer.")

if __name__ == "__main__":
    menu()
