# max_product_words.py

print("Enter words (space separated):")
words = input().split()

# Precompute sets of characters for each word
char_sets = []
for w in words:
    char_sets.append(set(w))

max_product = 0

i = 0
while i < len(words):
    j = i + 1
    while j < len(words):
        # Check if no common letters
        if char_sets[i].isdisjoint(char_sets[j]):
            product = len(words[i]) * len(words[j])
            if product > max_product:
                max_product = product
        j += 1
    i += 1

print("Maximum product:", max_product)
