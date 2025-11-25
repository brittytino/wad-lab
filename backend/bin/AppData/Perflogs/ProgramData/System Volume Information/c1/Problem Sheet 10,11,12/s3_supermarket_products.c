#include <stdio.h>
#include <string.h>

#define MAX_PRODUCTS 10

struct product {
    int prod_no;
    float cost_per_product;
    int num_items;
    char expiry[11]; // dd-mm-yy
};

void print_product(struct product p) {
    printf("Product No: %d | Cost: %.2f | Items: %d | Expiry: %s\n",
           p.prod_no, p.cost_per_product, p.num_items, p.expiry);
}

int main(void) {
    struct product p[MAX_PRODUCTS];
    int i, choice, pno;
    float cost_limit;
    char exp[11];

    printf("Enter details of %d products:\n", MAX_PRODUCTS);
    for (i = 0; i < MAX_PRODUCTS; i++) {
        printf("\nProduct %d\n", i + 1);
        printf("Product number: ");
        scanf("%d", &p[i].prod_no);
        printf("Cost per product: ");
        scanf("%f", &p[i].cost_per_product);
        printf("Number of items: ");
        scanf("%d", &p[i].num_items);
        printf("Expiry date (dd-mm-yy, no spaces): ");
        scanf("%s", p[i].expiry);
    }

    while (1) {
        printf("\nMENU\n");
        printf("1. Display details with given product number\n");
        printf("2. Display products with cost above given cost\n");
        printf("3. Display products with given expiry date\n");
        printf("4. Exit\n");
        printf("Enter choice: ");
        scanf("%d", &choice);

        if (choice == 1) {
            printf("Enter product number: ");
            scanf("%d", &pno);
            int found = 0;
            for (i = 0; i < MAX_PRODUCTS; i++) {
                if (p[i].prod_no == pno) {
                    print_product(p[i]);
                    found = 1;
                }
            }
            if (!found) printf("Product not found.\n");

        } else if (choice == 2) {
            printf("Enter cost limit: ");
            scanf("%f", &cost_limit);
            int found = 0;
            for (i = 0; i < MAX_PRODUCTS; i++) {
                if (p[i].cost_per_product > cost_limit) {
                    print_product(p[i]);
                    found = 1;
                }
            }
            if (!found) printf("No products above that cost.\n");

        } else if (choice == 3) {
            printf("Enter expiry date (dd-mm-yy): ");
            scanf("%s", exp);
            int found = 0;
            for (i = 0; i < MAX_PRODUCTS; i++) {
                if (strcmp(p[i].expiry, exp) == 0) {
                    print_product(p[i]);
                    found = 1;
                }
            }
            if (!found) printf("No products with that expiry date.\n");

        } else if (choice == 4) {
            break;
        } else {
            printf("Invalid choice.\n");
        }
    }

    return 0;
}
