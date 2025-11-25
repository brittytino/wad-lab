#include <stdio.h>

int main() {
    int n, i;
    float total = 0, avg, max, min, threshold;
    int max_id = 0, min_id = 0;

    printf("Enter number of salespeople: ");
    scanf("%d", &n);

    float sales[n];

    // Read sales details
    for (i = 0; i < n; i++) {
        printf("Enter sales amount for Salesperson %d: ", i + 1);
        scanf("%f", &sales[i]);
        total += sales[i];

        // Set max and min
        if (i == 0) {
            max = min = sales[i];
            max_id = min_id = 1;
        } else {
            if (sales[i] > max) {
                max = sales[i];
                max_id = i + 1;
            }
            if (sales[i] < min) {
                min = sales[i];
                min_id = i + 1;
            }
        }
    }

    // Display table
    printf("\nSalesperson ID\tSales Amount\n");
    for (i = 0; i < n; i++)
        printf("%d\t\t%.2f\n", i + 1, sales[i]);

    avg = total / n;

    printf("\nTotal Sales = %.2f\n", total);
    printf("Average Sale = %.2f\n", avg);
    printf("Highest Sale: Salesperson %d with %.2f\n", max_id, max);
    printf("Lowest Sale:  Salesperson %d with %.2f\n", min_id, min);

    // Threshold comparison
    printf("\nEnter a sales threshold value: ");
    scanf("%f", &threshold);

    int count = 0;
    printf("\nSalespeople who exceeded %.2f:\n", threshold);
    printf("ID\tSales\n");
    for (i = 0; i < n; i++) {
        if (sales[i] > threshold) {
            printf("%d\t%.2f\n", i + 1, sales[i]);
            count++;
        }
    }
    printf("Total number above threshold: %d\n", count);

    return 0;
}
