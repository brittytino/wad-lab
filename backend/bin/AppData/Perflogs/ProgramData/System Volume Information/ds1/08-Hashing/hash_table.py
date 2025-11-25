# hash_table.py

# Special marker for deleted slots
DELETED = "DELETED"

class HashTable:
    def __init__(self, size):
        self.size = size
        self.table = [None] * size

    def hash_func(self, key):
        return key % self.size

    def insert(self, key):
        idx = self.hash_func(key)
        start = idx

        while self.table[idx] is not None and self.table[idx] != DELETED:
            if self.table[idx] == key:
                print("Key already present.")
                return
            idx = (idx + 1) % self.size
            if idx == start:
                print("Hash table is full, cannot insert.")
                return

        self.table[idx] = key
        print("Inserted", key, "at index", idx)

    def search(self, key):
        idx = self.hash_func(key)
        start = idx

        while self.table[idx] is not None:
            if self.table[idx] == key:
                print("Found", key, "at index", idx)
                return idx
            idx = (idx + 1) % self.size
            if idx == start:
                break

        print("Key not found")
        return -1

    def delete(self, key):
        idx = self.search(key)
        if idx != -1:
            self.table[idx] = DELETED
            print("Deleted", key, "from index", idx)

    def display(self):
        print("Hash table contents:")
        i = 0
        while i < self.size:
            print(i, ":", self.table[i])
            i += 1

size = int(input("Enter hash table size: "))
ht = HashTable(size)

while True:
    print("\n--- Hash Table Menu ---")
    print("1. Insert key")
    print("2. Search key")
    print("3. Delete key")
    print("4. Display table")
    print("0. Exit")
    ch = input("Choice: ").strip()

    if ch == '1':
        k = int(input("Enter key to insert: "))
        ht.insert(k)
    elif ch == '2':
        k = int(input("Enter key to search: "))
        ht.search(k)
    elif ch == '3':
        k = int(input("Enter key to delete: "))
        ht.delete(k)
    elif ch == '4':
        ht.display()
    elif ch == '0':
        break
    else:
        print("Invalid choice")
