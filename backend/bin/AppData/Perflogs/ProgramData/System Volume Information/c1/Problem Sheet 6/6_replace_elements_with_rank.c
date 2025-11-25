#include <stdio.h>

int main() {
    int n, i, j, rank;
    int arr[50];

    printf("Enter number of elements: ");
    scanf("%d", &n);
    printf("Enter %d elements: ", n);
    for (i = 0; i < n; i++) scanf("%d", &arr[i]);

    int ranks[50];
    for (i = 0; i < n; i++) {
        rank = 1;
        for (j = 0; j < n; j++)
            if (arr[j] < arr[i]) rank++;
        ranks[i] = rank;
    }

    printf("Rank Array: ");
    for (i = 0; i < n; i++) printf("%d ", ranks[i]);
    printf("\n");
    return 0;
}
