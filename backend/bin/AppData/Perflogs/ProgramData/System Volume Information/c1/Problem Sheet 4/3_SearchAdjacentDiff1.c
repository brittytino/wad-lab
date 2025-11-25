#include <stdio.h>
#include <stdlib.h>

int main() {
    int n, i, key;
    printf("Enter number of elements: ");
    scanf("%d", &n);

    int arr[n];
    printf("Enter %d elements (difference between adjacent = 1):\n", n);
    for (i = 0; i < n; i++)
        scanf("%d", &arr[i]);

    printf("Enter element to search: ");
    scanf("%d", &key);

    i = 0;
    while (i < n) {
        if (arr[i] == key) {
            printf("Element %d found at position %d\n", key, i + 1);
            return 0;
        }
        // jump based on difference
        i += abs(arr[i] - key);
    }

    printf("Element %d not found.\n", key);
    return 0;
}
