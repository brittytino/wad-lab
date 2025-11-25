#include <stdio.h>

int main() {
    int n, i, find, count = 0;
    int days[50];

    printf("Enter number of days recorded: ");
    scanf("%d", &n);
    printf("Enter %d gift-type numbers: ", n);
    for (i = 0; i < n; i++) scanf("%d", &days[i]);

    printf("Enter Gift Type to find: ");
    scanf("%d", &find);

    printf("Days with Gift Type %d: [ ", find);
    for (i = 0; i < n; i++) {
        if (days[i] == find) {
            printf("%d ", days[i]);
            count++;
        }
    }
    printf("]\nOccurrences: %d\n", count);
    return 0;
}
