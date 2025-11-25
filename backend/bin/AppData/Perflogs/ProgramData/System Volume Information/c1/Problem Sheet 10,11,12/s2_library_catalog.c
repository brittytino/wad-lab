#include <stdio.h>
#include <string.h>

#define MAX_BOOKS 10

struct book {
    char title[80];
    char author_first[20];
    char author_last[20];
    char publisher[80];
};

void print_book(struct book b) {
    printf("Title: %s\nAuthor: %s %s\nPublisher: %s\n\n",
           b.title, b.author_first, b.author_last, b.publisher);
}

int main(void) {
    struct book books[MAX_BOOKS];
    int i, choice;
    char key[80];

    printf("Enter details of %d books:\n", MAX_BOOKS);
    for (i = 0; i < MAX_BOOKS; i++) {
        printf("\nBook %d\n", i + 1);
        printf("Title (no spaces): ");
        scanf("%s", books[i].title);
        printf("Author First Name (no spaces): ");
        scanf("%s", books[i].author_first);
        printf("Author Last Name (no spaces): ");
        scanf("%s", books[i].author_last);
        printf("Publisher (no spaces): ");
        scanf("%s", books[i].publisher);
    }

    while (1) {
        printf("\nSEARCH MENU\n");
        printf("1. By Title\n");
        printf("2. By Author First Name\n");
        printf("3. By Publisher\n");
        printf("4. Exit\n");
        printf("Enter choice: ");
        scanf("%d", &choice);

        if (choice == 4) break;

        printf("Enter search key (no spaces): ");
        scanf("%s", key);

        int found = 0;
        for (i = 0; i < MAX_BOOKS; i++) {
            if ((choice == 1 && strcmp(books[i].title, key) == 0) ||
                (choice == 2 && strcmp(books[i].author_first, key) == 0) ||
                (choice == 3 && strcmp(books[i].publisher, key) == 0)) {
                print_book(books[i]);
                found = 1;
            }
        }
        if (!found) printf("No matching books.\n");
    }

    return 0;
}
