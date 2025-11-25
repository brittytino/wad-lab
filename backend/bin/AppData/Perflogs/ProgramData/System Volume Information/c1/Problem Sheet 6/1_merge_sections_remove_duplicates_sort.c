#include <stdio.h>

int main() {
    int n1, n2, n3, i, j, k, temp;
    int a[50], b[50], c[50], merged[150], size = 0;

    printf("Enter number of items in Section 1: ");
    scanf("%d", &n1);
    printf("Enter %d item IDs: ", n1);
    for (i = 0; i < n1; i++) scanf("%d", &a[i]);

    printf("Enter number of items in Section 2: ");
    scanf("%d", &n2);
    printf("Enter %d item IDs: ", n2);
    for (i = 0; i < n2; i++) scanf("%d", &b[i]);

    printf("Enter number of items in Section 3: ");
    scanf("%d", &n3);
    printf("Enter %d item IDs: ", n3);
    for (i = 0; i < n3; i++) scanf("%d", &c[i]);

    // merge all
    for (i = 0; i < n1; i++) merged[size++] = a[i];
    for (i = 0; i < n2; i++) merged[size++] = b[i];
    for (i = 0; i < n3; i++) merged[size++] = c[i];

    // remove duplicates
    for (i = 0; i < size; i++) {
        for (j = i + 1; j < size; j++) {
            if (merged[i] == merged[j]) {
                for (k = j; k < size - 1; k++)
                    merged[k] = merged[k + 1];
                size--;
                j--;
            }
        }
    }

    // sort ascending
    for (i = 0; i < size - 1; i++)
        for (j = i + 1; j < size; j++)
            if (merged[i] > merged[j]) {
                temp = merged[i];
                merged[i] = merged[j];
                merged[j] = temp;
            }

    printf("\nMerged, unique & sorted list:\n[ ");
    for (i = 0; i < size; i++) printf("%d ", merged[i]);
    printf("]\n");
    return 0;
}
