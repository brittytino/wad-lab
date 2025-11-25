#include <stdio.h>
#include <stdlib.h>

struct product {
    int id;
    char name[20];
    int quantity;
    int cost;
};

int main(void) {
    FILE *fp;
    struct product p;
    int n, i;

    // Append new records
    fp = fopen("productinfo", "ab"); // binary append
    if (!fp) {
        printf("Error opening file for appending.\n");
        return 1;
    }

    printf("How many products to append? ");
    scanf("%d", &n);

    for (i = 0; i < n; i++) {
        printf("\nProduct %d\n", i + 1);
        printf("ID: ");
        scanf("%d", &p.id);
        printf("Name (no spaces): ");
        scanf("%s", p.name);
        printf("Quantity: ");
        scanf("%d", &p.quantity);
        printf("Cost: ");
        scanf("%d", &p.cost);

        fwrite(&p, sizeof(struct product), 1, fp);
    }

    fclose(fp);

    // Display all records
    fp = fopen("productinfo", "rb");
    if (!fp) {
        printf("Error opening file for reading.\n");
        return 1;
    }

    printf("\nAll products in file:\n");
    while (fread(&p, sizeof(struct product), 1, fp) == 1) {
        printf("ID: %d | Name: %s | Qty: %d | Cost: %d\n",
               p.id, p.name, p.quantity, p.cost);
    }

    fclose(fp);
    return 0;
}
